<?php
// home.php
session_start();
require 'conn.php';

if (!isset($_SESSION['election_id'])) {
    header("Location: index.php");
    exit();
}

$election_id = $_SESSION['election_id'];
$current_page = basename($_SERVER['PHP_SELF']);

// Fetch the current election name based on election_id from the session
$election_query = "SELECT name, status, end_time FROM elections WHERE id = ?";
$stmt = $conn->prepare($election_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$result = $stmt->get_result();
$election = $result->fetch_assoc();
$election_name = $election ? $election['name'] : 'Election not found';
$election_status = $election['status'] ?? 0;
$election_end_time = $election['end_time'] ?? null;

// Check if there are party lists, positions, candidates, and voters for the current election
$partylist_count = $conn->query("SELECT COUNT(*) as count FROM partylists WHERE election_id = $election_id")->fetch_assoc()['count'];
$positions_count = $conn->query("SELECT COUNT(*) as count FROM positions WHERE election_id = $election_id")->fetch_assoc()['count'];
$candidates_count = $conn->query("SELECT COUNT(*) as count FROM candidates WHERE election_id = $election_id")->fetch_assoc()['count'];
$voters_count = $conn->query("SELECT COUNT(*) as count FROM voters WHERE election_id = $election_id")->fetch_assoc()['count'];

// Determine if the "Start Election" button should be enabled
$can_start_election = $partylist_count > 0 && $positions_count > 0 && $candidates_count > 0 && $voters_count > 0;

// Handle Start Election
if (isset($_POST['start_election'])) {
    $time_limit_hours = intval($_POST['time_limit_hours']); // Time limit in hours
    $time_limit_minutes = intval($_POST['time_limit_minutes']); // Time limit in minutes

    if ($time_limit_hours <= 0 && $time_limit_minutes <= 0) {
        $error_message = "Please set a valid time limit to start the election.";
    } else {
        $end_time = date("Y-m-d H:i:s", strtotime("+$time_limit_hours hours +$time_limit_minutes minutes"));

        $update_query = "UPDATE elections SET status = 1, end_time = ? WHERE id = ?";
        $update_stmt = $conn->prepare($update_query);
        $update_stmt->bind_param("si", $end_time, $election_id);
        $update_stmt->execute();

        // Redirect to votes.php after updating the status
        header("Location: votes.php");
        exit();
    }
}

// Handle Automatic End of Election
if ($election_status == 1 && $election_end_time && strtotime($election_end_time) <= time()) {
    $update_query = "UPDATE elections SET status = 0 WHERE id = ?";
    $update_stmt = $conn->prepare($update_query);
    $update_stmt->bind_param("i", $election_id);
    $update_stmt->execute();
    $election_status = 0; // Update the status locally
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Start Election | SIR-U</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#f0fdf4',
                            100: '#dcfce7',
                            200: '#bbf7d0',
                            300: '#86efac',
                            400: '#4ade80',
                            500: '#22c55e',
                            600: '#16a34a',
                            700: '#15803d',
                            800: '#166534',
                            900: '#14532d',
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">

    <!-- Top Navigation Bar -->
    <nav class="bg-gradient-to-r from-primary-700 to-primary-800 text-white shadow-md">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center py-3">
                <!-- Logo and Title -->
                <div class="flex items-center space-x-3">
                    <div class="bg-white p-1.5 rounded-full shadow-md">
                        <img src="../pics/logo.png" alt="Logo" class="h-8 w-8">
                    </div>
                    <a href="home.php" class="text-xl font-bold tracking-tight">SIR-U Election System</a>
                </div>

                <!-- Election Name Badge -->
                <div class="hidden md:flex items-center bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    <i class="fas fa-vote-yea mr-2"></i>
                    <span class="font-medium"><?php echo htmlspecialchars($election_name); ?></span>
                </div>

                <!-- Hamburger Menu for Mobile -->
                <button id="menu-toggle" class="md:hidden focus:outline-none">
                    <i class="fas fa-bars text-lg"></i>
                </button>
            </div>
        </div>
    </nav>

    <!-- Side Navigation & Content Container -->
    <div class="flex flex-col md:flex-row flex-1">
        
        <!-- Side Navigation for Desktop -->
        <aside class="hidden md:block bg-white w-64 shadow-lg h-[calc(100vh-64px)] sticky top-0 overflow-y-auto">
            <div class="p-4 border-b border-gray-100">
                <div class="text-sm font-medium text-gray-400 uppercase">Main Menu</div>
            </div>
            
            <nav class="mt-2 px-2">
                <!-- Dashboard Link -->
                <a href="home.php" class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'home.php' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'; ?>">
                    <i class="fas fa-home w-5 h-5 mr-3 <?php echo $current_page == 'home.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Dashboard</span>
                </a>
                
                <!-- Partylist Link -->
                <a href="partylist.php" class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'partylist.php' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'; ?>">
                    <i class="fas fa-flag w-5 h-5 mr-3 <?php echo $current_page == 'partylist.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Partylists</span>
                </a>
                
                <!-- Positions Link -->
                <a href="positions.php" class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'positions.php' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'; ?>">
                    <i class="fas fa-sitemap w-5 h-5 mr-3 <?php echo $current_page == 'positions.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Positions</span>
                </a>
                
                <!-- Candidates Link -->
                <a href="candidates.php" class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'candidates.php' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'; ?>">
                    <i class="fas fa-user-tie w-5 h-5 mr-3 <?php echo $current_page == 'candidates.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Candidates</span>
                </a>
                
                <!-- Voters Link -->
                <a href="voters.php" class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'voters.php' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'; ?>">
                    <i class="fas fa-users w-5 h-5 mr-3 <?php echo $current_page == 'voters.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Voters</span>
                </a>
                
                <!-- Start Link -->
                <a href="start.php" class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'start.php' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'; ?>">
                    <i class="fas fa-play-circle w-5 h-5 mr-3 <?php echo $current_page == 'start.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Start Election</span>
                </a>
                
                <hr class="my-4 border-gray-100">
                
                <!-- Logout Link -->
                <a href="#" onclick="confirmLogout(event);" class="flex items-center px-4 py-3 mb-1 rounded-lg text-red-600 hover:bg-red-50">
                    <i class="fas fa-sign-out-alt w-5 h-5 mr-3"></i>
                    <span>Logout</span>
                </a>
            </nav>
        </aside>
        
        <!-- Mobile Navigation Menu (Hidden by default) -->
        <div id="mobile-menu" class="md:hidden hidden bg-white w-full shadow-lg absolute z-50 top-16 left-0 right-0 transition-all duration-300 ease-in-out">
            <nav class="py-2">
                <a href="home.php" class="block px-6 py-3 hover:bg-gray-50 <?php echo $current_page == 'home.php' ? 'text-primary-700 font-medium' : ''; ?>">
                    <i class="fas fa-home mr-2"></i> Dashboard
                </a>
                <a href="partylist.php" class="block px-6 py-3 hover:bg-gray-50 <?php echo $current_page == 'partylist.php' ? 'text-primary-700 font-medium' : ''; ?>">
                    <i class="fas fa-flag mr-2"></i> Partylists
                </a>
                <a href="positions.php" class="block px-6 py-3 hover:bg-gray-50 <?php echo $current_page == 'positions.php' ? 'text-primary-700 font-medium' : ''; ?>">
                    <i class="fas fa-sitemap mr-2"></i> Positions
                </a>
                <a href="candidates.php" class="block px-6 py-3 hover:bg-gray-50 <?php echo $current_page == 'candidates.php' ? 'text-primary-700 font-medium' : ''; ?>">
                    <i class="fas fa-user-tie mr-2"></i> Candidates
                </a>
                <a href="voters.php" class="block px-6 py-3 hover:bg-gray-50 <?php echo $current_page == 'voters.php' ? 'text-primary-700 font-medium' : ''; ?>">
                    <i class="fas fa-users mr-2"></i> Voters
                </a>
                <a href="start.php" class="block px-6 py-3 hover:bg-gray-50 <?php echo $current_page == 'start.php' ? 'text-primary-700 font-medium' : ''; ?>">
                    <i class="fas fa-play-circle mr-2"></i> Start Election
                </a>
                <hr class="my-2 border-gray-100">
                <a href="#" onclick="confirmLogout(event);" class="block px-6 py-3 text-red-600 hover:bg-red-50">
                    <i class="fas fa-sign-out-alt mr-2"></i> Logout
                </a>
            </nav>
        </div>

        <!-- Main Content -->
        <main class="flex-1 p-4 md:p-6 bg-gray-50">
            <!-- Mobile Election Name Badge -->
            <div class="md:hidden bg-white rounded-lg shadow-sm p-3 mb-6 flex items-center justify-between">
                <div class="flex items-center">
                    <i class="fas fa-vote-yea text-primary-600 mr-2"></i>
                    <span class="font-medium"><?php echo htmlspecialchars($election_name); ?></span>
                </div>
                <div class="text-xs text-gray-500">Active Election</div>
            </div>
            
            <!-- Page Header -->
            <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                    <i class="fas fa-play-circle text-primary-600 mr-3"></i>
                    Start Election
                </h1>
                <p class="mt-2 text-gray-600 max-w-3xl">
                    Launch the voting process for <span class="font-medium"><?php echo htmlspecialchars($election_name); ?></span>.
                    Verify all requirements are met, set the duration, and begin the election.
                </p>
            </div>
            
            <!-- Check Current Election Status -->
            <?php if ($election_status == 1): ?>
            <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
                <div class="flex items-start">
                    <div class="flex-shrink-0 mt-0.5">
                        <i class="fas fa-info-circle text-green-500"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-green-800">Election is currently active</p>
                        <p class="text-sm text-green-700 mt-1">
                            The election will end automatically at: <?php echo date('F j, Y, g:i a', strtotime($election_end_time)); ?>
                        </p>
                        <div class="mt-3">
                            <a href="votes.php" class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm">
                                <i class="fas fa-chart-pie mr-2"></i> View Live Results
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <?php endif; ?>
            
            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Election Requirements Card -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="bg-primary-50 px-6 py-4 border-b border-primary-100">
                        <h2 class="text-lg font-semibold text-primary-800 flex items-center">
                            <i class="fas fa-clipboard-check mr-2"></i> Election Requirements
                        </h2>
                    </div>
                    
                    <div class="p-6 space-y-4">
                        <!-- Requirements List -->
                        <div class="rounded-lg border border-gray-200 overflow-hidden">
                            <!-- Partylist -->
                            <div class="px-4 py-3 flex items-center space-x-3 <?php echo $partylist_count > 0 ? 'bg-green-50 border-b border-gray-200' : 'bg-red-50 border-b border-gray-200'; ?>">
                                <div class="flex-shrink-0">
                                    <?php if ($partylist_count > 0): ?>
                                        <i class="fas fa-check-circle text-green-500 text-lg"></i>
                                    <?php else: ?>
                                        <i class="fas fa-times-circle text-red-500 text-lg"></i>
                                    <?php endif; ?>
                                </div>
                                <div class="flex-grow">
                                    <h4 class="font-medium <?php echo $partylist_count > 0 ? 'text-green-800' : 'text-red-800'; ?>">
                                        Partylist
                                    </h4>
                                    <p class="text-sm <?php echo $partylist_count > 0 ? 'text-green-600' : 'text-red-600'; ?>">
                                        <?php echo $partylist_count > 0 
                                            ? "$partylist_count partylists added" 
                                            : "No partylists found"; 
                                        ?>
                                    </p>
                                </div>
                                <?php if ($partylist_count == 0): ?>
                                    <div class="flex-shrink-0">
                                        <a href="partylist.php" class="bg-red-100 hover:bg-red-200 text-red-700 text-xs px-3 py-1 rounded-full transition-colors">
                                            Add Now
                                        </a>
                                    </div>
                                <?php endif; ?>
                            </div>
                            
                            <!-- Positions -->
                            <div class="px-4 py-3 flex items-center space-x-3 <?php echo $positions_count > 0 ? 'bg-green-50 border-b border-gray-200' : 'bg-red-50 border-b border-gray-200'; ?>">
                                <div class="flex-shrink-0">
                                    <?php if ($positions_count > 0): ?>
                                        <i class="fas fa-check-circle text-green-500 text-lg"></i>
                                    <?php else: ?>
                                        <i class="fas fa-times-circle text-red-500 text-lg"></i>
                                    <?php endif; ?>
                                </div>
                                <div class="flex-grow">
                                    <h4 class="font-medium <?php echo $positions_count > 0 ? 'text-green-800' : 'text-red-800'; ?>">
                                        Positions
                                    </h4>
                                    <p class="text-sm <?php echo $positions_count > 0 ? 'text-green-600' : 'text-red-600'; ?>">
                                        <?php echo $positions_count > 0 
                                            ? "$positions_count positions added" 
                                            : "No positions found"; 
                                        ?>
                                    </p>
                                </div>
                                <?php if ($positions_count == 0): ?>
                                    <div class="flex-shrink-0">
                                        <a href="positions.php" class="bg-red-100 hover:bg-red-200 text-red-700 text-xs px-3 py-1 rounded-full transition-colors">
                                            Add Now
                                        </a>
                                    </div>
                                <?php endif; ?>
                            </div>
                            
                            <!-- Candidates -->
                            <div class="px-4 py-3 flex items-center space-x-3 <?php echo $candidates_count > 0 ? 'bg-green-50 border-b border-gray-200' : 'bg-red-50 border-b border-gray-200'; ?>">
                                <div class="flex-shrink-0">
                                    <?php if ($candidates_count > 0): ?>
                                        <i class="fas fa-check-circle text-green-500 text-lg"></i>
                                    <?php else: ?>
                                        <i class="fas fa-times-circle text-red-500 text-lg"></i>
                                    <?php endif; ?>
                                </div>
                                <div class="flex-grow">
                                    <h4 class="font-medium <?php echo $candidates_count > 0 ? 'text-green-800' : 'text-red-800'; ?>">
                                        Candidates
                                    </h4>
                                    <p class="text-sm <?php echo $candidates_count > 0 ? 'text-green-600' : 'text-red-600'; ?>">
                                        <?php echo $candidates_count > 0 
                                            ? "$candidates_count candidates added" 
                                            : "No candidates found"; 
                                        ?>
                                    </p>
                                </div>
                                <?php if ($candidates_count == 0): ?>
                                    <div class="flex-shrink-0">
                                        <a href="candidates.php" class="bg-red-100 hover:bg-red-200 text-red-700 text-xs px-3 py-1 rounded-full transition-colors">
                                            Add Now
                                        </a>
                                    </div>
                                <?php endif; ?>
                            </div>
                            
                            <!-- Voters -->
                            <div class="px-4 py-3 flex items-center space-x-3 <?php echo $voters_count > 0 ? 'bg-green-50' : 'bg-red-50'; ?>">
                                <div class="flex-shrink-0">
                                    <?php if ($voters_count > 0): ?>
                                        <i class="fas fa-check-circle text-green-500 text-lg"></i>
                                    <?php else: ?>
                                        <i class="fas fa-times-circle text-red-500 text-lg"></i>
                                    <?php endif; ?>
                                </div>
                                <div class="flex-grow">
                                    <h4 class="font-medium <?php echo $voters_count > 0 ? 'text-green-800' : 'text-red-800'; ?>">
                                        Voters
                                    </h4>
                                    <p class="text-sm <?php echo $voters_count > 0 ? 'text-green-600' : 'text-red-600'; ?>">
                                        <?php echo $voters_count > 0 
                                            ? "$voters_count voter codes generated" 
                                            : "No voter codes found"; 
                                        ?>
                                    </p>
                                </div>
                                <?php if ($voters_count == 0): ?>
                                    <div class="flex-shrink-0">
                                        <a href="voters.php" class="bg-red-100 hover:bg-red-200 text-red-700 text-xs px-3 py-1 rounded-full transition-colors">
                                            Generate Now
                                        </a>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                        
                        <!-- Overall Status -->
                        <div class="bg-gray-50 rounded-lg p-4">
                            <div class="flex items-center">
                                <?php if ($can_start_election): ?>
                                    <div class="bg-green-100 rounded-full p-2 mr-3">
                                        <i class="fas fa-check text-green-600"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-green-800">Ready to Start</h4>
                                        <p class="text-sm text-green-600">All requirements have been met.</p>
                                    </div>
                                <?php else: ?>
                                    <div class="bg-red-100 rounded-full p-2 mr-3">
                                        <i class="fas fa-exclamation-triangle text-red-600"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-red-800">Not Ready</h4>
                                        <p class="text-sm text-red-600">Please complete all requirements before starting.</p>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Set Election Time Card -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div class="bg-primary-50 px-6 py-4 border-b border-primary-100">
                        <h2 class="text-lg font-semibold text-primary-800 flex items-center">
                            <i class="fas fa-clock mr-2"></i> Set Election Duration
                        </h2>
                    </div>
                    
                    <div class="p-6">
                        <?php if ($election_status == 0): ?>
                            <form method="POST" action="" id="start-election-form" class="space-y-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Time Limit</label>
                                    <p class="text-sm text-gray-500 mb-3">Set how long the election will be active before automatically closing.</p>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label for="time_limit_hours" class="block text-xs font-medium text-gray-500 mb-1">Hours</label>
                                            <div class="relative rounded-md shadow-sm">
                                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <i class="far fa-clock text-gray-400"></i>
                                                </div>
                                                <input type="number" id="time_limit_hours" name="time_limit_hours" 
                                                       class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-3 sm:text-sm border-gray-300 rounded-md" 
                                                       min="0" max="999" value="0" required>
                                            </div>
                                        </div>
                                        <div>
                                            <label for="time_limit_minutes" class="block text-xs font-medium text-gray-500 mb-1">Minutes</label>
                                            <div class="relative rounded-md shadow-sm">
                                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <i class="far fa-clock text-gray-400"></i>
                                                </div>
                                                <input type="number" id="time_limit_minutes" name="time_limit_minutes" 
                                                       class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 pr-3 sm:text-sm border-gray-300 rounded-md" 
                                                       min="1" max="59" value="30" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <?php if (isset($error_message)): ?>
                                    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                        <div class="flex">
                                            <div class="flex-shrink-0">
                                                <i class="fas fa-exclamation-circle text-red-500"></i>
                                            </div>
                                            <div class="ml-3">
                                                <p class="text-sm text-red-700"><?php echo $error_message; ?></p>
                                            </div>
                                        </div>
                                    </div>
                                <?php endif; ?>
                                
                                <!-- Election Preview -->
                                <div class="border border-primary-100 bg-primary-50 rounded-lg p-4">
                                    <h4 class="text-sm font-semibold text-primary-800 mb-2">Election Preview</h4>
                                    <div class="space-y-1 text-sm">
                                        <p class="text-primary-700">
                                            <span class="font-medium">Election Name:</span> <?php echo htmlspecialchars($election_name); ?>
                                        </p>
                                        <p class="text-primary-700">
                                            <span class="font-medium">Total Positions:</span> <?php echo $positions_count; ?>
                                        </p>
                                        <p class="text-primary-700">
                                            <span class="font-medium">Total Candidates:</span> <?php echo $candidates_count; ?>
                                        </p>
                                        <p class="text-primary-700">
                                            <span class="font-medium">Available Voters:</span> <?php echo $voters_count; ?>
                                        </p>
                                    </div>
                                </div>
                                
                                <div>
                                    <input type="hidden" name="start_election" id="start_election_submit" value="1">
                                    <button type="button" id="start-election-btn" 
                                            class="w-full flex items-center justify-center px-6 py-3 rounded-lg transition-colors text-lg font-semibold shadow-sm
                                                  <?php echo $can_start_election 
                                                        ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'; ?>"
                                            <?php echo $can_start_election ? '' : 'disabled'; ?>>
                                        <i class="fas fa-play-circle mr-2"></i>
                                        Start Election Now
                                    </button>
                                    
                                    <?php if (!$can_start_election): ?>
                                        <p class="text-red-500 text-sm text-center mt-3">
                                            <i class="fas fa-info-circle mr-1"></i>
                                            You must complete all requirements before starting the election.
                                        </p>
                                    <?php else: ?>
                                        <p class="text-primary-500 text-sm text-center mt-3">
                                            <i class="fas fa-info-circle mr-1"></i>
                                            Once the election is started, the voting process will begin and voters can cast their votes.
                                        </p>
                                    <?php endif; ?>
                                </div>
                            </form>
                        <?php else: ?>
                            <!-- Election Already Running View -->
                            <div class="text-center py-6">
                                <div class="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-green-100 mb-4">
                                    <i class="fas fa-vote-yea text-3xl text-green-600"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-green-800">Election is in progress</h3>
                                <p class="text-sm text-gray-600 mt-2">
                                    The election for <strong><?php echo htmlspecialchars($election_name); ?></strong> is currently active.
                                </p>
                                <p class="text-sm text-gray-600 mt-1">
                                    End Time: <span class="font-medium"><?php echo date('F j, Y, g:i a', strtotime($election_end_time)); ?></span>
                                </p>
                                
                                <div class="mt-8">
                                    <a href="votes.php" class="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-sm">
                                        <i class="fas fa-chart-pie mr-2"></i> View Live Results
                                    </a>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            
            <!-- Help Section -->
            <div class="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
                <div class="bg-primary-50 px-6 py-4 border-b border-primary-100">
                    <h2 class="text-lg font-semibold text-primary-800 flex items-center">
                        <i class="fas fa-info-circle mr-2"></i> Need Help?
                    </h2>
                </div>
                
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h3 class="font-medium text-gray-800 mb-2 flex items-center">
                                <i class="fas fa-question-circle text-primary-500 mr-2"></i>
                                How to Start an Election
                            </h3>
                            <p class="text-sm text-gray-600">
                                Complete all requirements, set the duration, and click the "Start Election Now" button.
                            </p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h3 class="font-medium text-gray-800 mb-2 flex items-center">
                                <i class="fas fa-history text-primary-500 mr-2"></i>
                                Election Duration
                            </h3>
                            <p class="text-sm text-gray-600">
                                Set a reasonable time limit to ensure all voters have adequate time to cast their votes.
                            </p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h3 class="font-medium text-gray-800 mb-2 flex items-center">
                                <i class="fas fa-shield-alt text-primary-500 mr-2"></i>
                                Election Security
                            </h3>
                            <p class="text-sm text-gray-600">
                                Only authenticated voters with valid access codes can participate in the election.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Footer -->
            <footer class="mt-12 text-center text-gray-500 text-sm">
                <p>© <?php echo date('Y'); ?> Votesys Election System | All Rights Reserved</p>
            </footer>
        </main>
    </div>

    <script>
        // Toggle the mobile menu
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // SweetAlert confirmation for logging out
        function confirmLogout(event) {
            event.preventDefault();

            Swal.fire({
                title: 'Log Out?',
                text: "You will be logged out of the election system.",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, log out',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#16a34a',
                cancelButtonColor: '#6b7280',
                heightAuto: false,
                customClass: {
                    popup: 'rounded-lg'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '../index.php';
                }
            });
        }

        // New code for election start with confirmation and countdown
        const startButton = document.getElementById('start-election-btn');
        if (startButton) {
            startButton.addEventListener('click', function() {
                // Get form values for validation
                const hours = parseInt(document.getElementById('time_limit_hours').value) || 0;
                const minutes = parseInt(document.getElementById('time_limit_minutes').value) || 0;
                
                // Validate time input
                if (hours <= 0 && minutes <= 0) {
                    Swal.fire({
                        title: 'Invalid Time Limit',
                        text: 'Please set a valid time limit to start the election.',
                        icon: 'error',
                        confirmButtonColor: '#16a34a',
                        customClass: {
                            popup: 'rounded-lg'
                        }
                    });
                    return;
                }
                
                // Duration in text format for the confirmation
                let durationText = '';
                if (hours > 0) {
                    durationText += hours + ' hour' + (hours > 1 ? 's' : '');
                }
                if (hours > 0 && minutes > 0) {
                    durationText += ' and ';
                }
                if (minutes > 0) {
                    durationText += minutes + ' minute' + (minutes > 1 ? 's' : '');
                }
                
                // Show the initial confirmation dialog
                Swal.fire({
                    title: 'Start Election?',
                    html: `
                        <div class="text-left mb-4 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                            <p class="text-yellow-800 font-medium mb-2">Please confirm election details:</p>
                            <p class="mb-1 text-sm"><span class="font-medium">Election Name:</span> <?php echo htmlspecialchars($election_name); ?></p>
                            <p class="mb-1 text-sm"><span class="font-medium">Duration:</span> ${durationText}</p>
                            <p class="mb-1 text-sm"><span class="font-medium">Voters:</span> <?php echo $voters_count; ?> registered</p>
                            <p class="mb-1 text-sm"><span class="font-medium">Candidates:</span> <?php echo $candidates_count; ?> registered</p>
                        </div>
                        <p class="mt-2 text-gray-600">Once started, the election will be immediately accessible to voters. Are you ready to proceed?</p>
                    `,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Start Election',
                    cancelButtonText: 'Cancel',
                    confirmButtonColor: '#16a34a',
                    cancelButtonColor: '#6b7280',
                    customClass: {
                        popup: 'rounded-lg'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        startCountdown();
                    }
                });
            });
        }
        
        function startCountdown() {
            let countdown = 3;
            
            // Create and show the countdown alert
            const countdownAlert = Swal.fire({
                title: 'Starting Election...',
                html: `
                    <div class="flex flex-col items-center">
                        <div class="text-4xl font-bold text-primary-600 mb-2">${countdown}</div>
                        <p class="text-gray-600">Election will start in ${countdown} seconds</p>
                        <p class="text-gray-500 text-sm mt-4">Click cancel to abort</p>
                    </div>
                `,
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: 'Cancel',
                cancelButtonColor: '#ef4444',
                allowOutsideClick: false,
                timer: countdown * 1000,
                timerProgressBar: true,
                customClass: {
                    popup: 'rounded-lg'
                },
                didOpen: () => {
                    const countdownInterval = setInterval(() => {
                        countdown--;
                        if (countdown > 0) {
                            Swal.update({
                                html: `
                                    <div class="flex flex-col items-center">
                                        <div class="text-4xl font-bold text-primary-600 mb-2">${countdown}</div>
                                        <p class="text-gray-600">Election will start in ${countdown} second${countdown !== 1 ? 's' : ''}</p>
                                        <p class="text-gray-500 text-sm mt-4">Click cancel to abort</p>
                                    </div>
                                `
                            });
                        }
                    }, 1000);
                    
                    // Clear interval when alert is closed
                    Swal.getPopup().addEventListener('swal2-hide', () => {
                        clearInterval(countdownInterval);
                    });
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    // Timer completed, submit the form
                    document.getElementById('start_election_submit').form.submit();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // User clicked cancel during countdown
                    Swal.fire({
                        title: 'Cancelled',
                        text: 'Election start has been cancelled.',
                        icon: 'info',
                        confirmButtonColor: '#16a34a',
                        customClass: {
                            popup: 'rounded-lg'
                        }
                    });
                }
            });
        }
    </script>
</body>
</html>