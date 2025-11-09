<?php
include 'includes/session.php';

if(isset($_POST['id'])){
    $id = $_POST['id'];

    // Fetch deleted election details
    $sql = "SELECT * FROM history WHERE id = '$id'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    echo "<div id='printable-content' class='px-3'>";
    echo "<div class='text-center mb-4'>";
    echo "<h4 class='text-success font-weight-bold' style='color: #046a0f;'>Election Results Summary</h4>";
    echo "<h5 class='mb-2'><strong>Election Name:</strong> ".htmlspecialchars($row['election_title'])."</h5>";
    echo "<p class='text-muted'><i class='fa fa-calendar-alt mr-1'></i> Deleted on: ".date('F d, Y h:i A', strtotime($row['deleted_at']))."</p>";
    echo "<hr class='my-3' style='border-color: #e0f0e0;'>";
    echo "</div>";

    // Function to check if a position requires majority vote
    function requiresMajority($position_id) {
        // Only apply 50%+1 rule to position ID 1 (assumed to be President)
        return $position_id == 1;
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

    // Function to calculate and display vote summary
    function displayVoteSummary($votes, $candidates, $positions) {
        if(empty($votes) || empty($candidates) || empty($positions)) {
            return "<div class='alert alert-warning text-center' style='border-radius: 8px;'>
                <i class='fa fa-exclamation-circle mr-2'></i> No voting data available.
            </div>";
        }

        $voteRecords = explode(";", $votes);
        $candidateRecords = explode(";", $candidates);
        $positionRecords = explode(";", $positions);

        // Create arrays to store vote counts and candidate details
        $voteCounts = array();
        $candidateDetails = array();
        $positionDetails = array();

        // Process candidates
        foreach($candidateRecords as $candidate) {
            $data = explode("|", $candidate);
            if(count($data) >= 4) {
                $candidateDetails[$data[0]] = array(
                    'name' => htmlspecialchars($data[2] . " " . $data[3]),
                    'position_id' => $data[1]
                );
            }
        }

        // Process positions
        foreach($positionRecords as $position) {
            $data = explode("|", $position);
            if(count($data) >= 2) {
                $positionDetails[$data[0]] = htmlspecialchars($data[1]);
            }
        }

        // Count votes
        foreach($voteRecords as $vote) {
            $data = explode("|", $vote);
            if(count($data) >= 3) {
                $candidate_id = $data[2];
                $position_id = $data[3];

                if(!isset($voteCounts[$position_id][$candidate_id])) {
                    $voteCounts[$position_id][$candidate_id] = 0;
                }
                $voteCounts[$position_id][$candidate_id]++;
            }
        }

        // Display results by position
        echo "<div class='results-container'>";
        
        // Process each position
        foreach($positionDetails as $position_id => $position_name) {
            echo "<div class='position-results'>";
            echo "<h6 class='position-title'><i class='fa fa-award mr-2' style='color: #046a0f;'></i>$position_name</h6>";

            if(isset($voteCounts[$position_id])) {
                // Sort candidates by vote count
                arsort($voteCounts[$position_id]);

                // Calculate total votes for this position
                $totalVotes = array_sum($voteCounts[$position_id]);

                // Find the maximum vote count for this position
                $maxVotes = 0;
                foreach($voteCounts[$position_id] as $votes) {
                    if($votes > $maxVotes) {
                        $maxVotes = $votes;
                    }
                }

                // Check if this position requires majority
                $needsMajority = requiresMajority($position_id);

                // Calculate minimum votes needed to win (50% + 1) if applicable
                $minimumVotesToWin = $needsMajority ? floor($totalVotes / 2) + 1 : 0;

                echo "<div class='table-responsive'>";
                echo "<table class='table table-bordered table-striped'>";
                echo "<thead class='thead-dark' style='background-color: #046a0f; color: white;'>";
                echo "<tr>
                        <th width='10%'>Rank</th>
                        <th width='40%'>Candidate</th>
                        <th width='15%'>Votes</th>
                        <th width='15%'>Percentage</th>
                        <th width='20%'>Status</th>
                    </tr></thead>";
                echo "<tbody>";

                $rank = 1;
                $rankIncrement = 1; // Used to manage ranks when there are ties
                $previousVotes = -1;
                
                foreach($voteCounts[$position_id] as $candidate_id => $votes) {
                    if(isset($candidateDetails[$candidate_id])) {
                        $percentage = ($totalVotes > 0) ? round(($votes / $totalVotes) * 100, 2) : 0;

                        // If votes are different from previous candidate, update the rank
                        if($votes != $previousVotes) {
                            $rank = $rankIncrement;
                        }
                        $previousVotes = $votes;
                        $rankIncrement++;

                        // Determine if this candidate is a winner (for highlighting)
                        $isMaxVote = ($votes == $maxVotes);
                        $hasRequiredMajority = (!$needsMajority || $votes >= $minimumVotesToWin);
                        $isWinner = ($isMaxVote && $hasRequiredMajority);

                        // Count how many candidates have the maximum vote count (for tie detection)
                        $countMaxVotes = 0;
                        foreach($voteCounts[$position_id] as $vote) {
                            if($vote == $maxVotes) {
                                $countMaxVotes++;
                            }
                        }

                        // Set status message based on conditions
                        if($needsMajority && $isMaxVote && $votes < $minimumVotesToWin) {
                            // Special case for majority positions without required votes
                            $status = "<span class='badge bg-warning' style='background-color: #ffc107; color: #212529; padding: 5px 10px; border-radius: 4px;'><i class='fa fa-exclamation-triangle mr-1'></i> RE-ELECTION NEEDED</span>";
                        } else if($isMaxVote) {
                            // This is a candidate with max votes
                            if($countMaxVotes > 1) {
                                // Multiple candidates have the same max votes (tie)
                                $ordinal = getOrdinal($rank);
                                $status = "<span class='badge bg-info' style='background-color: #17a2b8; color: white; padding: 5px 10px; border-radius: 4px;'><i class='fa fa-balance-scale mr-1'></i> TIE - $ordinal PLACE</span>";
                            } else {
                                // Only one candidate has the max vote - clear winner
                                $status = "<span class='badge bg-success' style='background-color: #28a745; color: white; padding: 5px 10px; border-radius: 4px;'><i class='fa fa-trophy mr-1'></i> WINNER</span>";
                            }
                        } else {
                            // Show ordinal ranking for non-winners (1st, 2nd, 3rd, etc.)
                            $ordinal = getOrdinal($rank);
                            
                            // Determine badge color based on rank
                            if($rank == 2) {
                                $badgeColor = "bg-info' style='background-color: #17a2b8; color: white;";
                                $icon = "<i class='fa fa-medal mr-1'></i>";
                            } else if($rank == 3) {
                                $badgeColor = "bg-primary' style='background-color: #007bff; color: white;";
                                $icon = "<i class='fa fa-award mr-1'></i>";
                            } else {
                                $badgeColor = "bg-secondary' style='background-color: #6c757d; color: white;";
                                $icon = "";
                            }
                            
                            $status = "<span class='badge $badgeColor padding: 5px 10px; border-radius: 4px;'>$icon $ordinal PLACE</span>";
                        }

                        // Row highlighting (only highlight 1st place that meets requirements)
                        $rowClass = ($isWinner) ? "table-success" : "";
                        
                        echo "<tr class='$rowClass'>";
                        echo "<td>" . $rank . "</td>";
                        echo "<td><strong>" . $candidateDetails[$candidate_id]['name'] . "</strong></td>";
                        echo "<td>" . $votes . "</td>";
                        echo "<td>";
                        echo "<div class='progress' style='height: 20px; margin-bottom: 0;'>";
                        
                        // Color the progress bar based on rank
                        $progressBarColor = "";
                        if($rank == 1) {
                            $progressBarColor = "background-color: #28a745;"; // Green
                        } else if($rank == 2) {
                            $progressBarColor = "background-color: #17a2b8;"; // Blue
                        } else if($rank == 3) {
                            $progressBarColor = "background-color: #007bff;"; // Lighter blue
                        } else {
                            $progressBarColor = "background-color: #6c757d;"; // Gray
                        }
                        
                        echo "<div class='progress-bar' role='progressbar' style='width: " . $percentage . "%; $progressBarColor' aria-valuenow='" . $percentage . "' aria-valuemin='0' aria-valuemax='100'>" . $percentage . "%</div>";
                        echo "</div>";
                        echo "</td>";
                        echo "<td class='text-center'>" . $status . "</td>";
                        echo "</tr>";
                    }
                }
                echo "</tbody>";
                echo "<tfoot>
                        <tr class='table-info' style='background-color: #e3f2fd;'>
                            <td colspan='2'><strong>Total Votes:</strong></td>
                            <td><strong>" . $totalVotes . "</strong></td>
                            <td><strong>100%</strong></td>
                            <td></td>
                        </tr>";
                        
                // Only show majority requirement for positions that need it
                if($needsMajority) {
                    echo "<tr class='table-warning' style='background-color: #fff3cd;'>
                        <td colspan='2'><strong>Votes Needed to Win (50%+1):</strong></td>
                        <td colspan='3'><strong>" . $minimumVotesToWin . " votes</strong></td>
                    </tr>";
                }
                
                echo "</tfoot>";
                echo "</table>";
                echo "</div>";
                
                // Add chart visualization
                echo "<div class='chart-container mt-4 mb-3' style='position: relative; height: 200px;'>";
                echo "<canvas id='chart-position-$position_id'></canvas>";
                echo "</div>";
                
                // Generate JavaScript for the chart with updated colors based on rank
                echo "<script>
                    document.addEventListener('DOMContentLoaded', function() {
                        var ctx = document.getElementById('chart-position-$position_id').getContext('2d');
                        var chartData = {
                            labels: [";
                            
                            // Generate labels (candidate names)
                            $candidates_array = array();
                            foreach($voteCounts[$position_id] as $candidate_id => $votes) {
                                if(isset($candidateDetails[$candidate_id])) {
                                    $candidates_array[] = "'" . addslashes($candidateDetails[$candidate_id]['name']) . "'";
                                }
                            }
                            echo implode(', ', $candidates_array);
                            
                            echo "],
                            datasets: [{
                                label: 'Votes',
                                data: [";
                                
                                // Generate vote counts
                                $votes_array = array();
                                foreach($voteCounts[$position_id] as $votes) {
                                    $votes_array[] = $votes;
                                }
                                echo implode(', ', $votes_array);
                                
                                echo "],
                                backgroundColor: [";
                                
                                // Generate colors based on rank
                                $colors = array();
                                $colorRank = 1;
                                $prevVotes = -1;
                                foreach($voteCounts[$position_id] as $candidate_id => $votes) {
                                    if($votes != $prevVotes) {
                                        $colorRank = $colors ? count($colors) + 1 : 1;
                                    }
                                    $prevVotes = $votes;
                                    
                                    if($colorRank == 1) {
                                        if($needsMajority && $votes < $minimumVotesToWin) {
                                            $colors[] = "'rgba(255, 193, 7, 0.7)'"; // Yellow for leading but not winner in majority position
                                        } else {
                                            $colors[] = "'rgba(40, 167, 69, 0.7)'"; // Green for 1st
                                        }
                                    } else if($colorRank == 2) {
                                        $colors[] = "'rgba(23, 162, 184, 0.7)'"; // Cyan for 2nd
                                    } else if($colorRank == 3) {
                                        $colors[] = "'rgba(0, 123, 255, 0.7)'"; // Blue for 3rd
                                    } else {
                                        $colors[] = "'rgba(108, 117, 125, 0.7)'"; // Gray for others
                                    }
                                }
                                echo implode(', ', $colors);
                                
                                echo "],
                                borderColor: [";
                                
                                // Generate border colors
                                $border_colors = array();
                                $colorRank = 1;
                                $prevVotes = -1;
                                foreach($voteCounts[$position_id] as $candidate_id => $votes) {
                                    if($votes != $prevVotes) {
                                        $colorRank = $border_colors ? count($border_colors) + 1 : 1;
                                    }
                                    $prevVotes = $votes;
                                    
                                    if($colorRank == 1) {
                                        if($needsMajority && $votes < $minimumVotesToWin) {
                                            $border_colors[] = "'rgba(255, 193, 7, 1)'";
                                        } else {
                                            $border_colors[] = "'rgba(40, 167, 69, 1)'";
                                        }
                                    } else if($colorRank == 2) {
                                        $border_colors[] = "'rgba(23, 162, 184, 1)'";
                                    } else if($colorRank == 3) {
                                        $border_colors[] = "'rgba(0, 123, 255, 1)'";
                                    } else {
                                        $border_colors[] = "'rgba(108, 117, 125, 1)'";
                                    }
                                }
                                echo implode(', ', $border_colors);
                                
                                echo "],
                                borderWidth: 1
                            }]
                        };
                        
                        var chartOptions = {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        precision: 0
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        };
                        
                        var chart = new Chart(ctx, {
                            type: 'bar',
                            data: chartData,
                            options: chartOptions
                        });
                    });
                </script>";
            } else {
                echo "<div class='alert alert-warning' style='border-radius: 8px;'>
                        <i class='fa fa-exclamation-circle mr-2'></i> No votes recorded for this position.
                      </div>";
            }
            echo "</div>";
        }
        echo "</div>";
    }

    // Display the vote summary
    displayVoteSummary($row['votes'], $row['candidates'], $row['positions']);

    echo "</div>"; // Close printable-content div

    // Add print button
    echo "<div class='text-center mt-4'>";
    echo "<button class='btn btn-success' id='print-button' style='background-color: #046a0f; border-color: #035a0d;'>";
    echo "<i class='fa fa-print mr-2'></i> Print Results</button>";
    echo "</div>";
}
?>

<style>
.results-container {
    margin: 20px 0;
}
.position-results {
    margin-bottom: 30px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.position-title {
    color: #2c3e50;
    border-bottom: 2px solid #28a745;
    padding-bottom: 10px;
    margin-bottom: 20px;
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
.progress {
    border-radius: 20px;
    overflow: hidden;
    height: 20px;
    background-color: #f0f0f0;
}
.mr-1 {
    margin-right: 4px;
}
.mr-2 {
    margin-right: 8px;
}
.mb-2 {
    margin-bottom: 8px;
}
.mb-3 {
    margin-bottom: 16px;
}
.mb-4 {
    margin-bottom: 24px;
}
.mt-4 {
    margin-top: 24px;
}
.px-3 {
    padding-left: 16px;
    padding-right: 16px;
}
.text-center {
    text-align: center;
}
.text-muted {
    color: #6c757d;
}
@media print {
    .btn, .no-print {
        display: none !important;
    }
    .position-results {
        box-shadow: none;
        border: 1px solid #ddd;
        page-break-inside: avoid;
    }
    body {
        padding: 20px !important;
    }
}
</style>

<script>
document.getElementById('print-button').addEventListener('click', function() {
    var printContent = document.getElementById('printable-content').innerHTML;
    var originalContent = document.body.innerHTML;
    var electionTitle = document.querySelector('#printable-content h5') ? 
        document.querySelector('#printable-content h5').innerText : 'Election Results';

    document.body.innerHTML = `
        <div style="padding: 30px; max-width: 800px; margin: 0 auto;">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="background-color: #046a0f; color: white; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin-right: 10px;">
                    <i class="fa fa-vote-yea" style="font-size: 20px;"></i>
                </div>
                <div>
                    <h1 style="color: #046a0f; font-size: 22px; margin: 0; font-weight: bold;">Election System</h1>
                    <p style="color: #666; margin: 3px 0 0 0;">Deleted Election Report</p>
                </div>
            </div>
            <h2 style="text-align: center; color: #046a0f; margin-bottom: 20px; font-size: 24px; padding-bottom: 10px; border-bottom: 2px solid #e0f0e0;">${electionTitle}</h2>
            <div style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
                ${printContent}
            </div>
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                <p>Generated on ${new Date().toLocaleString()}</p>
                <p>© ${new Date().getFullYear()} Election System. All rights reserved.</p>
            </div>
        </div>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    
    // Re-initialize the event handler
    document.getElementById('print-button').addEventListener('click', this.onclick);
});
</script>
