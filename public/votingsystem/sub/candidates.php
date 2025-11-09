<?php
session_start();
require 'conn.php';

if (!isset($_SESSION['election_id'])) {
    header("Location: index.php");
    exit();
}

$election_id = $_SESSION['election_id'];
$current_page = basename($_SERVER['PHP_SELF']);

// Fetch the current election name based on election_id from the session
$election_query = "SELECT name, status FROM elections WHERE id = ?";
$stmt = $conn->prepare($election_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$result = $stmt->get_result();
$election = $result->fetch_assoc();
$election_name = $election ? $election['name'] : 'Election not found';
$election_status = $election ? $election['status'] : 0;

// Check if election is active and redirect to votes.php if it is
if ($election_status == 1) {
    $_SESSION['error'] = "Cannot edit candidates because the election has already started.";
    header("Location: votes.php");
    exit();
}

// Get counts for validation
$partylist_count_query = "SELECT COUNT(*) as count FROM partylists WHERE election_id = ?";
$stmt = $conn->prepare($partylist_count_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$result_count = $stmt->get_result();
$partylist_count = $result_count->fetch_assoc()['count'];

$position_count_query = "SELECT COUNT(*) as count FROM positions WHERE election_id = ?";
$stmt = $conn->prepare($position_count_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$result_count = $stmt->get_result();
$position_count = $result_count->fetch_assoc()['count'];

$candidate_count_query = "SELECT COUNT(*) as count FROM candidates WHERE election_id = ?";
$stmt = $conn->prepare($candidate_count_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$result_count = $stmt->get_result();
$candidate_count = $result_count->fetch_assoc()['count'];

$voter_count_query = "SELECT COUNT(*) as count FROM voters WHERE election_id = ?";
$stmt = $conn->prepare($voter_count_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$result_count = $stmt->get_result();
$voter_count = $result_count->fetch_assoc()['count'];

// Set flags for navigation validation
$has_partylist = ($partylist_count > 0);
$has_position = ($position_count > 0);
$has_candidate = ($candidate_count > 0);
$has_voter = ($voter_count > 0);
$all_complete = ($has_partylist && $has_position && $has_candidate && $has_voter);

// Function to delete a candidate
function deleteCandidate($id) {
    global $conn;
    $sql = "DELETE FROM candidates WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    return $stmt->execute();
}

// Handle form submissions for candidates
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];

    if ($action == "create_candidate") {
        $position_id = $_POST['position_id'];
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $platform = $_POST['platform'];
        $partylist_id = $_POST['partylist_id'];

        // Handle photo upload
        $photo = uploadPhoto($_FILES['photo']);
        if ($photo) {
            $createResult = createCandidate($election_id, $position_id, $firstname, $lastname, $photo, $platform, $partylist_id);
            if ($createResult === true) {
                $_SESSION['message'] = "Candidate created successfully!";
                header("Location: candidates.php");
                exit();
            } else {
                $_SESSION['error'] = $createResult;
            }
        } else {
            $_SESSION['error'] = "Error uploading photo!";
        }
    } elseif ($action == "delete_candidate") {
        $id = $_POST['id'];
        if (deleteCandidate($id)) {
            $_SESSION['message'] = "Candidate deleted successfully!";
            header("Location: candidates.php");
            exit();
        } else {
            $_SESSION['error'] = "Error deleting candidate!";
        }
    } elseif ($action == "update_candidate") {
        $id = $_POST['id'];
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $position_id = $_POST['position_id'];
        $partylist_id = $_POST['partylist_id'];
        $platform = $_POST['platform'];
    
        // Handle photo upload
        $photo = null;
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] == UPLOAD_ERR_OK) {
            $photo = uploadPhoto($_FILES['photo']);
        }
    
        if (updateCandidate($id, $firstname, $lastname, $position_id, $partylist_id, $platform, $photo)) {
            $_SESSION['message'] = "Candidate updated successfully!";
            header("Location: candidates.php");
            exit();
        } else {
            $_SESSION['error'] = "Error updating candidate!";
        }
    }
}

// Function to fetch positions
function getPositions($election_id) {
    global $conn;
    $sql = "SELECT * FROM positions WHERE election_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $election_id);
    $stmt->execute();
    return $stmt->get_result();
}

// Function to fetch partylists
function getPartylists($election_id) {
    global $conn;
    $sql = "SELECT * FROM partylists WHERE election_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $election_id);
    $stmt->execute();
    return $stmt->get_result();
}

// Function to fetch candidates with all details
function getCandidates($election_id) {
    global $conn;
    $sql = "
        SELECT c.*, p.description AS position_description, pl.name AS partylist_name
        FROM candidates c
        JOIN positions p ON c.position_id = p.position_id
        LEFT JOIN partylists pl ON c.partylist_id = pl.partylist_id
        WHERE c.election_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $election_id);
    $stmt->execute();
    return $stmt->get_result();
}

// Function to create a new candidate
function createCandidate($election_id, $position_id, $firstname, $lastname, $photo, $platform, $partylist_id) {
    global $conn;

    // Check if the number of candidates in the partylist for the position exceeds the max_vote
    $maxVoteQuery = "
        SELECT p.max_vote, COUNT(c.id) AS current_candidates
        FROM positions p
        LEFT JOIN candidates c ON c.position_id = p.position_id AND c.partylist_id = ?
        WHERE p.position_id = ?
        GROUP BY p.max_vote";
    $stmt = $conn->prepare($maxVoteQuery);
    $stmt->bind_param("ii", $partylist_id, $position_id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    if ($result && $result['current_candidates'] >= $result['max_vote']) {
        // Return false if the max_vote limit is reached
        return "Max vote limit reached for this partylist and position.";
    }

    // Proceed to insert the candidate if the limit is not reached
    $sql = "INSERT INTO candidates (election_id, position_id, firstname, lastname, photo, platform, partylist_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iissssi", $election_id, $position_id, $firstname, $lastname, $photo, $platform, $partylist_id);
    return $stmt->execute() ? true : "Error adding candidate.";
}

// Function to update a candidate
function updateCandidate($id, $firstname, $lastname, $position_id, $partylist_id, $platform, $photo = null) {
    global $conn;

    if ($photo) {
        $sql = "UPDATE candidates 
                SET firstname = ?, lastname = ?, position_id = ?, partylist_id = ?, platform = ?, photo = ? 
                WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssisssi", $firstname, $lastname, $position_id, $partylist_id, $platform, $photo, $id);
    } else {
        $sql = "UPDATE candidates 
                SET firstname = ?, lastname = ?, position_id = ?, partylist_id = ?, platform = ? 
                WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssissi", $firstname, $lastname, $position_id, $partylist_id, $platform, $id);
    }

    return $stmt->execute();
}

// Function to handle file upload
function uploadPhoto($file) {
    $targetDir = "uploads/";
    
    // Create directory if it doesn't exist
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    
    $targetFile = $targetDir . basename($file["name"]);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if image file is valid
    $check = getimagesize($file["tmp_name"]);
    if ($check === false) {
        return false;
    }

    // Check file size (20MB limit)
    if ($file["size"] > 20000000) {
        return false;
    }

    // Allow certain file formats
    $allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array($imageFileType, $allowedFormats)) {
        return false;
    }

    // Generate unique filename
    $newFilename = uniqid() . '.' . $imageFileType;
    $targetFile = $targetDir . $newFilename;

    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        return $targetFile;
    }
    return false;
}

// Fetch data for display
$candidates = getCandidates($election_id);
$positions = getPositions($election_id);
$partylists = getPartylists($election_id);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Candidates | SIR-U</title>
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
                
                <!-- Partylist Link - Always enabled as it's the first step -->
                <a href="partylist.php" class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'partylist.php' ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-50'; ?>">
                    <i class="fas fa-flag w-5 h-5 mr-3 <?php echo $current_page == 'partylist.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Partylists</span>
                </a>
                
                <!-- Positions Link - Only enabled if there are partylists -->
                <a href="<?php echo $has_partylist ? 'positions.php' : '#'; ?>" 
                   class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'positions.php' ? 'bg-primary-50 text-primary-700 font-medium' : ($has_partylist ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'); ?>">
                    <i class="fas fa-sitemap w-5 h-5 mr-3 <?php echo $current_page == 'positions.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Positions</span>
                    <?php if (!$has_partylist): ?>
                        <span class="ml-auto text-xs text-red-500">
                            <i class="fas fa-lock"></i>
                        </span>
                    <?php endif; ?>
                </a>
                
                <!-- Candidates Link - Only enabled if there are positions -->
                <a href="<?php echo $has_position ? 'candidates.php' : '#'; ?>" 
                   class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'candidates.php' ? 'bg-primary-50 text-primary-700 font-medium' : ($has_position ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'); ?>">
                    <i class="fas fa-user-tie w-5 h-5 mr-3 <?php echo $current_page == 'candidates.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Candidates</span>
                    <?php if (!$has_position): ?>
                        <span class="ml-auto text-xs text-red-500">
                            <i class="fas fa-lock"></i>
                        </span>
                    <?php endif; ?>
                </a>
                
                <!-- Voters Link - Only enabled if there are candidates -->
                <a href="<?php echo $has_candidate ? 'voters.php' : '#'; ?>" 
                   class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'voters.php' ? 'bg-primary-50 text-primary-700 font-medium' : ($has_candidate ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'); ?>">
                    <i class="fas fa-users w-5 h-5 mr-3 <?php echo $current_page == 'voters.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Voters</span>
                    <?php if (!$has_candidate): ?>
                        <span class="ml-auto text-xs text-red-500">
                            <i class="fas fa-lock"></i>
                        </span>
                    <?php endif; ?>
                </a>
                
                <!-- Start Election Link - Only enabled if all previous steps are complete -->
                <a href="<?php echo $all_complete ? 'start.php' : '#'; ?>" 
                   class="flex items-center px-4 py-3 mb-1 rounded-lg <?php echo $current_page == 'start.php' ? 'bg-primary-50 text-primary-700 font-medium' : ($all_complete ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'); ?>">
                    <i class="fas fa-play-circle w-5 h-5 mr-3 <?php echo $current_page == 'start.php' ? 'text-primary-700' : 'text-gray-400'; ?>"></i>
                    <span>Start Election</span>
                    <?php if (!$all_complete): ?>
                        <span class="ml-auto text-xs text-red-500">
                            <i class="fas fa-lock"></i>
                        </span>
                    <?php endif; ?>
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
                <a href="<?php echo $has_partylist ? 'positions.php' : '#'; ?>" 
                   class="block px-6 py-3 <?php echo $current_page == 'positions.php' ? 'text-primary-700 font-medium' : ($has_partylist ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'); ?>">
                    <i class="fas fa-sitemap mr-2"></i> Positions
                    <?php if (!$has_partylist): ?>
                        <span class="ml-2 text-xs text-red-500">
                            <i class="fas fa-lock"></i>
                        </span>
                    <?php endif; ?>
                </a>
                <a href="<?php echo $has_position ? 'candidates.php' : '#'; ?>" 
                   class="block px-6 py-3 <?php echo $current_page == 'candidates.php' ? 'text-primary-700 font-medium' : ($has_position ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'); ?>">
                    <i class="fas fa-user-tie mr-2"></i> Candidates
                    <?php if (!$has_position): ?>
                        <span class="ml-2 text-xs text-red-500">
                            <i class="fas fa-lock"></i>
                        </span>
                    <?php endif; ?>
                </a>
                <a href="<?php echo $has_candidate ? 'voters.php' : '#'; ?>" 
                   class="block px-6 py-3 <?php echo $current_page == 'voters.php' ? 'text-primary-700 font-medium' : ($has_candidate ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'); ?>">
                    <i class="fas fa-users mr-2"></i> Voters
                    <?php if (!$has_candidate): ?>
                        <span class="ml-2 text-xs text-red-500">
                            <i class="fas fa-lock"></i>
                        </span>
                    <?php endif; ?>
                </a>
                <a href="<?php echo $all_complete ? 'start.php' : '#'; ?>" 
                   class="block px-6 py-3 <?php echo $current_page == 'start.php' ? 'text-primary-700 font-medium' : ($all_complete ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'); ?>">
                    <i class="fas fa-play-circle mr-2"></i> Start Election
                    <?php if (!$all_complete): ?>
                        <span class="ml-2 text-xs text-red-500">
                            <i class="fas fa-lock"></i>
                        </span>
                    <?php endif; ?>
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
                    <i class="fas fa-user-tie text-primary-600 mr-3"></i>
                    Manage Candidates
                </h1>
                <p class="mt-2 text-gray-600 max-w-3xl">
                    Add and manage candidates for <span class="font-medium"><?php echo htmlspecialchars($election_name); ?></span>.
                    Associate each candidate with a position and optionally with a partylist.
                </p>
            </div>

            <!-- Display Messages -->
            <?php if (isset($_SESSION['error'])): ?>
                <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <i class="fas fa-exclamation-circle text-red-500"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-red-700"><?php echo $_SESSION['error']; unset($_SESSION['error']); ?></p>
                        </div>
                    </div>
                </div>
            <?php endif; ?>

            <?php if (isset($_SESSION['message'])): ?>
                <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <i class="fas fa-check-circle text-green-500"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-green-700"><?php echo $_SESSION['message']; unset($_SESSION['message']); ?></p>
                        </div>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Action Buttons -->
            <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div class="flex space-x-2">
                    <a href="positions.php" class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i> Back to Positions
                    </a>
                </div>
                
                <div class="flex space-x-2">
                    <button onclick="openAddModal()" class="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-sm">
                        <i class="fas fa-plus mr-2"></i> Add New Candidate
                    </button>
                    
                    <a href="<?php echo $has_candidate ? 'voters.php' : '#'; ?>" 
                       class="flex items-center px-4 py-2 rounded-lg transition-colors shadow-sm
                              <?php echo ($has_candidate) ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'; ?>"
                       <?php echo ($has_candidate) ? '' : 'onclick="return showRequiredMessage(event);"'; ?>>
                        Next: Voters <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- Warning Message if no candidates -->
            <?php if (!$has_candidate): ?>
                <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <i class="fas fa-exclamation-circle text-red-500"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-red-700">
                                You must add at least one candidate to proceed to the next step.
                            </p>
                        </div>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Candidates Table -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                <div class="p-4 bg-primary-50 border-b border-primary-100">
                    <h2 class="text-lg font-medium text-primary-800">
                        <i class="fas fa-user-tie mr-2"></i> Candidate List
                    </h2>
                </div>

                <?php if ($candidates->num_rows > 0): ?>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Position
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Candidate
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Partylist
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Platform
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Photo
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <!-- Fix for candidate table row -->
                            <tbody class="bg-white divide-y divide-gray-200">
                                <?php
                                mysqli_data_seek($candidates, 0); // Reset pointer
                                while ($candidate = $candidates->fetch_assoc()): 
                                ?>
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                                                <?php echo htmlspecialchars($candidate['position_description']); ?>
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="ml-0">
                                                    <div class="text-sm font-medium text-gray-900">
                                                        <?php echo htmlspecialchars($candidate['firstname'] . ' ' . $candidate['lastname']); ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <?php if (!empty($candidate['partylist_name'])): ?>
                                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                                                    <?php echo htmlspecialchars($candidate['partylist_name']); ?>
                                                </span>
                                            <?php else: ?>
                                                <span class="text-gray-400 text-xs">No Partylist</span>
                                            <?php endif; ?>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="text-sm text-gray-900 max-w-xs truncate">
                                                <?php echo htmlspecialchars($candidate['platform']); ?>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <?php if (!empty($candidate['photo'])): ?>
                                                <img src="<?php echo htmlspecialchars($candidate['photo']); ?>" alt="Candidate Photo" class="h-12 w-12 object-cover rounded-full border border-gray-200 shadow-sm">
                                            <?php else: ?>
                                                <div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <i class="fas fa-user text-gray-400"></i>
                                                </div>
                                            <?php endif; ?>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onclick="openEditModal(
                                                <?php echo $candidate['id']; ?>, 
                                                '<?php echo htmlspecialchars($candidate['firstname'], ENT_QUOTES); ?>', 
                                                '<?php echo htmlspecialchars($candidate['lastname'], ENT_QUOTES); ?>', 
                                                <?php echo $candidate['position_id']; ?>, 
                                                <?php echo $candidate['partylist_id'] ?? 'null'; ?>, 
                                                '<?php echo htmlspecialchars($candidate['platform'], ENT_QUOTES); ?>'
                                                )" 
                                                    class="text-primary-600 hover:text-primary-900 bg-primary-50 hover:bg-primary-100 px-3 py-1 rounded-md transition-colors mr-2">
                                                <i class="fas fa-edit mr-1"></i> Edit
                                            </button>
                                            <button onclick="openDeleteModal(<?php echo $candidate['id']; ?>)" 
                                                    class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors">
                                                <i class="fas fa-trash-alt mr-1"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                <?php endwhile; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <div class="py-12 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-500 mb-4">
                            <i class="fas fa-user-tie text-xl"></i>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900">No candidates yet</h3>
                        <p class="mt-2 text-sm text-gray-500">Get started by adding candidates to your election.</p>
                        <div class="mt-6">
                            <button onclick="openAddModal()" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                                <i class="fas fa-plus mr-2"></i> Add Candidate
                            </button>
                        </div>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Footer -->
            <footer class="mt-12 text-center text-gray-500 text-sm">
            <p>© <?php echo date('Y'); ?> Votesys Election System | All Rights Reserved</p>
            </footer>
        </main>
    </div>

    <!-- Add Candidate Modal (Fixed) -->
    <div id="addModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900 flex items-center">
                    <i class="fas fa-plus-circle text-primary-500 mr-2"></i>
                    Add New Candidate
                </h3>
                <button type="button" onclick="closeAddModal()" class="text-gray-400 hover:text-gray-500">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <form method="POST" action="" enctype="multipart/form-data" class="p-6 space-y-4">
                <input type="hidden" name="action" value="create_candidate">
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="firstname" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <div class="relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user text-gray-400"></i>
                            </div>
                            <input type="text" name="firstname" id="firstname" 
                                   class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" 
                                   placeholder="First name" required>
                        </div>
                    </div>
                    <div>
                        <label for="lastname" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" name="lastname" id="lastname" 
                               class="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md py-3" 
                               placeholder="Last name" required>
                    </div>
                </div>

                <div>
                    <label for="position_id" class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-sitemap text-gray-400"></i>
                        </div>
                        <select name="position_id" id="position_id" 
                                class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" required>
                            <option value="">Select Position</option>
                            <?php
                            mysqli_data_seek($positions, 0); // Reset pointer
                            while ($position = $positions->fetch_assoc()): 
                            ?>
                                <option value="<?php echo $position['position_id']; ?>"><?php echo htmlspecialchars($position['description']); ?></option>
                            <?php endwhile; ?>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-none">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                </div>

                <div>
                    <label for="partylist_id" class="block text-sm font-medium text-gray-700 mb-1">Partylist (Optional)</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-flag text-gray-400"></i>
                        </div>
                        <select name="partylist_id" id="partylist_id" 
                                class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3">
                            <option value="">No Partylist</option>
                            <?php
                            mysqli_data_seek($partylists, 0); // Reset pointer
                            while ($partylist = $partylists->fetch_assoc()): 
                            ?>
                                <option value="<?php echo $partylist['partylist_id']; ?>"><?php echo htmlspecialchars($partylist['name']); ?></option>
                            <?php endwhile; ?>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-none">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                </div>

                <div>
                    <label for="platform" class="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                            <i class="fas fa-align-left text-gray-400"></i>
                        </div>
                        <textarea name="platform" id="platform" rows="3" 
                                  class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" 
                                  placeholder="Enter candidate's platform" required></textarea>
                    </div>
                </div>

                <div>
                    <label for="photo" class="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                    <div class="mt-1 flex items-center">
                        <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 mr-3">
                            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        <input type="file" name="photo" id="photo" 
                               class="focus:ring-primary-500 focus:border-primary-500 block sm:text-sm border-gray-300 rounded-md py-2" 
                               accept="image/*" required>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Max file size: 20MB. Supported formats: JPG, PNG, GIF</p>
                </div>
                
                <div class="pt-2 flex justify-end space-x-3">
                    <button type="button" onclick="closeAddModal()" 
                            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Cancel
                    </button>
                    <button type="submit" 
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <i class="fas fa-save mr-2"></i> Save Candidate
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Edit Candidate Modal -->
    <div id="editModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900 flex items-center">
                    <i class="fas fa-edit text-primary-500 mr-2"></i>
                    Edit Candidate
                </h3>
                <button type="button" onclick="closeEditModal()" class="text-gray-400 hover:text-gray-500">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <form method="POST" action="" enctype="multipart/form-data" class="p-6 space-y-4">
                <input type="hidden" name="action" value="update_candidate">
                <input type="hidden" id="editCandidateId" name="id">
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="editFirstname" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <div class="relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user text-gray-400"></i>
                            </div>
                            <input type="text" name="firstname" id="editFirstname" 
                                   class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" 
                                   placeholder="First name" required>
                        </div>
                    </div>
                    <div>
                        <label for="editLastname" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" name="lastname" id="editLastname" 
                               class="focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md py-3" 
                               placeholder="Last name" required>
                    </div>
                </div>

                <div>
                    <label for="editPositionId" class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-sitemap text-gray-400"></i>
                        </div>
                        <select name="position_id" id="editPositionId" 
                                class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" required>
                            <option value="">Select Position</option>
                            <?php
                            mysqli_data_seek($positions, 0); // Reset pointer
                            while ($position = $positions->fetch_assoc()): 
                            ?>
                                <option value="<?php echo $position['position_id']; ?>"><?php echo htmlspecialchars($position['description']); ?></option>
                            <?php endwhile; ?>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-none">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                </div>

                <div>
                    <label for="editPartylistId" class="block text-sm font-medium text-gray-700 mb-1">Partylist (Optional)</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-flag text-gray-400"></i>
                        </div>
                        <select name="partylist_id" id="editPartylistId" 
                                class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3">
                            <option value="">No Partylist</option>
                            <?php
                            mysqli_data_seek($partylists, 0); // Reset pointer
                            while ($partylist = $partylists->fetch_assoc()): 
                            ?>
                                <option value="<?php echo $partylist['partylist_id']; ?>"><?php echo htmlspecialchars($partylist['name']); ?></option>
                            <?php endwhile; ?>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-none">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                </div>

                <div>
                    <label for="editPlatform" class="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                            <i class="fas fa-align-left text-gray-400"></i>
                        </div>
                        <textarea name="platform" id="editPlatform" rows="3" 
                                  class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md" 
                                  placeholder="Enter candidate's platform" required></textarea>
                    </div>
                </div>

                <div>
                    <label for="editPhoto" class="block text-sm font-medium text-gray-700 mb-1">Photo (Leave empty to keep current photo)</label>
                    <div class="mt-1 flex items-center">
                        <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 mr-3">
                            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        <input type="file" name="photo" id="editPhoto" 
                               class="focus:ring-primary-500 focus:border-primary-500 block sm:text-sm border-gray-300 rounded-md py-2" 
                               accept="image/*">
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Max file size: 20MB. Supported formats: JPG, PNG, GIF</p>
                </div>
                
                <div class="pt-2 flex justify-end space-x-3">
                    <button type="button" onclick="closeEditModal()" 
                            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Cancel
                    </button>
                    <button type="submit" 
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <i class="fas fa-save mr-2"></i> Update Candidate
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div id="deleteModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900 flex items-center">
                    <i class="fas fa-trash-alt text-red-500 mr-2"></i>
                    Delete Candidate
                </h3>
                <button type="button" onclick="closeDeleteModal()" class="text-gray-400 hover:text-gray-500">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="p-6">
                <div class="flex items-center justify-center bg-red-100 rounded-full w-16 h-16 mx-auto mb-4">
                    <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
                </div>
                
                <p class="text-center text-gray-800 font-medium">Are you sure you want to delete this candidate?</p>
                <p class="text-center text-red-600 text-sm mt-4">This action cannot be undone.</p>
                
                <form method="POST" action="" class="mt-6">
                    <input type="hidden" name="action" value="delete_candidate">
                    <input type="hidden" id="deleteCandidateId" name="id">
                    
                    <div class="flex justify-center space-x-3">
                        <button type="button" onclick="closeDeleteModal()" 
                                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Cancel
                        </button>
                        <button type="submit" 
                               class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <i class="fas fa-trash-alt mr-2"></i> Delete Permanently
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        // Toggle the mobile menu
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Modal functions
        function openAddModal() {
            document.getElementById('addModal').classList.remove('hidden');
            document.getElementById('firstname').focus();
        }

        function closeAddModal() {
            document.getElementById('addModal').classList.add('hidden');
        }

        function openEditModal(id, firstname, lastname, positionId, partylistId, platform) {
            document.getElementById('editCandidateId').value = id;
            document.getElementById('editFirstname').value = firstname;
            document.getElementById('editLastname').value = lastname;
            document.getElementById('editPositionId').value = positionId;
            document.getElementById('editPartylistId').value = partylistId === null ? '' : partylistId;
            document.getElementById('editPlatform').value = platform;
            document.getElementById('editModal').classList.remove('hidden');
            document.getElementById('editFirstname').focus();
        }

        function closeEditModal() {
            document.getElementById('editModal').classList.add('hidden');
        }

        function openDeleteModal(id) {
            document.getElementById('deleteCandidateId').value = id;
            document.getElementById('deleteModal').classList.remove('hidden');
        }

        function closeDeleteModal() {
            document.getElementById('deleteModal').classList.add('hidden');
        }

        // New function to display required message
        function showRequiredMessage(event) {
            event.preventDefault();
            Swal.fire({
                title: 'Action Required',
                text: 'You need to add at least one candidate first.',
                icon: 'warning',
                confirmButtonColor: '#16a34a'
            });
            return false;
        }

        // Add tooltips for disabled links
        document.addEventListener('DOMContentLoaded', function() {
            const disabledLinks = document.querySelectorAll('.cursor-not-allowed');
            disabledLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    let message = '';
                    if (this.querySelector('span')?.textContent.includes('Positions')) {
                        message = 'You need to create at least one partylist first.';
                    } else if (this.querySelector('span')?.textContent.includes('Candidates')) {
                        message = 'You need to create at least one position first.';
                    } else if (this.querySelector('span')?.textContent.includes('Voters')) {
                        message = 'You need to add at least one candidate first.';
                    } else if (this.querySelector('span')?.textContent.includes('Start')) {
                        message = 'You need to complete all setup steps before launching the election.';
                    } else {
                        message = 'Complete previous steps first.';
                    }
                    
                    Swal.fire({
                        title: 'Action Required',
                        text: message,
                        icon: 'warning',
                        confirmButtonColor: '#16a34a'
                    });
                });
            });
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
    </script>
</body>
</html>
