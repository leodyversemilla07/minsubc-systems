<?php
session_start();
require 'conn.php';

// If not logged in, redirect to login page
if (!isset($_SESSION['election_id'])) {
    header("Location: index.php");
    exit();
}

$election_id = $_SESSION['election_id'];

// Fetch election details
$election_query = "SELECT name, status FROM elections WHERE id = ?";
$stmt = $conn->prepare($election_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$election = $stmt->get_result()->fetch_assoc();
$election_name = $election['name'] ?? 'Election not found';
$election_status = $election['status'] ?? 0;

// Fetch total voters
$total_voters_query = "SELECT COUNT(*) AS total_voters FROM voters WHERE election_id = ?";
$stmt = $conn->prepare($total_voters_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$total_voters_result = $stmt->get_result()->fetch_assoc();
$total_voters = $total_voters_result['total_voters'] ?? 0;

// Count total votes cast
$votes_cast_query = "SELECT COUNT(DISTINCT voters_id) AS votes_cast FROM votes WHERE election_id = ?";
$stmt = $conn->prepare($votes_cast_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$votes_cast_result = $stmt->get_result()->fetch_assoc();
$votes_cast = $votes_cast_result['votes_cast'] ?? 0;

// Count abstain votes (where candidate_id is NULL)
$abstain_votes_query = "SELECT COUNT(*) AS abstain_votes FROM votes WHERE election_id = ? AND candidate_id IS NULL";
$stmt = $conn->prepare($abstain_votes_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$abstain_votes_result = $stmt->get_result()->fetch_assoc();
$abstain_votes = $abstain_votes_result['abstain_votes'] ?? 0;

// Calculate the threshold for winning (50% + 1)
$winning_threshold = ceil(($total_voters / 2) + 1);

// Function to get abstain votes by position
function getAbstainVotesByPosition($election_id, $conn) {
    $sql = "
        SELECT p.position_id, 
               p.description AS position, 
               COUNT(v.id) AS abstain_votes
        FROM positions p
        LEFT JOIN votes v ON p.position_id = v.position_id AND v.election_id = ? AND v.candidate_id IS NULL
        WHERE p.election_id = ?
        GROUP BY p.position_id, p.description
        ORDER BY p.position_id;
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $election_id, $election_id);
    $stmt->execute();
    return $stmt->get_result();
}

// Function to get votes by position
function getVotesByPosition($election_id, $conn) {
    $sql = "
        SELECT p.description AS position,
               CONCAT(c.firstname, ' ', c.lastname) AS candidate,
               c.photo AS photo,
               c.platform AS platform,
               pl.name AS partylist,
               COALESCE(COUNT(v.candidate_id), 0) AS total_votes,
               p.position_id,
               p.max_vote,
               c.id AS candidate_id,
               (SELECT COUNT(*) FROM candidates WHERE position_id = p.position_id AND election_id = ?) AS candidate_count
        FROM candidates c
        JOIN positions p ON c.position_id = p.position_id
        LEFT JOIN partylists pl ON c.partylist_id = pl.partylist_id
        LEFT JOIN votes v ON c.id = v.candidate_id AND v.election_id = ?
        WHERE c.election_id = ?
        GROUP BY p.position_id, c.id
        ORDER BY p.position_id, total_votes DESC;
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $election_id, $election_id, $election_id);
    $stmt->execute();
    return $stmt->get_result();
}

// Function to determine which positions require majority voting
function positionRequiresMajority($position_id, $conn) {
    // You can customize this list based on your specific positions
    $majority_positions = [1]; // Assuming position_id 1 requires majority (e.g., President)
    return in_array($position_id, $majority_positions);
}

// Get abstain votes by position
$abstainVotesByPosition = [];
$abstainResults = getAbstainVotesByPosition($election_id, $conn);
while ($row = $abstainResults->fetch_assoc()) {
    $abstainVotesByPosition[$row['position']] = $row['abstain_votes'];
}

// Process votes data
$results = getVotesByPosition($election_id, $conn);
$positionsData = [];

// Process results to organize by position
while ($row = $results->fetch_assoc()) {
    $candidate_count = $row['candidate_count'];
    $max_vote = $row['max_vote'];
    $position_id = $row['position_id'];
    $position_name = $row['position'];

    // If this position isn't in the array yet, initialize it
    if (!isset($positionsData[$position_name])) {
        $positionsData[$position_name] = [
            'position_id' => $position_id,
            'max_vote' => $max_vote,
            'candidates' => [],
            'all_candidates' => []
        ];
    }

    // Add this candidate to the all_candidates array for sorting later
    $positionsData[$position_name]['all_candidates'][] = [
        'candidate_id' => $row['candidate_id'],
        'candidate' => $row['candidate'],
        'photo' => $row['photo'],
        'platform' => $row['platform'],
        'partylist' => $row['partylist'],
        'total_votes' => $row['total_votes']
    ];
}

// Process winners for each position
foreach ($positionsData as $position => $data) {
    $max_vote = $data['max_vote'];
    $position_id = $data['position_id'];
    $requires_majority = positionRequiresMajority($position_id, $conn);
    $candidate_count = count($data['all_candidates']);
    
    // Sort candidates by votes in descending order
    usort($data['all_candidates'], function($a, $b) {
        return $b['total_votes'] - $a['total_votes'];
    });
    
    // Determine winners based on position rules
    $winner_count = 0;
    $highest_votes = $data['all_candidates'][0]['total_votes'] ?? 0;
    
    foreach ($data['all_candidates'] as $index => $candidate) {
        $is_winner = false;
        
        // For single candidate positions
        if ($candidate_count == 1) {
            // Winner needs 50%+1 of total voters
            $is_winner = ($candidate['total_votes'] >= $winning_threshold);
        }
        // For single winner positions that require majority
        else if ($max_vote == 1 && $requires_majority) {
            // Winner needs 50%+1 of total votes
            $is_winner = ($candidate['total_votes'] >= $winning_threshold);
        }
        // For multi-winner positions (like senators)
        else if ($max_vote > 1) {
            // Top N candidates win
            $is_winner = ($winner_count < $max_vote);
        }
        // For positions that just need highest votes
        else {
            // Winner is the candidate with most votes
            $is_winner = ($candidate['total_votes'] == $highest_votes && $winner_count < $max_vote);
        }
        
        // Update winner status and count
        $candidate['is_winner'] = $is_winner;
        if ($is_winner) $winner_count++;
        
        // Add to candidates array
        $positionsData[$position]['candidates'][] = $candidate;
    }
    
    // Remove the temporary all_candidates array
    unset($positionsData[$position]['all_candidates']);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Election Results</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #1e5631;
            --primary-light: #e9f5e9;
            --accent-color: #ffc107;
            --danger-color: #e53935;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f5f7fa;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #164a25, #2e7d32);
        }
        
        .card-hover {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            border-left: 4px solid transparent;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(46, 125, 50, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(46, 125, 50, 0); }
            100% { box-shadow: 0 0 0 0 rgba(46, 125, 50, 0); }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #2e7d32;
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #1e5631;
        }
        
        /* Animated elements */
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Progress bars */
        .progress-bar {
            transition: width 1s ease-out;
        }
        
        /* Winner badge and ribbon */
        .winner-badge {
            position: relative;
            overflow: hidden;
        }
        
        .winner-badge::after {
            content: 'WINNER';
            position: absolute;
            top: 10px;
            right: -35px;
            transform: rotate(45deg);
            background: var(--accent-color);
            color: #000;
            font-size: 10px;
            font-weight: bold;
            padding: 2px 35px;
            z-index: 1;
        }

        .ribbon {
            width: 150px;
            height: 150px;
            overflow: hidden;
            position: absolute;
            top: -10px;
            right: -10px;
            z-index: 1;
        }
        .ribbon::before,
        .ribbon::after {
            position: absolute;
            z-index: -1;
            content: '';
            display: block;
            border: 5px solid #2980b9;
            border-top-color: transparent;
            border-right-color: transparent;
        }
        .ribbon::before {
            top: 0;
            left: 0;
        }
        .ribbon::after {
            bottom: 0;
            right: 0;
        }
        .ribbon span {
            position: absolute;
            display: block;
            width: 225px;
            padding: 8px 0;
            background-color: #ffc107;
            box-shadow: 0 5px 10px rgba(0,0,0,.1);
            color: #111;
            font: 700 14px/1 'Poppins', sans-serif;
            text-shadow: 0 1px 1px rgba(0,0,0,.2);
            text-transform: uppercase;
            text-align: center;
            transform: rotate(45deg);
            right: -25%;
            top: 30px;
        }

        /* Confetti Animation */
        @keyframes confetti-slow {
            0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
            100% { transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg); }
        }
        @keyframes confetti-medium {
            0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
            100% { transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg); }
        }
        @keyframes confetti-fast {
            0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
            100% { transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg); }
        }
        .confetti-container {
            perspective: 700px;
            position: absolute;
            overflow: hidden;
            top: 0;
            right: 0;
            left: 0;
            height: 100vh;
            pointer-events: none;
        }
        .confetti {
            position: absolute;
            z-index: 1;
            top: -10px;
            border-radius: 0%;
        }
        .confetti--animation-slow {
            animation: confetti-slow 3.25s linear 1 forwards;
        }
        .confetti--animation-medium {
            animation: confetti-medium 2.75s linear 1 forwards;
        }
        .confetti--animation-fast {
            animation: confetti-fast 2.25s linear 1 forwards;
        }
        
        /* Enhanced voting bars */
        .vote-bar {
            height: 12px;
            transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .vote-bar-bg {
            height: 12px;
            background: repeating-linear-gradient(
                45deg,
                rgba(0, 0, 0, 0.05),
                rgba(0, 0, 0, 0.05) 10px,
                rgba(0, 0, 0, 0.1) 10px,
                rgba(0, 0, 0, 0.1) 20px
            );
        }

        /* Platform tooltip */
        .tooltip {
            position: relative;
            display: inline-block;
        }
        
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 250px;
            background-color: #333;
            color: #fff;
            text-align: left;
            border-radius: 6px;
            padding: 8px;
            position: absolute;
            z-index: 1;
            left: 50%;
            transform: translateX(-50%);
            bottom: 125%;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .tooltip .tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #333 transparent transparent transparent;
        }
        
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }

        /* Certificate styles */
        .certificate {
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
            border: 2px solid #1e5631;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            max-width: 800px;
            margin: 0 auto;
        }
        
        .certificate:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40 40 0 1 0 80 0a40 40 0 1 0 -80 0' fill='%231e5631' fill-opacity='0.05'/%3E%3C/svg%3E");
            background-size: 100px 100px;
            z-index: 0;
        }
        
        .certificate-content {
            position: relative;
            z-index: 1;
        }
        
        .seal {
            position: absolute;
            bottom: 30px;
            right: 30px;
            width: 120px;
            height: 120px;
            background: rgba(30, 86, 49, 0.1);
            border: 2px solid rgba(30, 86, 49, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(-15deg);
        }
        
        .seal-content {
            width: 100px;
            height: 100px;
            border: 1px dashed #1e5631;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #1e5631;
            font-size: 12px;
            font-weight: bold;
            padding: 5px;
            text-align: center;
            transform: rotate(0deg);
        }

        .text-shadow {
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-900">
    <!-- Confetti for winners celebration -->
    <div class="confetti-container"></div>

    <!-- Navigation Bar -->
    <nav class="gradient-bg text-white shadow-lg">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <img src="../pics/logo.png" alt="Logo" class="h-12 w-12 rounded-full shadow-md border-2 border-white">
                <a href="home.php" class="text-2xl font-bold flex items-center space-x-2">
                    <i class="fas fa-poll"></i>
                    <span>Final Election Results</span>
                </a>
            </div>
            <div class="space-x-4 flex">
                <button onclick="printResults()" class="bg-white text-green-700 hover:bg-gray-100 px-4 py-2 rounded-full shadow-md transition-all duration-300 flex items-center">
                    <i class="fas fa-print mr-2"></i> Print Results
                </button>
                <button onclick="downloadCertificate()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 flex items-center">
                    <i class="fas fa-certificate mr-2"></i> Download Certificate
                </button>
                <a href="../index.php" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 flex items-center">
                    <i class="fas fa-sign-out-alt mr-2"></i> Exit
                </a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8" id="printable-content">
        <!-- Header -->
        <header class="text-center mb-10">
            <div class="inline-block bg-green-100 text-green-800 font-bold py-2 px-6 rounded-full mb-4 shadow-sm">
                <i class="fas fa-check-circle mr-2"></i> Election Completed
            </div>
            <h1 class="text-4xl font-bold text-green-800 mb-2"><?php echo htmlspecialchars($election_name); ?></h1>
            <div class="w-32 h-1 bg-green-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Official Election Results</p>
        </header>

        <!-- Election Statistics -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-10">
            <h2 class="text-2xl font-bold text-center mb-6 text-green-700">Election Summary</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Total Registered Voters -->
                <div class="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
                    <div class="flex justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Total Registered Voters</p>
                            <p class="text-3xl font-bold text-green-700"><?php echo $total_voters; ?></p>
                        </div>
                        <div class="bg-white p-3 rounded-full shadow-inner">
                            <i class="fas fa-users text-green-700 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Votes Cast -->
                <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm">
                    <div class="flex justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Total Votes Cast</p>
                            <p class="text-3xl font-bold text-blue-700"><?php echo $votes_cast; ?></p>
                        </div>
                        <div class="bg-white p-3 rounded-full shadow-inner">
                            <i class="fas fa-vote-yea text-blue-700 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-3 flex justify-between items-center">
                        <div class="text-xs text-gray-500">
                            Voter Turnout
                        </div>
                        <div class="text-sm font-medium text-blue-700">
                            <?php echo $total_voters > 0 ? round(($votes_cast / $total_voters) * 100, 1) : 0; ?>%
                        </div>
                    </div>
                    <div class="mt-1 bg-gray-200 rounded-full h-1.5">
                        <div class="bg-blue-600 h-1.5 rounded-full" style="width: <?php echo $total_voters > 0 ? ($votes_cast / $total_voters) * 100 : 0; ?>%"></div>
                    </div>
                </div>
                
                <!-- Abstain Votes -->
                <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm">
                    <div class="flex justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Total Abstain/Null Votes</p>
                            <p class="text-3xl font-bold text-yellow-700"><?php echo $abstain_votes; ?></p>
                        </div>
                        <div class="bg-white p-3 rounded-full shadow-inner">
                            <i class="fas fa-ban text-yellow-700 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-3 flex justify-between items-center">
                        <div class="text-xs text-gray-500">
                            Percentage of Total
                        </div>
                        <div class="text-sm font-medium text-yellow-700">
                            <?php 
                            $totalPossibleVotes = $total_voters * count($positionsData);
                            echo $totalPossibleVotes > 0 ? round(($abstain_votes / $totalPossibleVotes) * 100, 1) : 0; 
                            ?>%
                        </div>
                    </div>
                    <div class="mt-1 bg-gray-200 rounded-full h-1.5">
                        <div class="bg-yellow-500 h-1.5 rounded-full" style="width: <?php echo $totalPossibleVotes > 0 ? ($abstain_votes / $totalPossibleVotes) * 100 : 0; ?>%"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Winners Section -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-10">
            <h2 class="text-2xl font-bold text-center mb-6 text-green-700">Winning Candidates</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($positionsData as $position => $data): ?>
                    <?php 
                    $winners = array_filter($data['candidates'], function($candidate) {
                        return $candidate['is_winner'];
                    });
                    
                    foreach ($winners as $winner): 
                        $photoPath = !empty($winner['photo']) ? $winner['photo'] : '../pics/default.jpg';
                    ?>
                        <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 shadow-md relative border-l-4 border-green-600 winner-badge">
                            <div class="flex items-center mb-4">
                                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 shadow-md">
                                    <img src="<?php echo htmlspecialchars($photoPath); ?>" alt="<?php echo htmlspecialchars($winner['candidate']); ?>" class="w-full h-full object-cover">
                                </div>
                                <div class="ml-4">
                                    <h3 class="font-bold text-lg text-green-800"><?php echo htmlspecialchars($winner['candidate']); ?></h3>
                                    <p class="text-sm text-green-600"><?php echo htmlspecialchars($position); ?></p>
                                    <?php if (!empty($winner['partylist'])): ?>
                                        <p class="text-xs text-gray-500 mt-1"><?php echo htmlspecialchars($winner['partylist']); ?></p>
                                    <?php endif; ?>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="flex justify-between mb-1">
                                    <span class="text-xs text-gray-600">Total Votes</span>
                                    <span class="text-xs font-medium text-green-700"><?php echo $winner['total_votes']; ?> votes</span>
                                </div>
                                <div class="relative bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                    <div class="bg-green-600 h-1.5 rounded-full progress-bar" style="width: <?php echo $total_voters > 0 ? ($winner['total_votes'] / $total_voters) * 100 : 0; ?>%"></div>
                                </div>
                                <div class="flex justify-end mt-1">
                                    <span class="text-xs text-green-700 font-medium">
                                        <?php echo $total_voters > 0 ? round(($winner['total_votes'] / $total_voters) * 100, 1) : 0; ?>% of total voters
                                    </span>
                                </div>
                            </div>
                            <?php if (!empty($winner['platform'])): ?>
                                <div class="mt-3 pt-3 border-t border-green-200">
                                    <div class="tooltip">
                                        <button class="text-xs text-green-600 flex items-center">
                                            <i class="fas fa-lightbulb mr-1"></i> View Platform
                                        </button>
                                        <div class="tooltiptext">
                                            <p class="text-xs"><?php echo htmlspecialchars($winner['platform']); ?></p>
                                        </div>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Detailed Results Section -->
        <div class="space-y-10">
            <?php foreach ($positionsData as $position => $data): 
                // Calculate total votes for this position
                $total_position_votes = 0;
                foreach ($data['candidates'] as $candidate) {
                    $total_position_votes += $candidate['total_votes'];
                }
                $total_position_votes += ($abstainVotesByPosition[$position] ?? 0);
                
                // Get the highest vote count for relative scaling
                $highest_votes = 1; // Default to 1 to avoid division by zero
                foreach ($data['candidates'] as $candidate) {
                    if ($candidate['total_votes'] > $highest_votes) {
                        $highest_votes = $candidate['total_votes'];
                    }
                }
            ?>
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="bg-gradient-to-r from-green-700 to-green-900 p-4">
                        <h2 class="text-xl font-bold text-white"><?php echo htmlspecialchars($position); ?></h2>
                        <p class="text-sm text-green-100"><?php echo $data['max_vote'] > 1 ? $data['max_vote'] . ' winners' : 'Single winner'; ?> position</p>
                    </div>
                    
                    <div class="p-6">
                        <!-- Candidates Results -->
                        <div class="space-y-6">
                            <?php 
                            // Sort candidates by votes (highest first)
                            usort($data['candidates'], function($a, $b) {
                                return $b['total_votes'] - $a['total_votes'];
                            });
                            
                            foreach ($data['candidates'] as $candidate):
                                $photoPath = !empty($candidate['photo']) ? $candidate['photo'] : '../pics/default.jpg';
                                $percentage = $total_voters > 0 ? round(($candidate['total_votes'] / $total_voters) * 100, 1) : 0;
                                $relative_percentage = $highest_votes > 0 ? ($candidate['total_votes'] / $highest_votes) * 100 : 0;
                                
                                // Styling based on winner status
                                $card_classes = $candidate['is_winner'] 
                                    ? "bg-green-50 border-l-4 border-green-500 relative overflow-hidden" 
                                    : "bg-gray-50";
                                $bar_color = $candidate['is_winner'] ? "bg-green-600" : "bg-blue-500";
                            ?>
                                <div class="p-4 rounded-lg shadow-sm <?php echo $card_classes; ?>">
                                    <?php if ($candidate['is_winner']): ?>
                                        <div class="ribbon">
                                            <span>Winner</span>
                                        </div>
                                    <?php endif; ?>
                                    
                                    <div class="flex flex-wrap items-center mb-4">
                                        <div class="flex items-center mb-2 sm:mb-0 mr-6">
                                            <div class="w-12 h-12 rounded-full overflow-hidden border-2 <?php echo $candidate['is_winner'] ? 'border-green-500' : 'border-gray-300'; ?> shadow-sm">
                                                <img src="<?php echo htmlspecialchars($photoPath); ?>" alt="<?php echo htmlspecialchars($candidate['candidate']); ?>" class="w-full h-full object-cover">
                                            </div>
                                            <div class="ml-3">
                                                <h3 class="font-medium text-gray-800"><?php echo htmlspecialchars($candidate['candidate']); ?></h3>
                                                <?php if (!empty($candidate['partylist'])): ?>
                                                    <p class="text-xs text-gray-500"><?php echo htmlspecialchars($candidate['partylist']); ?></p>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                        
                                        <div class="ml-auto flex items-center">
                                            <div class="text-right">
                                                <p class="font-bold text-xl <?php echo $candidate['is_winner'] ? 'text-green-700' : 'text-gray-700'; ?>">
                                                    <?php echo $candidate['total_votes']; ?>
                                                </p>
                                                <p class="text-xs text-gray-500">votes</p>
                                            </div>
                                            
                                            <?php if ($candidate['is_winner']): ?>
                                                <div class="ml-4 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                                                    <i class="fas fa-crown mr-1"></i> Winner
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    
                                    <div class="relative vote-bar-bg rounded-full overflow-hidden">
                                        <div class="absolute top-0 left-0 h-full <?php echo $bar_color; ?> vote-bar transition-all duration-1000 rounded-full" 
                                            style="width: <?php echo $relative_percentage; ?>%">
                                        </div>
                                    </div>
                                    
                                    <div class="flex justify-between mt-2 text-xs text-gray-500">
                                        <span><?php echo $percentage; ?>% of total voters</span>
                                        <span><?php echo $total_position_votes > 0 ? round(($candidate['total_votes'] / $total_position_votes) * 100, 1) : 0; ?>% of position votes</span>
                                    </div>
                                    
                                    <?php if (!empty($candidate['platform'])): ?>
                                        <div class="mt-3 pt-3 border-t border-gray-200">
                                            <div class="tooltip">
                                                <button class="text-xs <?php echo $candidate['is_winner'] ? 'text-green-600' : 'text-blue-600'; ?> flex items-center">
                                                    <i class="fas fa-lightbulb mr-1"></i> View Platform
                                                </button>
                                                <div class="tooltiptext">
                                                    <p class="text-xs"><?php echo htmlspecialchars($candidate['platform']); ?></p>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            <?php endforeach; ?>
                            
                            <!-- Abstain/Null Votes -->
                            <?php 
                            $abstain_votes_for_position = $abstainVotesByPosition[$position] ?? 0;
                            $abstain_percentage = $total_voters > 0 ? round(($abstain_votes_for_position / $total_voters) * 100, 1) : 0;
                            $relative_abstain_percentage = $highest_votes > 0 ? ($abstain_votes_for_position / $highest_votes) * 100 : 0;
                            ?>
                            <div class="p-4 rounded-lg shadow-sm bg-yellow-50 border-l-4 border-yellow-500">
                                <div class="flex flex-wrap justify-between items-center mb-4">
                                    <div class="flex items-center">
                                        <div class="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-yellow-300">
                                            <i class="fas fa-ban text-yellow-700 text-xl"></i>
                                        </div>
                                        <div class="ml-3">
                                            <h3 class="font-medium text-gray-800">Abstain / Null Votes</h3>
                                            <p class="text-xs text-gray-500">Voters who chose not to vote for this position</p>
                                        </div>
                                    </div>
                                    
                                    <div class="text-right mt-2 sm:mt-0">
                                        <p class="font-bold text-xl text-yellow-700"><?php echo $abstain_votes_for_position; ?></p>
                                        <p class="text-xs text-gray-500">votes</p>
                                    </div>
                                </div>
                                
                                <div class="relative vote-bar-bg rounded-full overflow-hidden">
                                    <div class="absolute top-0 left-0 h-full bg-yellow-500 vote-bar transition-all duration-1000 rounded-full" 
                                        style="width: <?php echo $relative_abstain_percentage; ?>%">
                                    </div>
                                </div>
                                
                                <div class="flex justify-between mt-2 text-xs text-gray-500">
                                    <span><?php echo $abstain_percentage; ?>% of total voters</span>
                                    <span><?php echo $total_position_votes > 0 ? round(($abstain_votes_for_position / $total_position_votes) * 100, 1) : 0; ?>% of position votes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <!-- Certificate Template (Hidden until downloaded) -->
    <div id="certificate-template" class="hidden">
        <div class="certificate">
            <div class="certificate-content">
                <div class="text-center mb-8">
                    <div class="text-sm uppercase tracking-widest text-green-700 mb-1">Official</div>
                    <h1 class="text-4xl font-bold text-green-800 mb-1">Election Results Certificate</h1>
                    <div class="w-32 h-0.5 bg-green-700 mx-auto"></div>
                </div>
                
                <div class="mb-8 text-center">
                    <p class="text-xl font-medium text-gray-800 mb-2"><?php echo htmlspecialchars($election_name); ?></p>
                    <p class="text-gray-600">Completed on <?php echo date('F j, Y'); ?></p>
                </div>
                
                <div class="mb-8">
                    <h2 class="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">Elected Officials</h2>
                    
                    <div class="space-y-4">
                        <?php foreach ($positionsData as $position => $data): ?>
                            <div class="mb-4">
                                <h3 class="font-bold text-gray-800"><?php echo htmlspecialchars($position); ?>:</h3>
                                <div class="pl-4 border-l-2 border-green-300 mt-2">
                                    <?php 
                                    foreach ($data['candidates'] as $candidate): 
                                        if ($candidate['is_winner']):
                                    ?>
                                        <div class="mb-2">
                                            <div class="font-medium"><?php echo htmlspecialchars($candidate['candidate']); ?></div>
                                            <div class="flex text-sm text-gray-600">
                                                <span class="mr-4"><?php echo $candidate['total_votes']; ?> votes</span>
                                                <?php if (!empty($candidate['partylist'])): ?>
                                                    <span><?php echo htmlspecialchars($candidate['partylist']); ?></span>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                    <?php 
                                        endif;
                                    endforeach; 
                                    ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                
                <div class="mb-8">
                    <h2 class="text-xl font-bold text-green-700 mb-4 border-b border-green-200 pb-2">Election Statistics</h2>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-green-50 p-3 rounded-md">
                            <div class="text-sm text-gray-600">Total Registered Voters</div>
                            <div class="text-xl font-bold text-green-700"><?php echo $total_voters; ?></div>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-md">
                            <div class="text-sm text-gray-600">Voter Turnout</div>
                            <div class="text-xl font-bold text-blue-700">
                                <?php echo $total_voters > 0 ? round(($votes_cast / $total_voters) * 100, 1) : 0; ?>%
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-12 border-t border-green-200 pt-6 flex justify-between">
                    <div class="text-center">
                        <div class="border-b border-gray-400 pb-1 mb-1 w-48"></div>
                        <div class="text-sm">Election Officer Signature</div>
                    </div>
                    <div class="text-center">
                        <div class="border-b border-gray-400 pb-1 mb-1 w-48"></div>
                        <div class="text-sm">School Representative Signature</div>
                    </div>
                </div>
                
                <div class="seal">
                    <div class="seal-content">
                        <div class="mb-1 text-[8px]">OFFICIAL</div>
                        <div class="mb-1 text-[7px]">ELECTION</div>
                        <div class="mb-1 text-[8px]">RESULTS</div>
                        <div class="mb-0 text-[6px]"><?php echo date('Y-m-d'); ?></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="mt-12 gradient-bg text-white text-center py-6">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <p class="text-lg font-bold">© <?php echo date('Y'); ?> Election System</p>
                    <p class="text-sm mt-1 opacity-75">Building democracy through secure digital voting.</p>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#" class="hover:text-green-200 transition-colors duration-300">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="hover:text-green-200 transition-colors duration-300">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="hover:text-green-200 transition-colors duration-300">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <script>
        // Run confetti animation on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Create confetti only if there are winner elements
            if (document.querySelectorAll('.winner-badge').length > 0) {
                createConfetti();
            }
            
            // Animate bars
            setTimeout(animateBars, 500);
        });
        
        // Function to animate all vote bars
        function animateBars() {
            const voteBars = document.querySelectorAll('.vote-bar');
            voteBars.forEach(bar => {
                const width = parseFloat(bar.style.width);
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            });
        }
        
        // Create confetti animation
        function createConfetti() {
            const confettiContainer = document.querySelector('.confetti-container');
            const colors = ['#2e7d32', '#4caf50', '#8bc34a', '#ffc107', '#ff9800', '#ffeb3b'];
            const shapes = ['circle', 'square', 'triangle'];
            
            // Create 100 pieces of confetti
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    const shape = shapes[Math.floor(Math.random() * shapes.length)];
                    const size = Math.random() * 10 + 5;
                    
                    confetti.classList.add('confetti');
                    
                    // Apply random animation
                    const animationClass = Math.random() < 0.333 ? 'confetti--animation-slow' :
                                           Math.random() < 0.666 ? 'confetti--animation-medium' :
                                           'confetti--animation-fast';
                    confetti.classList.add(animationClass);
                    
                    // Apply random styles
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.backgroundColor = color;
                    confetti.style.width = size + 'px';
                    confetti.style.height = size + 'px';
                    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                    
                    if (shape === 'circle') {
                        confetti.style.borderRadius = '50%';
                    } else if (shape === 'triangle') {
                        confetti.style.width = '0';
                        confetti.style.height = '0';
                        confetti.style.backgroundColor = 'transparent';
                        confetti.style.borderLeft = `${size/2}px solid transparent`;
                        confetti.style.borderRight = `${size/2}px solid transparent`;
                        confetti.style.borderBottom = `${size}px solid ${color}`;
                    }
                    
                    confettiContainer.appendChild(confetti);
                    
                    // Remove confetti element after animation completes
                    confetti.addEventListener('animationend', () => {
                        confetti.remove();
                    });
                }, Math.random() * 1500);
            }
        }
        
        // Print results function
        function printResults() {
            window.print();
        }
        
        // Download certificate function
        async function downloadCertificate() {
            try {
                // Show loading message
                Swal.fire({
                    title: 'Preparing Certificate',
                    text: 'Please wait...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                
                const certificateElement = document.getElementById('certificate-template');
                certificateElement.classList.remove('hidden');
                
                // Use window.jsPDF if available (from CDN)
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('p', 'pt', 'letter');
                
                const canvas = await html2canvas(certificateElement, {
                    scale: 2,
                    logging: false,
                    useCORS: true,
                    allowTaint: true
                });
                
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                const imgProps = doc.getImageProperties(imgData);
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                
                doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                doc.save('election-certificate.pdf');
                
                // Hide the certificate element again
                certificateElement.classList.add('hidden');
                
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Certificate Downloaded',
                    text: 'Your election certificate has been successfully downloaded.',
                    confirmButtonColor: '#2e7d32'
                });
            } catch (error) {
                console.error('Error generating certificate:', error);
                
                // Show error message
                Swal.fire({
                    icon: 'error',
                    title: 'Certificate Generation Failed',
                    text: 'There was an error generating your certificate. Please try again later.',
                    confirmButtonColor: '#e53935'
                });
                
                // Hide the certificate element
                document.getElementById('certificate-template').classList.add('hidden');
            }
        }
    </script>
    
    <style>
        @media print {
            body * {
                visibility: hidden;
            }
            #printable-content, #printable-content * {
                visibility: visible;
            }
            #printable-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background-color: white;
            }
            .gradient-bg {
                background: #1e5631 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .ribbon, .confetti-container {
                display: none !important;
            }
            .vote-bar {
                print-color-adjust: exact !important;
                -webkit-print-color-adjust: exact !important;
            }
        }
    </style>
</body>
</html>