<?php
// Include the database connection
include 'conn.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // Fetch deleted election details
    $sql = "SELECT * FROM history WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if (!$row) {
        echo "<div class='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role='alert'>
                <p><i class='fas fa-exclamation-triangle mr-2'></i>Election record not found.</p>
              </div>";
        exit;
    }
?>

<div id="printable-content" class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="gradient-bg text-white p-6 text-center">
        <h2 class="text-3xl font-bold mb-2"><?= htmlspecialchars($row['election_title']) ?></h2>
        <p class="flex items-center justify-center space-x-2">
            <i class="fas fa-calendar-alt"></i>
            <span><?= date('F d, Y h:i A', strtotime($row['deleted_at'])) ?></span>
        </p>
    </div>
    
    <div class="px-6 py-4">
        <?php
        // Function to calculate and display vote summary
        function displayVoteSummary($votes, $candidates, $positions, $partylists) {
            if (empty($votes) || empty($candidates) || empty($positions)) {
                echo "<div class='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4'>
                        <p class='text-yellow-700'><i class='fas fa-exclamation-circle mr-2'></i>No voting data available.</p>
                      </div>";
                return;
            }

            $voteRecords = explode(";", $votes);
            $candidateRecords = explode(";", $candidates);
            $positionRecords = explode(";", $positions);
            $partylistRecords = !empty($partylists) ? explode(";", $partylists) : [];

            // Create arrays to store data
            $voteCounts = [];
            $candidateDetails = [];
            $positionDetails = [];
            $partylistDetails = [];
            $voterCount = array_unique(array_map(function($vote) {
                $data = explode("|", $vote);
                return $data[1] ?? ''; // voters_id
            }, $voteRecords));

            // Process partylists
            foreach ($partylistRecords as $partylist) {
                $data = explode("|", $partylist);
                if (count($data) >= 2) {
                    $partylistDetails[$data[0]] = $data[1]; // partylist_id => name
                }
            }

            // Process candidates
            foreach ($candidateRecords as $candidate) {
                $data = explode("|", $candidate);
                if (count($data) >= 4) {
                    $partylist_id = $data[6] ?? null;
                    $candidateDetails[$data[0]] = [
                        'name' => $data[2] . " " . $data[3],
                        'position_id' => $data[1],
                        'photo' => $data[4] ?? '',
                        'platform' => $data[5] ?? '',
                        'partylist_id' => $partylist_id,
                        'partylist_name' => $partylist_id ? ($partylistDetails[$partylist_id] ?? 'Unknown') : 'Independent'
                    ];
                }
            }

            // Process positions
            foreach ($positionRecords as $position) {
                $data = explode("|", $position);
                if (count($data) >= 2) {
                    $positionDetails[$data[0]] = [
                        'name' => $data[1],
                        'max_vote' => $data[2] ?? 1
                    ];
                }
            }

            // Count votes
            foreach ($voteRecords as $vote) {
                $data = explode("|", $vote);
                if (count($data) >= 3) {
                    $candidate_id = $data[2];
                    $position_id = $data[3];

                    if (!isset($voteCounts[$position_id][$candidate_id])) {
                        $voteCounts[$position_id][$candidate_id] = 0;
                    }
                    $voteCounts[$position_id][$candidate_id]++;
                }
            }

            // Calculate some overall stats
            $totalVoters = count($voterCount);
            $totalPositions = count($positionDetails);
            $totalCandidates = count($candidateDetails);

            // Display overall stats
            echo "<div class='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>";
            
            echo "<div class='bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500 shadow-md card-hover'>
                    <div class='flex justify-between items-center'>
                        <div>
                            <p class='text-sm text-gray-500'>Total Voters</p>
                            <p class='text-2xl font-bold text-blue-700'>{$totalVoters}</p>
                        </div>
                        <div class='bg-blue-100 p-3 rounded-full'>
                            <i class='fas fa-users text-blue-700 text-xl'></i>
                        </div>
                    </div>
                  </div>";
                  
            echo "<div class='bg-green-50 rounded-lg p-4 border-l-4 border-green-500 shadow-md card-hover'>
                    <div class='flex justify-between items-center'>
                        <div>
                            <p class='text-sm text-gray-500'>Positions</p>
                            <p class='text-2xl font-bold text-green-700'>{$totalPositions}</p>
                        </div>
                        <div class='bg-green-100 p-3 rounded-full'>
                            <i class='fas fa-sitemap text-green-700 text-xl'></i>
                        </div>
                    </div>
                  </div>";
                  
            echo "<div class='bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500 shadow-md card-hover'>
                    <div class='flex justify-between items-center'>
                        <div>
                            <p class='text-sm text-gray-500'>Candidates</p>
                            <p class='text-2xl font-bold text-purple-700'>{$totalCandidates}</p>
                        </div>
                        <div class='bg-purple-100 p-3 rounded-full'>
                            <i class='fas fa-user-tie text-purple-700 text-xl'></i>
                        </div>
                    </div>
                  </div>";
                  
            echo "</div>";

            // Display results by position
            echo "<div class='space-y-8'>";
            foreach ($positionDetails as $position_id => $position) {
                $position_name = $position['name'];
                $max_vote = $position['max_vote'];
                
                echo "<div class='bg-white shadow-md rounded-lg overflow-hidden'>";
                echo "<div class='bg-green-700 text-white p-4 flex items-center justify-between'>
                        <h3 class='text-xl font-bold flex items-center'>
                            <i class='fas fa-user-tie mr-2'></i>{$position_name}
                        </h3>
                        <span class='bg-green-800 text-xs text-white px-2 py-1 rounded'>Max votes: {$max_vote}</span>
                      </div>";
                
                echo "<div class='p-5'>";

                if (isset($voteCounts[$position_id])) {
                    // Sort candidates by vote count
                    arsort($voteCounts[$position_id]);

                    // Calculate total votes for this position
                    $totalVotes = array_sum($voteCounts[$position_id]);

                    // Get the number of candidates for this position
                    $candidateCount = count($voteCounts[$position_id]);

                    // Calculate minimum votes needed to win (50% + 1)
                    $minimumVotesToWin = floor($totalVotes / 2) + 1;

                    // Find the highest vote count
                    $highestVoteCount = max($voteCounts[$position_id]);
                    
                    // Check for ties
                    $tiedCandidates = array_filter($voteCounts[$position_id], function($votes) use ($highestVoteCount) {
                        return $votes == $highestVoteCount && $votes > 0;
                    });
                    $isTie = count($tiedCandidates) > 1;

                    // Display vote count summary
                    echo "<div class='mb-4 p-3 bg-gray-50 rounded-lg flex justify-between items-center'>
                            <div>
                                <span class='text-sm text-gray-500'>Total Votes:</span>
                                <span class='ml-2 font-bold text-gray-700'>{$totalVotes}</span>
                            </div>
                            <div>
                                <span class='text-sm text-gray-500'>Votes Needed to Win:</span>
                                <span class='ml-2 font-bold text-gray-700'>{$minimumVotesToWin}</span>
                            </div>
                            <div>
                                <span class='text-sm text-gray-500'>Candidates:</span>
                                <span class='ml-2 font-bold text-gray-700'>{$candidateCount}</span>
                            </div>
                          </div>";

                    // If there's a tie, show a warning
                    if ($isTie) {
                        echo "<div class='mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700'>
                                <p><i class='fas fa-exclamation-triangle mr-2'></i>There was a tie in this position between " . count($tiedCandidates) . " candidates with {$highestVoteCount} votes each.</p>
                              </div>";
                    }

                    // Display candidates as bar charts
                    echo "<div class='space-y-4'>";
                    $rank = 1;
                    foreach ($voteCounts[$position_id] as $candidate_id => $votes) {
                        if (isset($candidateDetails[$candidate_id])) {
                            $percentage = ($totalVotes > 0) ? round(($votes / $totalVotes) * 100, 1) : 0;
                            $relativePercentage = ($highestVoteCount > 0) ? ($votes / $highestVoteCount) * 100 : 0;
                            
                            // Determine status
                            $statusClass = '';
                            $statusText = '';
                            $barColor = 'bg-gray-400';
                            
                            if ($votes === 0) {
                                $statusClass = 'text-gray-500';
                                $statusText = 'No Votes';
                                $barColor = 'bg-gray-400';
                            } elseif ($isTie && $votes === $highestVoteCount) {
                                $statusClass = 'text-yellow-600 font-bold';
                                $statusText = 'Tie';
                                $barColor = 'bg-yellow-500';
                            } elseif ($rank === 1 && $votes >= $minimumVotesToWin) {
                                $statusClass = 'text-green-600 font-bold';
                                $statusText = 'Winner';
                                $barColor = 'bg-green-600';
                            } else {
                                $statusClass = 'text-red-500';
                                $statusText = 'Runner-up';
                                $barColor = 'bg-blue-500';
                            }
                            
                            $candidate_name = htmlspecialchars($candidateDetails[$candidate_id]['name']);
                            $partylist_name = htmlspecialchars($candidateDetails[$candidate_id]['partylist_name']);
                            
                            echo "<div class='bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow duration-200'>
                                    <div class='flex justify-between items-center mb-1'>
                                        <div class='flex items-center space-x-3'>
                                            <div class='w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-700'>
                                                {$rank}
                                            </div>
                                            <div>
                                                <div class='font-medium'>{$candidate_name}</div>
                                                <div class='text-xs text-gray-500'>{$partylist_name}</div>
                                            </div>
                                        </div>
                                        <div class='flex items-center space-x-3'>
                                            <div class='font-bold'>{$votes} votes</div>
                                            <div class='{$statusClass} flex items-center'>";
                                if ($statusText == 'Winner') {
                                    echo "<i class='fas fa-crown text-yellow-500 mr-1'></i>";
                                } elseif ($statusText == 'Tie') {
                                    echo "<i class='fas fa-balance-scale text-yellow-600 mr-1'></i>";
                                }
                                echo "  {$statusText}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Bar representation -->
                                    <div class='relative h-8 bg-gray-200 rounded-lg overflow-hidden mt-2'>
                                        <div class='absolute top-0 left-0 h-full {$barColor} rounded-lg transition-all duration-1000' 
                                             style='width: {$relativePercentage}%;'></div>
                                        <div class='absolute top-0 left-0 h-full w-full flex items-center justify-between px-3'>
                                            <span class='text-white font-medium drop-shadow-md'>{$candidate_name}</span>
                                            <span class='text-white font-bold drop-shadow-md'>{$percentage}%</span>
                                        </div>
                                    </div>
                                  </div>";
                                  
                            $rank++;
                        }
                    }
                    
                    // Calculate abstain count (total voters - total votes)
                    $abstainCount = $totalVoters - $totalVotes;
                    $abstainPercentage = ($totalVoters > 0) ? round(($abstainCount / $totalVoters) * 100, 1) : 0;
                    $relativeAbstainPercentage = ($highestVoteCount > 0) ? ($abstainCount / $highestVoteCount) * 100 : 0;
                    
                    // Display abstain bar
                    echo "<div class='bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow duration-200 mt-6'>
                            <div class='flex justify-between items-center mb-1'>
                                <div class='font-medium text-purple-700'>Abstained</div>
                                <div class='font-bold text-purple-700'>{$abstainCount} votes</div>
                            </div>
                            
                            <!-- Abstain Bar representation -->
                            <div class='relative h-8 bg-gray-200 rounded-lg overflow-hidden'>
                                <div class='absolute top-0 left-0 h-full bg-purple-500 rounded-lg transition-all duration-1000' 
                                     style='width: {$relativeAbstainPercentage}%;'></div>
                                <div class='absolute top-0 left-0 h-full w-full flex items-center justify-between px-3'>
                                    <span class='text-white font-medium drop-shadow-md'>Abstained</span>
                                    <span class='text-white font-bold drop-shadow-md'>{$abstainPercentage}%</span>
                                </div>
                            </div>
                          </div>";
                    
                    echo "</div>"; // Close space-y-4
                } else {
                    echo "<div class='bg-yellow-50 border-l-4 border-yellow-400 p-4'>
                            <p class='text-yellow-700'><i class='fas fa-exclamation-circle mr-2'></i>No votes recorded for this position.</p>
                          </div>";
                }
                
                echo "</div>"; // Close p-5
                echo "</div>"; // Close bg-white shadow-md
            }
            echo "</div>"; // Close space-y-8
        }

        // Display the vote summary
        displayVoteSummary(
            $row['votes'], 
            $row['candidates'], 
            $row['positions'], 
            $row['partylists'] ?? ''
        );
        ?>
    </div>
</div>

<div class="mt-6 flex justify-between">
    <button class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-all duration-300 flex items-center" onclick="closeModal()">
        <i class="fas fa-arrow-left mr-2"></i> Back
    </button>
    
    <button class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all duration-300 flex items-center" id="print-button">
        <i class="fas fa-print mr-2"></i> Print Results
    </button>
</div>

<script>
document.getElementById('print-button').addEventListener('click', function() {
    var printContent = document.getElementById('printable-content').innerHTML;
    var originalContent = document.body.innerHTML;
    
    // Create print-friendly version with styling
    var printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Election Results - ${<?= json_encode(htmlspecialchars($row['election_title'])) ?>}</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    color: #333;
                }
                .gradient-bg {
                    background: linear-gradient(135deg, #1e5631, #2e7d32);
                    color: white;
                    padding: 20px;
                    text-align: center;
                    margin-bottom: 20px;
                }
                h2 {
                    margin: 0;
                    font-size: 24px;
                }
                .card {
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .card-header {
                    background-color: #2e7d32;
                    color: white;
                    padding: 10px 15px;
                    font-weight: bold;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                }
                .card-body {
                    padding: 15px;
                }
                .stats-container {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                }
                .stat-card {
                    flex-basis: 30%;
                    border-left: 4px solid #2e7d32;
                    background-color: #f9f9f9;
                    padding: 10px;
                    margin-bottom: 10px;
                }
                .candidate {
                    margin-bottom: 15px;
                    padding: 10px;
                    background-color: #f5f5f5;
                    border-radius: 4px;
                }
                .bar-container {
                    height: 24px;
                    background-color: #e0e0e0;
                    border-radius: 4px;
                    margin-top: 8px;
                    position: relative;
                }
                .bar {
                    height: 100%;
                    border-radius: 4px;
                }
                .bar-green { background-color: #2e7d32; }
                .bar-yellow { background-color: #ffc107; }
                .bar-blue { background-color: #2196f3; }
                .bar-gray { background-color: #9e9e9e; }
                .bar-purple { background-color: #9c27b0; }
                .bar-text {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;
                    color: white;
                    font-weight: bold;
                }
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        margin: 0;
                        padding: 15px;
                    }
                    .page-break {
                        page-break-after: always;
                    }
                }
            </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    setTimeout(function() {
        printWindow.print();
    }, 500);
});

function closeModal() {
    // This assumes the function is called from within a modal
    // If using as a standalone page, adjust accordingly
    if (window.parent && window.parent.document.getElementById('historyModal')) {
        window.parent.document.getElementById('historyModal').classList.add('hidden');
    } else {
        window.history.back();
    }
}
</script>

<?php
} else {
    echo "<div class='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4' role='alert'>
            <p><i class='fas fa-exclamation-triangle mr-2'></i>No election ID provided.</p>
          </div>";
}
?>