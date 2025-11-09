<?php
session_start();
include 'includes/conn.php';

// Clear success message at the start of the script
if (!isset($_POST['register'])) {
    unset($_SESSION['success']);
}

// Check if voter session is set
if (!isset($_SESSION['voter']) || !isset($_SESSION['election_id'])) {
    $_SESSION['error'] = 'Unauthorized access!';
    header('Location: index.php');
    exit();
}

$voter_id = $_SESSION['voter'];
$election_id = $_SESSION['election_id'];

// Get election name for the current election
$election_stmt = $conn->prepare("SELECT name FROM elections WHERE id = ?");
$election_stmt->bind_param("i", $election_id);
$election_stmt->execute();
$election_result = $election_stmt->get_result();
$election_name = "";
if ($election_row = $election_result->fetch_assoc()) {
    $election_name = $election_row['name'];
}
$election_stmt->close();

// Check if voter is already registered for this specific election
$stmt = $conn->prepare("SELECT * FROM students WHERE voters_id = ? AND election_id = ?");
$stmt->bind_param("si", $voter_id, $election_id);
$stmt->execute();
$result = $stmt->get_result();

// If voter is found in current election, redirect to home.php
if ($result->num_rows > 0) {
    header('Location: home.php');
    exit();
}

// Fetch courses for dropdown
$courses_query = "SELECT * FROM courses";
$courses_result = $conn->query($courses_query);

// If form is submitted
if (isset($_POST['register'])) {
    $name = trim($_POST['name']);
    $year_section = trim($_POST['year_section']);
    $course = trim($_POST['course']);
    $student_id = trim($_POST['student_id']);

    // Check if the student has already registered for this specific election
    $stmt = $conn->prepare("SELECT * FROM students WHERE (name = ? OR student_id = ?) AND election_id = ?");
    $stmt->bind_param("ssi", $name, $student_id, $election_id);
    $stmt->execute();
    $name_result = $stmt->get_result();

    if ($name_result->num_rows > 0) {
        $_SESSION['error'] = 'This student has already registered for this election.';
        header('Location: verification.php');
        exit();
    }

    // Insert voter details into students table with election_id and election_name
    $stmt = $conn->prepare("INSERT INTO students (voters_id, student_id, name, year_section, course, election_id, election_name) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssis", $voter_id, $student_id, $name, $year_section, $course, $election_id, $election_name);

    if ($stmt->execute()) {
        $_SESSION['success'] = 'Registration successful!';
        header('Location: home.php');
        exit();
    } else {
        $_SESSION['error'] = 'Registration failed!';
    }
    $stmt->close();
    header('Location: verification.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Verification | SIR-U</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script defer src="https://unpkg.com/alpinejs@3.10.3/dist/cdn.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
            font-family: 'Poppins', sans-serif;
        }
        .form-input {
            transition: all 0.3s ease;
        }
        .form-input:focus {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center p-4">

<div class="w-full max-w-md" x-data="{ formActive: true }">
    <div class="bg-white rounded-xl overflow-hidden shadow-xl">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
            <div class="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <i class="fas fa-user-check text-white text-2xl"></i>
            </div>
            <h2 class="text-2xl font-bold text-white">Student Verification</h2>
            <p class="text-green-100 text-sm mt-1">Please complete your registration</p>
        </div>

        <!-- Notifications -->
        <div class="p-6">
            <?php if (isset($_SESSION['error'])): ?>
                <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md flex items-start" 
                     x-data="{ show: true }" 
                     x-show="show"
                     x-transition>
                    <div class="text-red-500 mr-3">
                        <i class="fas fa-exclamation-circle text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <p class="font-medium text-red-800">Error</p>
                        <p class="text-red-700 text-sm"><?= $_SESSION['error']; unset($_SESSION['error']); ?></p>
                    </div>
                    <button @click="show = false" class="text-red-400 hover:text-red-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            <?php endif; ?>

            <?php if (isset($_SESSION['success'])): ?>
                <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md flex items-start"
                     x-data="{ show: true }" 
                     x-show="show"
                     x-transition>
                    <div class="text-green-500 mr-3">
                        <i class="fas fa-check-circle text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <p class="font-medium text-green-800">Success</p>
                        <p class="text-green-700 text-sm"><?= $_SESSION['success']; unset($_SESSION['success']); ?></p>
                    </div>
                    <button @click="show = false" class="text-green-400 hover:text-green-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            <?php endif; ?>

            <!-- Form -->
            <form method="POST" action="" class="space-y-5" x-show="formActive">
                <div class="space-y-1">
                    <label for="name" class="block text-gray-700 font-medium text-sm">Full Name</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <i class="fas fa-user"></i>
                        </span>
                        <input type="text" id="name" name="name" placeholder="Lastname, Firstname M." 
                               class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/50 form-input" required>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Format: Lastname, Firstname Middle Initial</p>
                </div>
                
                <div class="space-y-1">
                    <label for="student_id" class="block text-gray-700 font-medium text-sm">Student ID</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <i class="fas fa-id-card"></i>
                        </span>
                        <input type="text" id="student_id" name="student_id" placeholder="e.g. mbc2022-0197" 
                               class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/50 form-input" required>
                    </div>
                </div>
                
                <div class="space-y-1">
                    <label for="course" class="block text-gray-700 font-medium text-sm">Course</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <i class="fas fa-book"></i>
                        </span>
                        <select id="course" name="course" 
                                class="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/50 appearance-none form-input" required>
                            <option value="" disabled selected>Select Course</option>
                            <option value="BSIT">BSIT</option>
                            <option value="BSHM">BSHM</option>
                            <option value="BSTM">BSTM</option>
                            <option value="BSENTREP">BSENTREP</option>
                            <option value="BSCRIM">BSCRIM</option>
                            <option value="BSED">BSED</option>
                            <option value="BEED">BEED</option>
                            <option value="BSCPE">BSCPE</option>
                            <option value="BSFI">BSFI</option>
                            <option value="ABPOLSCI">ABPOLSCI</option>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-none">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                </div>
                
                <div class="space-y-1">
                    <label for="year_section" class="block text-gray-700 font-medium text-sm">Year Level</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <i class="fas fa-layer-group"></i>
                        </span>
                        <select id="year_section" name="year_section" 
                                class="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/50 appearance-none form-input" required>
                            <option value="" disabled selected>Select Year Level</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-none">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                </div>
                
                <button type="submit" name="register" 
                        class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1">
                    <i class="fas fa-check-circle"></i>
                    <span>Complete Registration</span>
                </button>
            </form>

            <div class="text-center mt-6">
                <a href="index.php" class="inline-flex items-center text-gray-600 hover:text-green-600 font-medium transition-colors">
                    <i class="fas fa-arrow-left mr-2"></i> Back to Home
                </a>
            </div>
        </div>
    </div>
    
    <div class="text-center mt-4 text-gray-500 text-xs">
        <p>© <?= date('Y') ?> SIR-U Election System</p>
    </div>
</div>

<script>
    // Add form validation feedback
    document.querySelector('form').addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const yearSection = document.getElementById('year_section').value;
        const course = document.getElementById('course').value;
        const studentId = document.getElementById('student_id').value.trim();
        
        if (!name || !yearSection || !course || !studentId) {
            e.preventDefault();
            alert('Please fill in all required fields');
        } else if (!/^[a-zA-Z0-9]+-\d+$/.test(studentId)) {
            e.preventDefault();
            alert('Please enter a valid student ID format (e.g. mbc2022-0197)');
        }
    });
</script>

</body>
</html>