<?php
session_start();
require 'conn.php';

// Security enhancements - prevent caching to disable back button functionality
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Expires: 0");

// Verify proper session exists
if (!isset($_SESSION['election_id'])) {
    header("Location: index.php");
    exit();
}

// Implement session fixation protection
if (!isset($_SESSION['last_regeneration']) || 
    (time() - $_SESSION['last_regeneration']) > 1800) {
    // Regenerate session ID every 30 minutes
    session_regenerate_id(true);
    $_SESSION['last_regeneration'] = time();
}

// Use the timestamp mechanism to detect if user is trying to navigate backwards
if (!isset($_SESSION['last_access_time'])) {
    $_SESSION['last_access_time'] = time();
}

// Store current page as the last visited page
$_SESSION['last_page'] = 'votes.php';

// Fix redirect loop - only check HTTP_REFERER if it exists and is not this page
// Don't redirect if we're already on the votes.php page
if (isset($_SERVER['HTTP_REFERER']) && 
    !empty($_SERVER['HTTP_REFERER']) &&
    !strpos($_SERVER['HTTP_REFERER'], 'votes.php') && 
    $_SERVER['REQUEST_URI'] != '/sir-u/sub/votes.php') {
    
    // Set a flag to avoid infinite redirects
    if (!isset($_SESSION['redirect_check'])) {
        $_SESSION['redirect_check'] = true;
        header("Location: votes.php");
        exit();
    }
} else {
    // Clear the redirect check flag when we're properly on the page
    unset($_SESSION['redirect_check']);
}

// Handle back button POST - redirect to same page instead
if (isset($_POST['back'])) {
    header("Location: votes.php");
    exit();
}

$election_id = $_SESSION['election_id'];

// Fetch election details
$election_query = "SELECT name, status, end_time FROM elections WHERE id = ?";
$stmt = $conn->prepare($election_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$election = $stmt->get_result()->fetch_assoc();
$election_name = $election['name'] ?? 'Election not found';
$election_status = $election['status'] ?? 0;
$election_end_time = $election['end_time'] ?? null;

// Fetch total voters
$total_voters_query = "SELECT COUNT(*) AS total_voters FROM voters WHERE election_id = ?";
$stmt = $conn->prepare($total_voters_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$total_voters_result = $stmt->get_result()->fetch_assoc();
$total_voters = $total_voters_result['total_voters'] ?? 0;

// Add query to count distinct voters who have already voted
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

// Handle ending an election
if (isset($_POST['end_election']) || ($election_status == 1 && $election_end_time && strtotime($election_end_time) <= time())) {
    $conn->begin_transaction();

    try {
        $result = $conn->query("SELECT name FROM elections WHERE id = '$election_id'");
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $election_title = $row['name'];

            $history_sql = "INSERT INTO history (election_title, deleted_at, candidates, voters, votes, positions, partylists)
                            VALUES ('$election_title', NOW(),
                                (SELECT GROUP_CONCAT(CONCAT(id, '|', position_id, '|', firstname, '|', lastname, '|', photo, '|', platform, '|', partylist_id) SEPARATOR ';') FROM candidates WHERE election_id = '$election_id'),
                                (SELECT GROUP_CONCAT(CONCAT(id, '|', voters_id) SEPARATOR ';') FROM voters WHERE election_id = '$election_id'),
                                (SELECT GROUP_CONCAT(CONCAT(id, '|', voters_id, '|', candidate_id, '|', position_id, '|', timestamp) SEPARATOR ';') FROM votes WHERE election_id = '$election_id'),
                                (SELECT GROUP_CONCAT(CONCAT(position_id, '|', description, '|', max_vote) SEPARATOR ';') FROM positions WHERE election_id = '$election_id'),
                                (SELECT GROUP_CONCAT(CONCAT(partylist_id, '|', name) SEPARATOR ';') FROM partylists WHERE election_id = '$election_id'))";
            $conn->query($history_sql) or die($conn->error);
        }

        $conn->query("DELETE FROM votes WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM candidates WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM voters WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM positions WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM partylists WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM elections WHERE id = '$election_id'") or die($conn->error);

        $conn->commit();
        $_SESSION['success'] = 'Election has ended and all related records have been archived.';

        // Display SweetAlert thank you message
        echo "<script>
            Swal.fire({
                title: 'Thank You!',
                text: 'Thank you for using the election system. You will now be redirected.',
                icon: 'success',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(() => {
                window.location.href = '../index.php';
            });
        </script>";
        exit();
    } catch (Exception $e) {
        $conn->rollback();
        $_SESSION['error'] = "Failed to end election: " . $e->getMessage();
    }
}

// Handle extending election time
if (isset($_POST['extend_time'])) {
    $additional_hours = intval($_POST['hours']);
    $additional_minutes = intval($_POST['minutes']);

    if ($additional_hours > 0 || $additional_minutes > 0) {
        $new_end_time = date("Y-m-d H:i:s", strtotime("+$additional_hours hours +$additional_minutes minutes", strtotime($election_end_time)));

        $update_query = "UPDATE elections SET end_time = ? WHERE id = ?";
        $update_stmt = $conn->prepare($update_query);
        $update_stmt->bind_param("si", $new_end_time, $election_id);
        $update_stmt->execute();

        $_SESSION['success'] = "Election time has been successfully extended.";
        header("Location: votes.php");
        exit();
    } else {
        $_SESSION['error'] = "Please specify a valid time to extend.";
    }
}

// Update the remaining time calculation section
$remaining_time = null;
if ($election_status == 1 && $election_end_time) {
    $remaining_time = strtotime($election_end_time) - time();
    if ($remaining_time <= 0) {
        $remaining_time = 0;
        $election_status = 0; // Automatically end the election
    }
}

// Fetch votes by position
function getVotesByPosition($election_id) {
    global $conn;
    $sql = "
        SELECT p.description AS position,
               CONCAT(c.firstname, ' ', c.lastname) AS candidate,
               COALESCE(COUNT(v.candidate_id), 0) AS total_votes,
               p.position_id,
               p.max_vote,
               (SELECT COUNT(*) FROM candidates WHERE position_id = p.position_id AND election_id = ?) AS candidate_count
        FROM candidates c
        JOIN positions p ON c.position_id = p.position_id
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

// Add new function to get abstain votes per position
function getAbstainVotesByPosition($election_id) {
    global $conn;
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

// Get abstain votes by position
$abstainVotesByPosition = [];
$abstainResults = getAbstainVotesByPosition($election_id);
while ($row = $abstainResults->fetch_assoc()) {
    $abstainVotesByPosition[$row['position']] = $row['abstain_votes'];
}

$results = getVotesByPosition($election_id);
$positionsData = [];
while ($row = $results->fetch_assoc()) {
    $candidate_count = $row['candidate_count'];
    $max_vote = $row['max_vote'];
    $position_id = $row['position_id'];
    $position_name = $row['position'];

    // Determine if the candidate is a winner
    $is_winner = false;

    // For positions where max_vote = 1, we need to check 50%+1 rule for specific positions
    if ($max_vote == 1) {
        // Check if this is a position that needs 50%+1 
        $requires_majority = positionRequiresMajority($position_id, $conn);
        
        // Check if this is the only candidate in the position
        $is_single_candidate = ($candidate_count == 1);
        
        if ($is_single_candidate) {
            // For single candidates, they must get 50% + 1 of total votes to win
            $is_winner = ($row['total_votes'] >= $winning_threshold);
        } else if ($requires_majority) {
            // Position requires majority (50%+1)
            $is_winner = ($row['total_votes'] >= $winning_threshold && 
                         count($positionsData[$position_name] ?? []) < $max_vote);
        } else {
            // Position only requires highest vote count
            $is_winner = count($positionsData[$position_name] ?? []) < $max_vote;
        }
    } else {
        // For positions with max_vote > 1 (like Senators with max_vote = 3)
        // Store all candidates temporarily to sort them by votes later
        if (!isset($positionsData[$position_name]['all_candidates'])) {
            $positionsData[$position_name]['all_candidates'] = [];
        }
        
        // Add this candidate to the all_candidates array
        $positionsData[$position_name]['all_candidates'][] = [
            'candidate' => $row['candidate'],
            'total_votes' => $row['total_votes']
        ];
        
        // We'll determine winners after processing all candidates
        $is_winner = false; // Temporarily set to false
    }

    $positionsData[$position_name][] = [
        'candidate' => $row['candidate'],
        'total_votes' => $row['total_votes'],
        'is_winner' => $is_winner
    ];
    
    // Store the position_id and max_vote for each position
    if (!isset($positionsData[$position_name]['position_id'])) {
        $positionsData[$position_name]['position_id'] = $position_id;
        $positionsData[$position_name]['max_vote'] = $max_vote;
    }
}

// Add this function to determine which positions require majority voting
function positionRequiresMajority($position_id, $conn) {
    // You could store this in the database, or use a predefined list
    // For now, let's use a simple array of position IDs that require majority
    $majority_positions = [1]; // Assuming position_id 1 requires majority (e.g., President)
    
    return in_array($position_id, $majority_positions);
}

// Process multi-winner positions
foreach ($positionsData as $position => $data) {
    // Skip if this isn't a position array or doesn't have all_candidates
    if ($position === 'position_id' || !isset($data['all_candidates'])) {
        continue;
    }
    
    $max_vote = $data['max_vote'] ?? 1;
    
    // Only process if max_vote > 1
    if ($max_vote > 1 && isset($data['all_candidates'])) {
        // Sort candidates by total_votes in descending order
        usort($data['all_candidates'], function($a, $b) {
            return $b['total_votes'] - $a['total_votes'];
        });
        
        // Mark top max_vote candidates as winners
        $winner_count = 0;
        foreach ($data['all_candidates'] as $candidate) {
            if ($winner_count < $max_vote && isset($candidate['candidate'])) {
                // Find this candidate in the main array and update is_winner
                foreach ($positionsData[$position] as $key => $value) {
                    if (is_array($value) && isset($value['candidate']) && 
                        $value['candidate'] === $candidate['candidate']) {
                        $positionsData[$position][$key]['is_winner'] = true;
                        $winner_count++;
                        break;
                    }
                }
            }
        }
    }
}

// Remove temporary all_candidates arrays
foreach ($positionsData as $position => $data) {
    if (isset($positionsData[$position]['all_candidates'])) {
        unset($positionsData[$position]['all_candidates']);
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Election Results Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <meta http-equiv="refresh" content="60">
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
            border-left-color: var(--primary-color);
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
        
        /* Winner badge */
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
        
        /* Progress bars */
        .progress-bar {
            transition: width 1s ease-out;
        }
        
        /* Timer display */
        .time-segment {
            background: #2e7d32;
            color: white;
            padding: 0.5rem;
            border-radius: 0.5rem;
            width: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .time-segment::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.3);
        }
        
        .time-colon {
            font-weight: bold;
            font-size: 1.5rem;
            color: #2e7d32;
            animation: blinkColon 1s infinite;
        }
        
        @keyframes blinkColon {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .warning-time .time-segment {
            background: #ff9800;
            animation: pulseWarning 1.5s infinite;
        }
        
        .danger-time .time-segment {
            background: #e53935;
            animation: pulseDanger 1s infinite;
        }
        
        @keyframes pulseWarning {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.7); }
            50% { box-shadow: 0 0 0 10px rgba(255, 152, 0, 0); }
        }
        
        @keyframes pulseDanger {
            0%, 100% { box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.7); transform: scale(1); }
            50% { box-shadow: 0 0 0 10px rgba(229, 57, 53, 0); transform: scale(1.05); }
        }
        
        /* Final Countdown Animation */
        @keyframes finalCountNumber {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.5); opacity: 1; }
            100% { transform: scale(1); opacity: 0.7; }
        }
        
        .final-count-number {
            animation: finalCountNumber 1s ease-out forwards;
            text-shadow: 0 0 20px rgba(229, 57, 53, 0.8);
        }
        
        /* Floating background elements */
        @keyframes float-slow {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            50% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
        }
        
        @keyframes float-medium {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            50% { transform: translateY(-15px) translateX(-15px) rotate(-5deg); }
        }
        
        @keyframes float-fast {
            0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
            50% { transform: translateY(-10px) translateX(5px) rotate(3deg); }
        }
        
        .float-slow { animation: float-slow 8s ease-in-out infinite; }
        .float-medium { animation: float-medium 6s ease-in-out infinite; }
        .float-fast { animation: float-fast 4s ease-in-out infinite; }
        
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
    </style>
</head>
<body class="bg-gray-50 text-gray-900 font-sans">

    <!-- Navigation Bar -->
    <nav class="gradient-bg text-white shadow-lg sticky top-0 z-40">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <img src="../pics/logo.png" alt="Logo" class="h-12 w-12 rounded-full shadow-md border-2 border-white">
                <a href="home.php" class="text-2xl font-bold flex items-center space-x-2">
                    <i class="fas fa-poll"></i>
                    <span>Election Dashboard</span>
                </a>
            </div>
            <ul class="flex space-x-6">
                <li>
                    <button onclick="openExtendTimeModal()" class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300 flex items-center space-x-2">
                        <i class="fas fa-clock"></i>
                        <span>Extend Time</span>
                    </button>
                </li>
                <li>
                    <button onclick="openLogoutModal()" class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300 flex items-center space-x-2">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Log Out</span>
                    </button>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto mt-6 px-4 pb-16">
        <!-- Centered Election Name -->
        <div class="text-center mb-8 fade-in">
            <h1 class="text-4xl font-bold text-green-700 mb-3">
                <?php echo htmlspecialchars($election_name); ?>
            </h1>
            <div class="w-24 h-1 bg-green-600 mx-auto"></div>
            <p class="text-gray-600 mt-3">Real-time Election Results</p>
        </div>
        
        <!-- Election Info Card -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8 fade-in relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-green-50 rounded-full opacity-70 z-0"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 -mb-6 -ml-6 bg-green-50 rounded-full opacity-70 z-0"></div>
            
            <div class="relative z-10">
                <!-- Remaining Time Display -->
                <?php if ($remaining_time !== null): ?>
                <div class="flex justify-center mb-6">
                    <div>
                        <p class="text-sm text-gray-500 mb-1 text-center font-medium">REMAINING TIME</p>
                        <div id="time-display-container" class="flex items-center space-x-1">
                            <div class="flex flex-col items-center">
                                <div id="hours-display" class="time-segment text-xl">00</div>
                                <span class="text-xs text-gray-500 mt-1">HRS</span>
                            </div>
                            <div class="time-colon">:</div>
                            <div class="flex flex-col items-center">
                                <div id="minutes-display" class="time-segment text-xl">00</div>
                                <span class="text-xs text-gray-500 mt-1">MIN</span>
                            </div>
                            <div class="time-colon">:</div>
                            <div class="flex flex-col items-center">
                                <div id="seconds-display" class="time-segment text-xl">00</div>
                                <span class="text-xs text-gray-500 mt-1">SEC</span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            
                <!-- Stats Cards Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <!-- Total Voters Card -->
                    <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500 shadow-md card-hover">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Total Eligible Voters</p>
                                <div class="flex items-end">
                                    <p class="text-3xl font-bold text-green-700"><?php echo $total_voters; ?></p>
                                    <p class="text-sm text-gray-500 ml-2 mb-1">registered</p>
                                </div>
                            </div>
                            <div class="bg-white p-3 rounded-full shadow-inner">
                                <i class="fas fa-users text-green-700 text-xl"></i>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Votes Cast Card -->
                    <div id="votes-cast-container" class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500 shadow-md card-hover">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Votes Cast</p>
                                <div class="flex items-end">
                                    <p id="votes-cast-count" class="text-3xl font-bold text-blue-700"><?php echo $votes_cast; ?></p>
                                    <p class="text-sm text-gray-500 ml-2 mb-1">voters</p>
                                </div>
                            </div>
                            <div class="bg-white p-3 rounded-full shadow-inner">
                                <i class="fas fa-vote-yea text-blue-700 text-xl"></i>
                            </div>
                        </div>
                        <div class="mt-3 h-1 bg-gray-200 rounded-full">
                            <div id="votes-cast-bar" class="h-1 bg-blue-500 rounded-full transition-all duration-1000" style="width: 0%"></div>
                        </div>
                        <div class="mt-1 text-right text-xs text-gray-500">
                            <span id="votes-cast-percentage">0%</span> turnout
                        </div>
                    </div>
                    
                    <!-- Abstain Votes Card -->
                    <div id="abstain-votes-container" class="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 border-l-4 border-yellow-500 shadow-md card-hover">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Abstain/Null Votes</p>
                                <div class="flex items-end">
                                    <p id="abstain-votes-count" class="text-3xl font-bold text-yellow-700"><?php echo $abstain_votes; ?></p>
                                    <p class="text-sm text-gray-500 ml-2 mb-1">votes</p>
                                </div>
                            </div>
                            <div class="bg-white p-3 rounded-full shadow-inner">
                                <i class="fas fa-ban text-yellow-700 text-xl"></i>
                            </div>
                        </div>
                        <div id="abstain-bar-container" class="hidden">
                            <div id="abstain-votes-bar" class="h-1"></div>
                        </div>
                        <div class="mt-1 text-right text-xs text-gray-500">
                            <span id="abstain-votes-percentage">0%</span> of total votes
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Results Tables -->
        <?php foreach ($positionsData as $position => $candidates): 
            // Skip 'position_id' which is not a candidate
            if ($position === 'position_id') continue;
            
            // Get the abstain votes for this position
            $abstain_votes_for_position = $abstainVotesByPosition[$position] ?? 0;
            
            // Calculate total votes for this position (including abstains)
            $total_position_votes = $abstain_votes_for_position;
            foreach ($candidates as $candidate) {
                if (is_array($candidate)) { // Check if this is a candidate entry
                    $total_position_votes += $candidate['total_votes'];
                }
            }
            
            // Calculate abstain percentage
            $abstain_percentage = $total_position_votes > 0 ? 
                round(($abstain_votes_for_position / $total_position_votes) * 100, 1) : 0;
            
            // Calculate relative percentage for the abstain bar width
            // This is for visual comparison with candidate bars - we need to use max_votes as reference
            $max_votes = 0;
            foreach ($candidates as $candidate) {
                if (is_array($candidate) && $candidate['total_votes'] > $max_votes) {
                    $max_votes = $candidate['total_votes'];
                }
            }
            // Don't let max_votes be 0 to avoid division by zero
            $max_votes = max(1, $max_votes);
            $relative_abstain_percentage = ($abstain_votes_for_position / $max_votes) * 100;
        ?>
            <div class="bg-white shadow-lg rounded-xl p-6 mt-8 card-hover fade-in">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-green-700 flex items-center">
                        <i class="fas fa-user-tie mr-2"></i><?php echo htmlspecialchars($position); ?>
                    </h2>
                </div>
                
                <div class="space-y-6">
                    <?php 
                    // Determine if there's a tie
                    $vote_counts = array_column($candidates, 'total_votes');
                    $max_votes = max($vote_counts);
                    $tied_candidates = array_filter($candidates, function($c) use ($max_votes) { 
                        return is_array($c) && $c['total_votes'] == $max_votes; 
                    });
                    $is_tie = count($tied_candidates) > 1 && $max_votes > 0;
                    
                    foreach ($candidates as $index => $candidate):
                        // Skip non-candidate entries like position_id
                        if (!is_array($candidate)) continue;
                        
                        $percentage = $total_voters > 0 ? round(($candidate['total_votes'] / $total_voters) * 100, 1) : 0;
                        $status_class = '';
                        $status_text = '';
                        $bar_color = 'bg-gray-400';
                        $icon_class = '';
                        
                        // Determine status and class
                        if ($candidate['total_votes'] == 0) {
                            $status_class = 'text-gray-500 bg-gray-100';
                            $status_text = 'No Votes';
                            $bar_color = 'bg-gray-400';
                            $icon_class = 'fa-face-meh';
                        } elseif ($is_tie && $candidate['total_votes'] == $max_votes) {
                            $status_class = 'text-yellow-600 font-bold bg-yellow-100';
                            $status_text = 'Tie';
                            $bar_color = 'bg-yellow-500';
                            $icon_class = 'fa-balance-scale';
                        } elseif ($candidate['is_winner']) {
                            $status_class = 'text-green-600 font-bold bg-green-100';
                            $status_text = 'Winner';
                            $bar_color = 'bg-green-600';
                            $icon_class = 'fa-crown';
                        } else {
                            $status_class = 'text-red-500 bg-red-50';
                            $status_text = 'Not Qualified';
                            $bar_color = 'bg-blue-500';
                            $icon_class = 'fa-xmark';
                        }
                        
                        // Determine max width of bar for comparison
                        $max_percentage = $max_votes > 0 ? 100 : 0;
                        $relative_percentage = $max_votes > 0 ? ($candidate['total_votes'] / $max_votes) * 100 : 0;
                    ?>
                    <div class="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-200 relative <?php echo $candidate['is_winner'] ? 'border-l-4 border-green-500' : ''; ?>">
                        <div class="flex flex-wrap justify-between items-center mb-3">
                            <div class="font-medium text-lg"><?php echo htmlspecialchars($candidate['candidate']); ?></div>
                            <div class="flex items-center space-x-3">
                                <div class="font-bold text-lg flex items-center">
                                    <span><?php echo $candidate['total_votes']; ?></span>
                                    <span class="text-gray-500 text-sm ml-1">votes</span>
                                </div>
                                <div class="<?php echo $status_class; ?> px-3 py-1 rounded-full flex items-center">
                                    <i class="fas <?php echo $icon_class; ?> mr-1.5 text-sm"></i>
                                    <?php echo $status_text; ?>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Enhanced Bar representation -->
                        <div class="relative vote-bar-bg rounded-full overflow-hidden mb-1">
                            <div class="absolute top-0 left-0 h-full <?php echo $bar_color; ?> vote-bar transition-all duration-1000 rounded-full" 
                                 style="width: <?php echo $relative_percentage; ?>%;" data-width="<?php echo $relative_percentage; ?>">
                            </div>
                        </div>
                        <div class="flex justify-between items-center text-xs text-gray-500">
                            <div><?php echo $candidate['total_votes']; ?> votes</div>
                            <div><?php echo $percentage; ?>% of total voters</div>
                        </div>
                    </div>
                    <?php endforeach; ?>

                    <!-- Add Abstain Votes bar here -->
                    <div class="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-200 mt-6 border-l-4 border-yellow-500">
                        <div class="flex flex-wrap justify-between items-center mb-3">
                            <div class="font-medium text-lg flex items-center">
                                <i class="fas fa-ban mr-2 text-yellow-600"></i>
                                <span>Abstain / Null Votes</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="font-bold text-lg flex items-center">
                                    <span><?php echo $abstain_votes_for_position; ?></span>
                                    <span class="text-gray-500 text-sm ml-1">votes</span>
                                </div>
                                <div class="text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full flex items-center">
                                    <i class="fas fa-info-circle mr-1.5 text-sm"></i>
                                    Abstain
                                </div>
                            </div>
                        </div>
                        
                        <!-- Abstain Bar representation -->
                        <div class="relative vote-bar-bg rounded-full overflow-hidden mb-1">
                            <div class="absolute top-0 left-0 h-full bg-yellow-500 vote-bar transition-all duration-1000 rounded-full" 
                                 style="width: <?php echo $relative_abstain_percentage; ?>%;" data-width="<?php echo $relative_abstain_percentage; ?>">
                            </div>
                        </div>
                        <div class="flex justify-between items-center text-xs text-gray-500">
                            <div><?php echo $abstain_votes_for_position; ?> votes</div>
                            <div><?php echo $abstain_percentage; ?>% of position votes</div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- Logout Confirmation Modal -->
    <div id="logoutModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div class="bg-white rounded-xl shadow-2xl p-6 w-96 transform transition-all duration-300 scale-100">
            <div class="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                <h2 class="text-2xl font-bold text-red-600 flex items-center">
                    <i class="fas fa-sign-out-alt mr-2"></i>
                    <span>Confirm Logout</span>
                </h2>
                <button onclick="closeLogoutModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <p class="text-gray-700 mb-6">Are you sure you want to logout from the election system?</p>
            <div class="flex justify-end space-x-4">
                <button onclick="closeLogoutModal()" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg transition-all duration-300 flex items-center">
                    <i class="fas fa-times mr-1"></i> Cancel
                </button>
                <a href="../logout.php" class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-300 flex items-center">
                    <i class="fas fa-sign-out-alt mr-1"></i> Logout
                </a>
            </div>
        </div>
    </div>

    <!-- Extend Time Modal -->
    <div id="extendTimeModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div class="bg-white rounded-xl shadow-2xl p-6 w-96 transform transition-all duration-300 scale-100">
            <div class="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                <h2 class="text-2xl font-bold text-green-700 flex items-center">
                    <i class="fas fa-clock mr-2"></i>
                    <span>Extend Election Time</span>
                </h2>
                <button onclick="closeExtendTimeModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <form method="POST" action="">
                <p class="text-gray-600 mb-4">Please specify how much time you want to add to the current election.</p>
                
                <div class="mb-4">
                    <label for="hours" class="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                    <div class="flex items-center">
                        <button type="button" onclick="decrementHours()" class="bg-green-100 hover:bg-green-200 text-green-700 h-10 w-10 flex items-center justify-center rounded-l-lg">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" id="hours" name="hours" class="h-10 block w-full text-center border-green-200 focus:border-green-500 focus:ring-green-500 text-2xl font-bold text-green-700" min="0" value="1">
                        <button type="button" onclick="incrementHours()" class="bg-green-100 hover:bg-green-200 text-green-700 h-10 w-10 flex items-center justify-center rounded-r-lg">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                
                <div class="mb-6">
                    <label for="minutes" class="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
                    <div class="flex items-center">
                        <button type="button" onclick="decrementMinutes()" class="bg-green-100 hover:bg-green-200 text-green-700 h-10 w-10 flex items-center justify-center rounded-l-lg">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" id="minutes" name="minutes" class="h-10 block w-full text-center border-green-200 focus:border-green-500 focus:ring-green-500 text-2xl font-bold text-green-700" min="0" max="59" value="0">
                        <button type="button" onclick="incrementMinutes()" class="bg-green-100 hover:bg-green-200 text-green-700 h-10 w-10 flex items-center justify-center rounded-r-lg">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                
                <div class="bg-green-50 rounded-lg p-3 mb-6 border border-green-200">
                    <div class="flex items-center text-green-700">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span id="timePreview">Adding 1 hour to election</span>
                    </div>
                </div>
                
                <div class="flex justify-end space-x-3">
                    <button type="button" onclick="closeExtendTimeModal()" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-lg transition-all duration-300 flex items-center">
                        <i class="fas fa-times mr-1"></i> Cancel
                    </button>
                    <button type="submit" name="extend_time" id="extendButton" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all duration-300 flex items-center">
                        <i class="fas fa-check mr-1"></i> Extend Time
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Final Countdown Modal -->
    <div id="finalCountdownModal" class="hidden fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
        <div class="text-center max-w-xl w-full px-4">
            <h2 class="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wider">Election Ending In</h2>
            
            <div id="final-countdown-number" class="text-9xl md:text-[150px] font-bold text-red-500 mb-8 final-count-number">10</div>
            
            <div class="w-full h-3 mx-auto bg-gray-800 rounded-full overflow-hidden mb-12">
                <div id="countdown-progress" class="h-full bg-red-600 transition-all duration-1000 rounded-full" style="width: 100%"></div>
            </div>
            
            <p id="countdown-message" class="text-2xl text-white mt-6 animate-pulse">Please finalize your votes now!</p>
        </div>
    </div>
    
    <!-- Election End Modal -->
    <div id="electionEndModal" class="hidden fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full mx-4 text-center transform transition-all duration-500 scale-100 relative overflow-hidden">
            <!-- Confetti background -->
            <div class="absolute inset-0 overflow-hidden">
                <div class="confetti-piece bg-red-500"></div>
                <div class="confetti-piece bg-yellow-500"></div>
                <div class="confetti-piece bg-blue-500"></div>
                <div class="confetti-piece bg-green-500"></div>
                <div class="confetti-piece bg-purple-500"></div>
                <div class="confetti-piece bg-orange-500"></div>
                <div class="confetti-piece bg-teal-500"></div>
            </div>
            
            <div class="relative z-10">
                <div class="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-check-circle text-5xl text-green-600"></i>
                </div>
                
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Election Completed!</h2>
                <p class="text-xl text-gray-600 mb-6">The voting period has ended. Thank you for your participation.</p>
                
                <button onclick="redirectToResults()" class="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-bold transition-all duration-300 shadow-lg flex items-center justify-center mx-auto">
                    <i class="fas fa-chart-bar mr-2"></i> View Results
                </button>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="mt-12 bg-gradient-to-r from-green-700 to-green-900 text-white text-center py-6 shadow-lg relative overflow-hidden">
        <!-- Animated background elements -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-1/4 w-12 h-12 bg-white rounded-full float-slow"></div>
            <div class="absolute bottom-1/3 right-1/3 w-8 h-8 bg-white rounded-full float-medium"></div>
            <div class="absolute bottom-0 left-1/2 w-10 h-10 bg-white rounded-full float-fast"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
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
            <div class="mt-4 pt-4 border-t border-green-600 text-sm">
                <p>All rights reserved. Designed with <i class="fas fa-heart text-red-400 animate-pulse"></i> for secure elections.</p>
            </div>
        </div>
    </footer>

    <style>
        /* Confetti Animation */
        .confetti-piece {
            position: absolute;
            width: 10px;
            height: 30px;
            opacity: 0;
            animation: confetti 5s ease-in-out infinite;
        }
        
        .confetti-piece:nth-child(1) {
            left: 10%;
            animation-delay: 0s;
            animation-duration: 4s;
        }
        
        .confetti-piece:nth-child(2) {
            left: 20%;
            animation-delay: 0.5s;
            animation-duration: 4.5s;
        }
        
        .confetti-piece:nth-child(3) {
            left: 30%;
            animation-delay: 1s;
            animation-duration: 5s;
        }
        
        .confetti-piece:nth-child(4) {
            left: 40%;
            animation-delay: 1.5s;
            animation-duration: 4.2s;
        }
        
        .confetti-piece:nth-child(5) {
            left: 50%;
            animation-delay: 2s;
            animation-duration: 4.8s;
        }
        
        .confetti-piece:nth-child(6) {
            left: 60%;
            animation-delay: 2.5s;
            animation-duration: 5.2s;
        }
        
        .confetti-piece:nth-child(7) {
            left: 70%;
            animation-delay: 3s;
            animation-duration: 4.5s;
        }
        
        @keyframes confetti {
            0% {
                opacity: 1;
                top: -100%;
                transform: rotate(0deg);
            }
            100% {
                opacity: 0;
                top: 100%;
                transform: rotate(720deg);
            }
        }
    </style>

    <script>
        // Global variables
        let remainingTime = <?php echo $remaining_time ?? 0; ?>;
        let totalVoters = <?php echo $total_voters; ?>;
        let isFinalCountdownShown = false;
        let isEndModalShown = false;
        let countdownSound;
        let tickSound;
        let finalSound;
        
        // Initialize sounds
        function initSounds() {
            // Check if the Audio API is available
            if (typeof Audio !== 'undefined') {
                try {
                    countdownSound = new Audio('../sounds/countdown.mp3');
                    tickSound = new Audio('../sounds/tick.mp3');
                    finalSound = new Audio('../sounds/end.mp3');
                    tickSound.volume = 0.5;
                } catch (e) {
                    console.warn("Sound initialization failed:", e);
                }
            }
        }
        
        // Initialize as soon as page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Update votes cast display
            const votesCast = <?php echo $votes_cast; ?>;
            const abstainVotes = <?php echo $abstain_votes; ?>;
            const totalVoters = <?php echo $total_voters; ?>;
            
            const votesCastPercentage = totalVoters > 0 ? ((votesCast / totalVoters) * 100).toFixed(1) : 0;
            const abstainPercentage = votesCast > 0 ? ((abstainVotes / votesCast) * 100).toFixed(1) : 0;
            
            document.getElementById('votes-cast-count').textContent = votesCast;
            document.getElementById('votes-cast-bar').style.width = votesCastPercentage + '%';
            document.getElementById('votes-cast-percentage').textContent = votesCastPercentage + '%';
            
            document.getElementById('abstain-votes-count').textContent = abstainVotes;
            document.getElementById('abstain-votes-bar').style.width = abstainPercentage + '%';
            document.getElementById('abstain-votes-percentage').textContent = abstainPercentage + '%';
            
            // Your existing initializations
            initSounds();
            animateBars();
            checkScreenSize();
            
            // Start the countdown immediately with initial update
            updateTimeDisplay();
            setTimeout(updateRemainingTime, 1000);
            
            // Add resize event listener for responsive adjustments
            window.addEventListener('resize', checkScreenSize);
        });
        
        // Check screen size and adjust UI accordingly
        function checkScreenSize() {
            const isMobile = window.innerWidth < 640;
            const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
            
            // Adjust navigation bar
            const navContainer = document.querySelector('nav .container');
            if (isMobile) {
                navContainer.classList.add('flex-col', 'space-y-3');
                navContainer.classList.remove('flex-row', 'justify-between');
                document.querySelector('nav ul').classList.add('w-full', 'justify-center');
            } else {
                navContainer.classList.remove('flex-col', 'space-y-3');
                navContainer.classList.add('flex-row', 'justify-between');
                document.querySelector('nav ul').classList.remove('w-full', 'justify-center');
            }
            
            // Adjust candidate display
            const candidateCards = document.querySelectorAll('.bg-gray-50.p-4.rounded-xl');
            candidateCards.forEach(card => {
                const nameEl = card.querySelector('.font-medium.text-lg');
                const statsEl = card.querySelector('.flex.items-center.space-x-3');
                
                if (isMobile) {
                    nameEl.classList.add('text-base', 'mb-2');
                    statsEl.classList.add('flex-wrap', 'gap-2', 'justify-start');
                    statsEl.classList.remove('space-x-3');
                } else {
                    nameEl.classList.remove('text-base', 'mb-2');
                    statsEl.classList.remove('flex-wrap', 'gap-2', 'justify-start');
                    statsEl.classList.add('space-x-3');
                }
            });
        }
        
        // Function to initially set the time display
        function updateTimeDisplay() {
            if (remainingTime > 0) {
                const hours = Math.floor(remainingTime / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;
                
                // Update display
                document.getElementById('hours-display').textContent = String(hours).padStart(2, '0');
                document.getElementById('minutes-display').textContent = String(minutes).padStart(2, '0');
                document.getElementById('seconds-display').textContent = String(seconds).padStart(2, '0');
                
                // Apply appropriate styling
                updateTimeDisplayStyle();
            }
        }
        
        // Function to update time display styling based on remaining time
        function updateTimeDisplayStyle() {
            const timeContainer = document.getElementById('time-display-container');
            
            if (timeContainer) {
                // Change style when time is getting low
                if (remainingTime <= 300 && remainingTime > 60) { // 5 minutes or less
                    timeContainer.classList.add('warning-time');
                    timeContainer.classList.remove('danger-time');
                } 
                else if (remainingTime <= 60) { // 1 minute or less
                    timeContainer.classList.remove('warning-time');
                    timeContainer.classList.add('danger-time');
                }
                else {
                    timeContainer.classList.remove('warning-time');
                    timeContainer.classList.remove('danger-time');
                }
            }
        }
        
        // Modified animateBars function to specifically target both types of abstain bars
        function animateBars() {
            setTimeout(() => {
                // Animate all vote bars (including position-specific abstain bars)
                const voteBars = document.querySelectorAll('.vote-bar');
                voteBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width') + '%';
                    bar.style.width = targetWidth;
                });
                
                // Animate the global abstain bar
                const abstainBar = document.getElementById('abstain-votes-bar');
                if (abstainBar) {
                    const votesCast = <?php echo $votes_cast; ?>;
                    const abstainVotes = <?php echo $abstain_votes; ?>;
                    const abstainPercentage = votesCast > 0 ? ((abstainVotes / votesCast) * 100).toFixed(1) : 0;
                    document.getElementById('abstain-votes-percentage').textContent = abstainPercentage + '%';
                    abstainBar.style.width = abstainPercentage + '%';
                }
            }, 500);
        }

        // Enhanced time display function
        function updateRemainingTime() {
            if (remainingTime > 0) {
                remainingTime--;
                const hours = Math.floor(remainingTime / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;
                
                // Update display
                document.getElementById('hours-display').textContent = String(hours).padStart(2, '0');
                document.getElementById('minutes-display').textContent = String(minutes).padStart(2, '0');
                document.getElementById('seconds-display').textContent = String(seconds).padStart(2, '0');
                
                // Update display styling
                updateTimeDisplayStyle();
                
                // Start final countdown at 10 seconds if not already shown
                if (remainingTime <= 10 && !isFinalCountdownShown) {
                    startFinalCountdown(remainingTime);
                    isFinalCountdownShown = true;
                }
                
                // Schedule next update
                setTimeout(updateRemainingTime, 1000);
            } 
            else {
                // When time reaches zero
                document.getElementById('hours-display').textContent = '00';
                document.getElementById('minutes-display').textContent = '00';
                document.getElementById('seconds-display').textContent = '00';
                
                if (!isEndModalShown) {
                    showElectionEndModal();
                }
            }
        }
        
        // Dramatic final countdown (10 seconds or less)
        function startFinalCountdown(secondsLeft) {
            isFinalCountdownShown = true;
            const finalCountdownModal = document.getElementById('finalCountdownModal');
            const countdownNumber = document.getElementById('final-countdown-number');
            const countdownProgress = document.getElementById('countdown-progress');
            
            finalCountdownModal.classList.remove('hidden');
            finalCountdownModal.classList.add('flex');
            
            // Set initial number
            countdownNumber.textContent = secondsLeft;
            
            // Play alert sound
            countdownSound.play();
            
            // Create a separate countdown for the modal
            let currentSecond = secondsLeft;
            
            const finalCountInterval = setInterval(() => {
                currentSecond--;
                
                if (currentSecond < 0) {
                    clearInterval(finalCountInterval);
                    finalCountdownModal.classList.add('hidden');
                    showElectionEndModal();
                    return;
                }
                
                // Calculate width percentage for progress bar
                const widthPercentage = (currentSecond / 10) * 100;
                countdownProgress.style.width = `${widthPercentage}%`;
                
                // Remove previous animation
                countdownNumber.classList.remove('final-count-number');
                
                // Update number with animation
                setTimeout(() => {
                    countdownNumber.textContent = currentSecond;
                    countdownNumber.classList.add('final-count-number');
                    
                    // Play tick sound
                    if (tickSound) {
                        const newTickSound = tickSound.cloneNode();
                        newTickSound.volume = 0.5;
                        newTickSound.play();
                    }
                    
                    // Update message for last 3 seconds
                    if (currentSecond <= 3) {
                        document.getElementById('countdown-message').textContent = "Time's almost up!";
                        document.getElementById('countdown-message').classList.add('text-red-500');
                        countdownNumber.classList.add('text-red-600');
                    }
                }, 10);
                
            }, 1000);
        }
        
        // Show election end modal
        function showElectionEndModal() {
            isEndModalShown = true;
            document.getElementById('finalCountdownModal').classList.add('hidden');
            document.getElementById('electionEndModal').classList.remove('hidden');
            document.getElementById('electionEndModal').classList.add('flex');
            
            // Play final sound
            if (finalSound) {
                finalSound.play();
            }
        }
        
        // Redirect to results page
        function redirectToResults() {
            window.location.href = 'results.php';
        }
        
        // Modal functions
        function openLogoutModal() {
            document.getElementById('logoutModal').classList.remove('hidden');
            document.getElementById('logoutModal').classList.add('flex');
        }
        
        function closeLogoutModal() {
            document.getElementById('logoutModal').classList.add('hidden');
            document.getElementById('logoutModal').classList.remove('flex');
        }
        
        function openExtendTimeModal() {
            document.getElementById('extendTimeModal').classList.remove('hidden');
            document.getElementById('extendTimeModal').classList.add('flex');
            updateTimePreview();
        }
        
        function closeExtendTimeModal() {
            document.getElementById('extendTimeModal').classList.add('hidden');
            document.getElementById('extendTimeModal').classList.remove('flex');
        }
        
        // Close modals when clicking outside
        window.onclick = function(event) {
            const logoutModal = document.getElementById('logoutModal');
            const extendTimeModal = document.getElementById('extendTimeModal');
            
            if (event.target === logoutModal) {
                closeLogoutModal();
            }
            if (event.target === extendTimeModal) {
                closeExtendTimeModal();
            }
        }
        
        // Update time preview in Extend Time modal
        function updateTimePreview() {
            const hours = parseInt(document.getElementById('hours').value) || 0;
            const minutes = parseInt(document.getElementById('minutes').value) || 0;
            let totalMinutes = hours * 60 + minutes;
            
            // Adjust hours and minutes for display
            let displayHours = Math.floor(totalMinutes / 60);
            let displayMinutes = totalMinutes % 60;
            
            // Update preview text
            document.getElementById('timePreview').textContent = `Adding ${displayHours} hour${displayHours !== 1 ? 's' : ''}, ${displayMinutes} minute${displayMinutes !== 1 ? 's' : ''} to election`;
        }
        
        // Increment and decrement functions for hours and minutes
        function incrementHours() {
            document.getElementById('hours').value = parseInt(document.getElementById('hours').value || 0) + 1;
            updateTimePreview();
        }
        
        function decrementHours() {
            let currentValue = parseInt(document.getElementById('hours').value || 0);
            if (currentValue > 0) {
                document.getElementById('hours').value = currentValue - 1;
                updateTimePreview();
            }
        }
        
        function decrementMinutes() {
            let currentValue = parseInt(document.getElementById('minutes').value || 0);
            if (currentValue > 0) {
                document.getElementById('minutes').value = currentValue - 1;
                updateTimePreview();
            }
        }
        
        function incrementMinutes() {
            let currentValue = parseInt(document.getElementById('minutes').value || 0);
            if (currentValue < 59) {
                document.getElementById('minutes').value = currentValue + 1;
                updateTimePreview();
            }
        }
    </script>
</body>
</html>