<?php
include 'includes/conn.php';
include 'includes/session.php'; // Add session include to fix $user variable

if (isset($_GET['election_id'])) {
    // Fetch election details
    $stmt = $conn->prepare('SELECT * FROM elections WHERE id = ?');
    $stmt->bind_param('i', $_GET['election_id']);
    $stmt->execute();
    $election = $stmt->get_result()->fetch_assoc();
    
    if ($election) {
        // Fetch voter count for calculating thresholds
        $stmt = $conn->prepare('SELECT COUNT(*) as voter_count FROM voters WHERE election_id = ?');
        $stmt->bind_param('i', $_GET['election_id']);
        $stmt->execute();
        $voter_result = $stmt->get_result()->fetch_assoc();
        $total_voter_count = $voter_result['voter_count'];

        // Fetch positions for this election
        $stmt = $conn->prepare('
            SELECT
                p.position_id,
                p.description as position_name,
                c.id as candidate_id,
                CONCAT(c.firstname, " ", c.lastname) as candidate_name,
                c.photo as candidate_photo,
                c.platform as candidate_platform,
                pl.name as partylist_name,
                COUNT(v.id) as vote_count
            FROM positions p
            LEFT JOIN candidates c ON c.position_id = p.position_id
            LEFT JOIN partylists pl ON c.partylist_id = pl.partylist_id
            LEFT JOIN votes v ON v.candidate_id = c.id
            WHERE p.election_id = ?
            GROUP BY p.position_id, c.id
            ORDER BY p.position_id ASC, vote_count DESC
        ');
        $stmt->bind_param('i', $_GET['election_id']);
        $stmt->execute();
        $results = $stmt->get_result();

        // Organize results by position
        $positions = [];
        while ($row = $results->fetch_assoc()) {
            if (!isset($positions[$row['position_id']])) {
                $positions[$row['position_id']] = [
                    'id' => $row['position_id'],
                    'name' => $row['position_name'],
                    'candidates' => [],
                    'total_votes' => 0
                ];
            }
            if ($row['candidate_id']) { // Only add if there's a candidate
                $positions[$row['position_id']]['candidates'][] = $row;
                $positions[$row['position_id']]['total_votes'] += $row['vote_count'];
            }
        }

        // Fetch abstain counts
        $stmt = $conn->prepare('
            SELECT
                p.position_id,
                COUNT(*) as abstain_count
            FROM votes v
            JOIN positions p ON p.position_id = v.position_id
            WHERE v.election_id = ? AND v.candidate_id IS NULL
            GROUP BY p.position_id
        ');
        $stmt->bind_param('i', $_GET['election_id']);
        $stmt->execute();
        $abstains = $stmt->get_result();

        // Add abstain counts to positions array
        while ($abstain = $abstains->fetch_assoc()) {
            if (isset($positions[$abstain['position_id']])) {
                $positions[$abstain['position_id']]['abstain_count'] = $abstain['abstain_count'];
                $positions[$abstain['position_id']]['total_votes'] += $abstain['abstain_count'];
            }
        }
        
        // Calculate winners
        foreach ($positions as $position_id => &$position) {
            // Get position information to determine if this requires majority vote
            $stmt = $conn->prepare('SELECT max_vote FROM positions WHERE position_id = ?');
            $stmt->bind_param('i', $position_id);
            $stmt->execute();
            $pos_info = $stmt->get_result()->fetch_assoc();
            $max_vote = $pos_info['max_vote'];
            
            // Find the maximum vote count for this position
            $max_votes = 0;
            foreach ($position['candidates'] as &$candidate) {
                if ($candidate['vote_count'] > $max_votes) {
                    $max_votes = $candidate['vote_count'];
                }
            }
            
            // Count how many candidates have the maximum vote count (for tie detection)
            $max_votes_count = 0;
            foreach ($position['candidates'] as &$candidate) {
                if ($candidate['vote_count'] == $max_votes) {
                    $max_votes_count++;
                }
            }
            
            // Check if this position requires majority vote
            $needs_majority = ($position_id == 1); // Assuming position ID 1 is President
            
            // For single candidate positions, they need 50%+1 of TOTAL VOTERS to win
            $single_candidate = (count($position['candidates']) == 1);
            
            // Calculate appropriate threshold
            if ($single_candidate) {
                $minimum_votes_to_win = ceil($total_voter_count / 2) + 1; // 50%+1 of TOTAL VOTERS
            } else if ($needs_majority) {
                $minimum_votes_to_win = floor($position['total_votes'] / 2) + 1; // 50%+1 of VOTES CAST
            } else {
                $minimum_votes_to_win = 0; // Simple plurality
            }
            
            // Mark winners and set status
            foreach ($position['candidates'] as &$candidate) {
                $is_max_vote = ($candidate['vote_count'] == $max_votes && $max_votes > 0);
                
                if ($single_candidate) {
                    // Single candidate needs to reach threshold of total voters
                    $has_required_votes = ($candidate['vote_count'] >= $minimum_votes_to_win);
                    $candidate['is_winner'] = $has_required_votes;
                    $candidate['is_tie'] = false;
                    $candidate['needs_reelection'] = !$has_required_votes;
                } else if ($needs_majority) {
                    // Position requiring majority
                    $has_required_majority = ($candidate['vote_count'] >= $minimum_votes_to_win);
                    $candidate['is_winner'] = ($is_max_vote && $has_required_majority);
                    $candidate['is_tie'] = ($is_max_vote && $max_votes_count > 1);
                    $candidate['needs_reelection'] = ($is_max_vote && !$has_required_majority);
                } else {
                    // Standard positions - top N candidates win based on max_vote
                    $candidate['is_winner'] = ($is_max_vote && !($max_votes_count > $max_vote));
                    $candidate['is_tie'] = ($is_max_vote && $max_votes_count > $max_vote);
                    $candidate['needs_reelection'] = false;
                }
            }
            
            // Add voting info to position
            $position['needs_majority'] = $needs_majority || $single_candidate;
            $position['minimum_votes_to_win'] = $minimum_votes_to_win;
            $position['single_candidate'] = $single_candidate;
            $position['total_voter_count'] = $total_voter_count; // Add total voter count for reference
        }
    } else {
        exit('Election with that ID does not exist.');
    }
} else {
    exit('No election ID specified.');
}

// Function to convert number to ordinal (1st, 2nd, 3rd, etc.)
function getOrdinal($number) {
    if ($number <= 0) return $number;
    
    $suffix = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
    if (($number % 100) >= 11 && ($number % 100) <= 13) {
        return $number . 'th';
    } else {
        return $number . $suffix[$number % 10];
    }
}
?>

<?php include 'includes/header.php'; ?>
<body class="hold-transition skin-green layout-top-nav">
<div class="wrapper">
    <?php include 'includes/navbar.php'; ?>
    <div class="content-wrapper">
        <div class="container">
            <section class="content">
                <h1 class="page-header text-center title">
                    <b><?php echo htmlspecialchars($election['name'], ENT_QUOTES); ?> - Results</b>
                </h1>

                <!-- Back Button -->
                <div class="text-center mb-3">
                    <a href="sub_admins.php" class="btn btn-primary btn-sm">
                        <i class="fa fa-arrow-left"></i> Back to Elections
                    </a>
                </div>

                <!-- Results by Position -->
                <div id="results-container">
                    <?php foreach ($positions as $position): ?>
                        <div class="box box-solid position-results">
                            <div class="box-header with-border bg-green">
                                <h3 class="box-title position-title"><b><?php echo htmlspecialchars($position['name'], ENT_QUOTES); ?></b></h3>
                            </div>
                            <div class="box-body">
                                <table class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th width="10%">Rank</th>
                                            <th width="40%">Candidate</th>
                                            <th width="15%">Party List</th>
                                            <th width="15%">Votes</th>
                                            <th width="20%">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php 
                                        // Sort candidates by vote count (descending)
                                        usort($position['candidates'], function($a, $b) {
                                            return $b['vote_count'] - $a['vote_count'];
                                        });
                                        
                                        $rank = 1;
                                        $rankIncrement = 1; // Used to manage ranks when there are ties
                                        $previousVotes = -1;
                                        
                                        foreach ($position['candidates'] as $key => $candidate): 
                                            $photoPath = !empty($candidate['candidate_photo']) 
                                                ? $candidate['candidate_photo'] 
                                                : '../pics/default.jpg';
                                                
                                            // If votes are different from previous candidate, update the rank
                                            if($candidate['vote_count'] != $previousVotes) {
                                                $rank = $rankIncrement;
                                            }
                                            $previousVotes = $candidate['vote_count'];
                                            $rankIncrement++;
                                            
                                            // Check conditions for winner status
                                            $is_max_vote = isset($candidate['is_winner']) && $candidate['is_winner'];
                                            $is_tie = isset($candidate['is_tie']) && $candidate['is_tie'];
                                            $needs_reelection = isset($candidate['needs_reelection']) && $candidate['needs_reelection'];
                                            
                                            // Row highlighting
                                            $rowClass = $is_max_vote ? "success" : "";
                                        ?>
                                            <tr class="<?php echo $rowClass; ?>">
                                                <td><?php echo $rank; ?></td>
                                                <td>
                                                    <strong><?php echo htmlspecialchars($candidate['candidate_name']); ?></strong>
                                                </td>
                                                <td><?php echo htmlspecialchars($candidate['partylist_name'] ?? 'Independent'); ?></td>
                                                <td><?php echo $candidate['vote_count']; ?></td>
                                                <td class="text-center">
                                                    <?php 
                                                    if($needs_reelection) {
                                                        if($position['single_candidate']) {
                                                            echo "<span class='badge bg-warning' style='background-color: #ffc107; color: #212529; padding: 5px 10px; border-radius: 4px;'><i class='fa fa-exclamation-triangle mr-1'></i> FAILED TO MEET 50%+1 THRESHOLD</span>";
                                                        } else {
                                                            echo "<span class='badge bg-warning' style='background-color: #ffc107; color: #212529; padding: 5px 10px; border-radius: 4px;'><i class='fa fa-exclamation-triangle mr-1'></i> RE-ELECTION NEEDED</span>";
                                                        }
                                                    } elseif($is_tie) {
                                                        echo "<span class='badge bg-info' style='background-color: #17a2b8; color: white; padding: 5px 10px; border-radius: 4px;'><i class='fa fa-balance-scale mr-1'></i> TIE - " . getOrdinal($rank) . " PLACE</span>";
                                                    } elseif($is_max_vote) {
                                                        echo "<span class='badge bg-success' style='background-color: #28a745; color: white; padding: 5px 10px; border-radius: 4px;'><i class='fa fa-trophy mr-1'></i> WINNER</span>";
                                                    } else {
                                                        // Determine badge color based on rank
                                                        if($rank == 2) {
                                                            $badgeColor = "bg-info' style='background-color: #17a2b8; color: white;";
                                                            $icon = "<i class='fa fa-medal mr-1'></i>";
                                                        } elseif($rank == 3) {
                                                            $badgeColor = "bg-primary' style='background-color: #007bff; color: white;";
                                                            $icon = "<i class='fa fa-award mr-1'></i>";
                                                        } else {
                                                            $badgeColor = "bg-secondary' style='background-color: #6c757d; color: white;";
                                                            $icon = "";
                                                        }
                                                        
                                                        echo "<span class='badge $badgeColor padding: 5px 10px; border-radius: 4px;'>$icon " . getOrdinal($rank) . " PLACE</span>";
                                                    }
                                                    ?>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>

                                        <?php if (isset($position['abstain_count']) && $position['abstain_count'] > 0): ?>
                                            <tr class="warning">
                                                <td>-</td>
                                                <td><em>ABSTAINED</em></td>
                                                <td>-</td>
                                                <td><?php echo $position['abstain_count']; ?></td>
                                                <td>-</td>
                                            </tr>
                                        <?php endif; ?>
                                    </tbody>
                                    <tfoot>
                                        <tr class="table-info" style="background-color: #e3f2fd;">
                                            <td colspan="3"><strong>Total Votes Cast:</strong></td>
                                            <td><strong><?php echo $position['total_votes']; ?></strong></td>
                                            <td><strong>100%</strong></td>
                                        </tr>
                                        
                                        <?php if($position['single_candidate']): ?>
                                        <tr class="table-warning" style="background-color: #fff3cd;">
                                            <td colspan="3"><strong>Total Registered Voters:</strong></td>
                                            <td colspan="2"><strong><?php echo $position['total_voter_count']; ?> voters</strong></td>
                                        </tr>
                                        <tr class="table-warning" style="background-color: #fff3cd;">
                                            <td colspan="3"><strong>Votes Needed to Win (50%+1 of Total Voters):</strong></td>
                                            <td colspan="2"><strong><?php echo $position['minimum_votes_to_win']; ?> votes</strong></td>
                                        </tr>
                                        <?php elseif($position['needs_majority']): ?>
                                        <tr class="table-warning" style="background-color: #fff3cd;">
                                            <td colspan="3"><strong>Votes Needed to Win (50%+1 of Votes Cast):</strong></td>
                                            <td colspan="2"><strong><?php echo $position['minimum_votes_to_win']; ?> votes</strong></td>
                                        </tr>
                                        <?php endif; ?>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>

                <!-- Print Button -->
                <div class="text-center mb-4">
                    <button onclick="window.print();" class="btn btn-success">
                        <i class="fa fa-print"></i> Print Results
                    </button>
                </div>
            </section>
        </div>
    </div>
    <?php include 'includes/footer.php'; ?>
</div>
<?php include 'includes/scripts.php'; ?>

<style>
.position-results {
    margin-bottom: 30px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.position-title {
    color: #fff;
    padding-bottom: 10px;
    font-weight: 600;
    font-size: 18px;
}

.table {
    margin-top: 10px;
    width: 100%;
}

.table th, .table td {
    padding: 12px 15px;
    vertical-align: middle;
}

.table-success {
    background-color: rgba(40, 167, 69, 0.1);
}

.mr-1 {
    margin-right: 4px;
}

.badge {
    display: inline-block;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
}

.text-center {
    text-align: center;
}

@media print {
    .no-print, .main-footer, .btn {
        display: none !important;
    }
    
    a[href]:after {
        content: none !important;
    }
    
    .content-wrapper {
        margin-left: 0 !important;
    }
    
    .position-results {
        box-shadow: none;
        border: 1px solid #ddd;
        page-break-inside: avoid;
    }
}
</style>

</body>
</html>
