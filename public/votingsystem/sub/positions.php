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
    $_SESSION['error'] = "Cannot edit positions because the election has already started.";
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

// Function to fetch positions
function getPositions($election_id) {
    global $conn;
    $sql = "SELECT position_id, description, max_vote FROM positions WHERE election_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $election_id);
    $stmt->execute();
    return $stmt->get_result();
}

// Function to create a new position
function createPosition($election_id, $description, $max_vote) {
    global $conn;
    $sql = "INSERT INTO positions (election_id, description, max_vote) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isi", $election_id, $description, $max_vote);
    return $stmt->execute();
}

// Function to update an existing position
function updatePosition($id, $description, $max_vote) {
    global $conn;
    $sql = "UPDATE positions SET description = ?, max_vote = ? WHERE position_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sii", $description, $max_vote, $id);
    return $stmt->execute();
}

// Function to delete a position
function deletePosition($id) {
    global $conn;
    $sql = "DELETE FROM positions WHERE position_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    return $stmt->execute();
}

// Handle form submissions for positions
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'];
    $id = isset($_POST['id']) ? $_POST['id'] : null;

    if ($action == "create_position") {
        $description = $_POST['description'];
        $max_vote = $_POST['max_vote'];
        createPosition($election_id, $description, $max_vote);
    } elseif ($action == "update_position") {
        $description = $_POST['description'];
        $max_vote = $_POST['max_vote'];
        updatePosition($id, $description, $max_vote);
    } elseif ($action == "delete_position") {
        deletePosition($id);
    }
    
    // Redirect to refresh the page after form submission
    header("Location: positions.php");
    exit();
}

$positions = getPositions($election_id);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Positions | SIR-U</title>
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
                    <a href="home.php" class="text-xl font-bold tracking-tight">Votesys Election System</a>
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
                    <i class="fas fa-sitemap text-primary-600 mr-3"></i>
                    Manage Positions
                </h1>
                <p class="mt-2 text-gray-600 max-w-3xl">
                    Define the available positions for <span class="font-medium"><?php echo htmlspecialchars($election_name); ?></span>. 
                    Set position names and maximum votes allowed for each position.
                </p>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div class="flex space-x-2">
                    <a href="partylist.php" class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i> Back to Partylists
                    </a>
                </div>
                
                <div class="flex space-x-2">
                    <button onclick="openAddModal()" class="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-sm">
                        <i class="fas fa-plus mr-2"></i> Add Position
                    </button>
                    
                    <a href="<?php echo $has_position ? 'candidates.php' : '#'; ?>" 
                       class="flex items-center px-4 py-2 rounded-lg transition-colors shadow-sm
                              <?php echo ($has_position) ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'; ?>"
                       <?php echo ($has_position) ? '' : 'onclick="return showRequiredMessage(event);"'; ?>>
                        Next: Candidates <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
            
            <!-- Warning Message if no positions -->
            <?php if (!$has_position): ?>
                <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <i class="fas fa-exclamation-circle text-red-500"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-red-700">
                                You must add at least one position to proceed to the next step.
                            </p>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
            
            <!-- Positions Table -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                <div class="p-4 bg-primary-50 border-b border-primary-100">
                    <h2 class="text-lg font-medium text-primary-800">
                        <i class="fas fa-list-ul mr-2"></i> Positions List
                    </h2>
                </div>
                
                <?php if ($positions->num_rows > 0): ?>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Position Name
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Max Votes
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <?php
                                mysqli_data_seek($positions, 0); // Reset pointer
                                while ($row = $positions->fetch_assoc()): 
                                ?>
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <i class="fas fa-sitemap text-primary-500"></i>
                                                </div>
                                                <div class="ml-4">
                                                    <div class="text-sm font-medium text-gray-900">
                                                        <?php echo htmlspecialchars($row['description']); ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                                                <?php echo htmlspecialchars($row['max_vote']); ?> vote<?php echo $row['max_vote'] > 1 ? 's' : ''; ?>
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onclick="openEditModal(<?php echo $row['position_id']; ?>, '<?php echo addslashes($row['description']); ?>', <?php echo $row['max_vote']; ?>)" 
                                                    class="text-primary-600 hover:text-primary-900 bg-primary-50 hover:bg-primary-100 px-3 py-1 rounded-md transition-colors mr-2">
                                                <i class="fas fa-edit mr-1"></i> Edit
                                            </button>
                                            <button onclick="openDeleteModal(<?php echo $row['position_id']; ?>, '<?php echo addslashes($row['description']); ?>')" 
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
                            <i class="fas fa-sitemap text-xl"></i>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900">No positions yet</h3>
                        <p class="mt-2 text-sm text-gray-500">Get started by creating a new position.</p>
                        <div class="mt-6">
                            <button onclick="openAddModal()" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                                <i class="fas fa-plus mr-2"></i> Add Position
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

    <!-- Add Position Modal -->
    <div id="addModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <!-- Add Modal content remains unchanged -->
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900 flex items-center">
                    <i class="fas fa-plus-circle text-primary-500 mr-2"></i>
                    Add New Position
                </h3>
                <button type="button" onclick="closeAddModal()" class="text-gray-400 hover:text-gray-500">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <form method="POST" action="" class="p-6 space-y-4">
                <input type="hidden" name="action" value="create_position">
                
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Position Name</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-sitemap text-gray-400"></i>
                        </div>
                        <input type="text" name="description" id="description" 
                               class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" 
                               placeholder="Enter position name (e.g. President)" required>
                    </div>
                </div>
                
                <div>
                    <label for="max_vote" class="block text-sm font-medium text-gray-700 mb-1">Maximum Votes Allowed</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-check-double text-gray-400"></i>
                        </div>
                        <input type="number" name="max_vote" id="max_vote" min="1" value="1"
                               class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" 
                               placeholder="Enter maximum votes" required>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">Number of candidates a voter can select for this position</p>
                </div>
                
                <div class="pt-2 flex justify-end space-x-3">
                    <button type="button" onclick="closeAddModal()" 
                            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Cancel
                    </button>
                    <button type="submit" 
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <i class="fas fa-save mr-2"></i> Save Position
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Edit Position Modal -->
    <div id="editModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900 flex items-center">
                    <i class="fas fa-edit text-primary-500 mr-2"></i>
                    Edit Position
                </h3>
                <button type="button" onclick="closeEditModal()" class="text-gray-400 hover:text-gray-500">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <form method="POST" action="" class="p-6 space-y-4">
                <input type="hidden" name="action" value="update_position">
                <input type="hidden" name="id" id="editPositionId">
                
                <div>
                    <label for="editDescription" class="block text-sm font-medium text-gray-700 mb-1">Position Name</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-sitemap text-gray-400"></i>
                        </div>
                        <input type="text" name="description" id="editDescription" 
                               class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" 
                               placeholder="Enter position name (e.g. President)" required>
                    </div>
                </div>
                
                <div>
                    <label for="editMaxVote" class="block text-sm font-medium text-gray-700 mb-1">Maximum Votes Allowed</label>
                    <div class="relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-check-double text-gray-400"></i>
                        </div>
                        <input type="number" name="max_vote" id="editMaxVote" min="1"
                               class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" 
                               placeholder="Enter maximum votes" required>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">Number of candidates a voter can select for this position</p>
                </div>
                
                <div class="pt-2 flex justify-end space-x-3">
                    <button type="button" onclick="closeEditModal()" 
                            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Cancel
                    </button>
                    <button type="submit" 
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <i class="fas fa-save mr-2"></i> Update Position
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
                    Confirm Deletion
                </h3>
                <button type="button" onclick="closeDeleteModal()" class="text-gray-400 hover:text-gray-500">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="p-6">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <i class="fas fa-exclamation-triangle text-red-600"></i>
                </div>
                <div class="text-center">
                    <h3 class="text-lg font-medium text-gray-900">Delete Position</h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                            Are you sure you want to delete the position: <strong id="positionToDelete"></strong>? This action cannot be undone.
                        </p>
                    </div>
                </div>
                
                <form method="POST" action="" class="mt-6">
                    <input type="hidden" name="action" value="delete_position">
                    <input type="hidden" name="id" id="deletePositionId">
                    
                    <div class="flex justify-center space-x-3">
                        <button type="button" onclick="closeDeleteModal()" 
                                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Cancel
                        </button>
                        <button type="submit" 
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <i class="fas fa-trash-alt mr-2"></i> Delete Position
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
            document.getElementById('description').focus();
        }

        function closeAddModal() {
            document.getElementById('addModal').classList.add('hidden');
        }

        function openEditModal(id, description, maxVote) {
            document.getElementById('editPositionId').value = id;
            document.getElementById('editDescription').value = description;
            document.getElementById('editMaxVote').value = maxVote;
            document.getElementById('editModal').classList.remove('hidden');
            document.getElementById('editDescription').focus();
        }

        function closeEditModal() {
            document.getElementById('editModal').classList.add('hidden');
        }

        function openDeleteModal(id, description) {
            document.getElementById('deletePositionId').value = id;
            document.getElementById('positionToDelete').textContent = description;
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
                text: 'You need to create at least one position first.',
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
