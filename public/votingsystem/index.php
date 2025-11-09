<?php
session_start();
if (isset($_SESSION['admin'])) {
    header('location: admin/home.php');
}
?>
<?php include 'includes/header.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mindoro State University Online Voting System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'brand-green': {
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
                    fontSize: {
                        '2xl': '1.65rem',
                        '3xl': '1.875rem',
                        '4xl': '2.25rem',
                        '5xl': '3rem',
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        /* Smooth background transition styling */
        .slideshow-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }
        
        .slideshow-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 1.5s ease-in-out;
        }
        
        .slideshow-item.active {
            opacity: 1;
        }
        
        /* Navigation arrows */
        .slideshow-nav {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            z-index: 100;
            width: 100%;
            pointer-events: none;
        }
        
        .slideshow-nav button {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            pointer-events: auto;
        }
        
        .slideshow-nav button:hover {
            background-color: rgba(34, 197, 94, 0.6);
            transform: scale(1.1);
        }
        
        .slideshow-nav .prev-btn {
            left: 20px;
        }
        
        .slideshow-nav .next-btn {
            right: 20px;
        }
        
        /* Enhanced glass effect */
        .glass-effect {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            border: 3px solid rgba(34, 197, 94, 0.3);
            border-radius: 24px;
            animation: fadeIn 0.8s ease-in-out;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .glass-effect:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hover-scale {
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .hover-scale:hover {
            transform: scale(1.03);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .login-btn {
            background: linear-gradient(45deg, #166534, #22c55e);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 17px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        }

        .login-btn:hover {
            background: linear-gradient(45deg, #14532d, #16a34a);
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(34, 197, 94, 0.4);
        }

        .card-glow {
            position: relative;
            overflow: hidden;
        }
        
        .card-glow::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(
                circle at center,
                rgba(34, 197, 94, 0.1) 0%,
                rgba(255, 255, 255, 0) 70%
            );
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
        }
        
        .card-glow:hover::before {
            opacity: 1;
        }

        .bounce {
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-20px);}
            60% {transform: translateY(-10px);}
        }

        /* Floating shapes */
        .shape {
            position: absolute;
            background: rgba(255, 255, 255, 0.12);
            border-radius: 50%;
            backdrop-filter: blur(5px);
            z-index: 1;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .shape-1 {
            width: 180px;
            height: 180px;
            top: 15%;
            left: 10%;
            animation: float 8s infinite ease-in-out;
        }
        
        .shape-2 {
            width: 100px;
            height: 100px;
            bottom: 20%;
            right: 15%;
            animation: float 6s infinite ease-in-out;
            animation-delay: 1s;
        }
        
        .shape-3 {
            width: 120px;
            height: 120px;
            bottom: 30%;
            left: 25%;
            animation: float 7s infinite ease-in-out;
            animation-delay: 2s;
        }
        
        .shape-4 {
            width: 80px;
            height: 80px;
            top: 30%;
            right: 25%;
            animation: float 5s infinite ease-in-out;
            animation-delay: 1.5s;
        }

        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }

        @media (max-width: 768px) {
            .sm-text-larger {
                font-size: 1.4rem !important;
            }
            .sm-p-larger {
                padding: 2rem !important;
            }
            .sm-input-large {
                font-size: 1.4rem !important;
                padding-top: 1.5rem !important;
                padding-bottom: 1.5rem !important;
            }
            .slideshow-nav button {
                width: 40px;
                height: 40px;
            }
            .slideshow-nav .prev-btn {
                left: 10px;
            }
            .slideshow-nav .next-btn {
                right: 10px;
            }
            .shape {
                display: none; /* Hide floating shapes on mobile */
            }
        }
        
        input::placeholder {
            font-size: 1.3rem;
            color: #9ca3af;
        }
        
        /* Enhanced input focus effect */
        .focus-effect {
            transition: all 0.3s ease;
        }
        
        .focus-effect:focus {
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
            border-color: #22c55e;
            background-color: white;
            outline: none;
        }
        
        /* Progress indicator */
        .slideshow-progress {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            z-index: 100;
        }
        
        .slideshow-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .slideshow-indicator.active {
            background-color: #22c55e;
            transform: scale(1.2);
        }

        .error-message {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
            color: #b91c1c;
            padding: 14px;
            margin-top: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            font-size: 14px;
            display: flex;
            align-items: center;
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .error-message i {
            margin-right: 10px;
            font-size: 18px;
        }

        .logo-wrapper {
            background: linear-gradient(45deg, #166534, #22c55e);
            padding: 30px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
        }
    </style>
</head>
<body class="flex flex-col relative">
    <!-- Decorative floating shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
    <div class="shape shape-4"></div>
    
    <!-- Smooth background slideshow -->
    <div class="slideshow-container">
        <div class="slideshow-item" style="background-image: url('pics/bg1.jpg');"></div>
        <div class="slideshow-item" style="background-image: url('pics/bg2.jpg');"></div>
        <div class="slideshow-item" style="background-image: url('pics/bg3.jpg');"></div>
        <div class="slideshow-item" style="background-image: url('pics/bg4.jpg');"></div>
    </div>
    
    <!-- Background navigation arrows -->
    <div class="slideshow-nav">
        <button class="prev-btn" onclick="changeSlide(-1)">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="next-btn" onclick="changeSlide(1)">
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>
    
    <!-- Background indicators -->
    <div class="slideshow-progress">
        <span class="slideshow-indicator" onclick="goToSlide(0)"></span>
        <span class="slideshow-indicator" onclick="goToSlide(1)"></span>
        <span class="slideshow-indicator" onclick="goToSlide(2)"></span>
        <span class="slideshow-indicator" onclick="goToSlide(3)"></span>
    </div>
    
    <!-- Animated particles background -->
    <div class="absolute inset-0 z-0 opacity-15">
        <div id="particles-js"></div>
    </div>
    
    <!-- Back to Dashboard Button -->
    <div class="fixed top-6 left-6 z-50">
        <a href="/" class="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-brand-green-700 rounded-full shadow-lg hover:bg-brand-green-700 hover:text-white transition-all duration-300 border-2 border-brand-green-200 hover:border-brand-green-700 group">
            <i class="fas fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
            <span class="font-semibold">Back to Dashboard</span>
        </a>
    </div>

    <!-- Login Section - Full Height First View -->
    <section class="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12">
        <!-- Login Container -->
        <div class="glass-effect w-full max-w-2xl overflow-hidden z-10 card-glow">
            <!-- Logo Header -->
            <div class="logo-wrapper">
                <div class="flex items-center gap-6">
                    <img src="pics/logo.png" alt="University Logo" class="w-24 h-24 object-contain">
                    <div>
                        <h1 class="text-5xl font-bold text-white">Votesys.Online</h1>
                        <p class="text-white text-xl mt-2">Secure Electronic Voting System</p>
                    </div>
                </div>
            </div>
            
            <!-- Login Form -->
            <div class="p-10 sm-p-larger">
                <h2 class="text-3xl text-brand-green-800 font-bold mb-8 text-center">Sign in to start your session</h2>
                
                <form action="process.php" method="POST" class="space-y-8">
                    <div class="relative">
                        <i class="fas fa-user absolute left-5 top-1/2 transform -translate-y-1/2 text-brand-green-600 text-2xl"></i>
                        <input type="text" class="pl-14 w-full py-5 bg-white border-2 border-brand-green-200 rounded-xl text-gray-800 text-xl sm-input-large shadow-md focus-effect" name="voter" placeholder="Enter Voter's ID" required>
                    </div>
                    
                    <button type="submit" class="w-full login-btn py-5 flex items-center justify-center gap-3 text-xl" name="login">
                        <i class="fas fa-sign-in-alt"></i>
                        <span>Sign In</span>
                    </button>
                </form>
                
                <?php
                    if (isset($_SESSION['error'])) {
                        echo "
                            <div class='error-message'>
                                <i class='fas fa-exclamation-circle'></i>
                                <p class='font-medium'>" . $_SESSION['error'] . "</p>
                            </div>
                        ";
                        unset($_SESSION['error']);
                    }
                ?>
                
                <p class="mt-8 text-center text-gray-700 text-xl">
                    Manage an Election 
                    <a href="admin.php" class="text-brand-green-700 hover:text-brand-green-600 transition-all font-bold">Click here</a>.
                </p>
                
                <!-- Steps Panel -->
                <div class="mt-8 bg-brand-green-50 p-6 rounded-xl border border-brand-green-200 shadow-sm">
                    <h3 class="text-2xl font-semibold text-brand-green-800 mb-4 flex items-center gap-2">
                        <i class="fas fa-info-circle text-brand-green-600"></i>
                        <span>Steps for Voters:</span>
                    </h3>
                    <ul class="text-gray-700 space-y-3 text-lg list-disc pl-6 sm-text-larger">
                        <li>Input the given Voter's ID code</li>
                        <li>Click "Sign In" to verify your identity</li>
                    </ul>
                </div>
                
                <p class="mt-6 text-center text-gray-700">
                    If you want to create your own election, please 
                    <a href="https://www.facebook.com/kianr873" class="text-brand-green-700 hover:text-brand-green-600 font-bold hover:underline">contact us</a>.
                </p>
            </div>
        </div>
        
        <!-- Scroll indicator -->
        <div class="mt-10 text-center animate-bounce">
            <p class="text-white text-lg font-medium mb-3 bg-brand-green-700/70 py-2 px-4 rounded-full backdrop-blur-sm">Scroll to learn more</p>
            <i class="fas fa-chevron-down text-white text-2xl drop-shadow-lg"></i>
        </div>
    </section>

    
   <!-- Team Section -->
<section class="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-gradient-to-b from-brand-green-900/30 to-transparent">
    <div class="glass-effect w-full max-w-7xl p-10 z-10 card-glow">
        <h2 class="text-3xl md:text-4xl font-bold text-brand-green-800 mb-10 text-center">
            <i class="fas fa-users text-brand-green-600 mr-3"></i>
            Meet Our Development Team
        </h2>

        <!-- Team Lead -->
        <h3 class="text-2xl font-bold text-brand-green-800 mb-6 flex items-center">
            <i class="fas fa-star text-brand-green-600 mr-2"></i> Team Lead
        </h3>
        <div class="bg-white/90 p-8 rounded-xl mb-10 hover-scale border-2 border-brand-green-200 shadow-lg">
            <div class="flex flex-col md:flex-row gap-8 items-center">
                <img src="pics/3.jpg" alt="Kian A. Rodriguez" class="w-48 h-48 object-cover rounded-full border-4 border-brand-green-200">
                <div>
                    <h4 class="text-2xl font-bold text-brand-green-800">Kian A. Rodriguez</h4>
                    <p class="text-brand-green-600 font-medium text-lg mb-4">Project Lead & Full-stack Developer</p>
                </div>
            </div>
        </div>

        <!-- Development Teams -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Frontend Team -->
            <div class="bg-white/90 p-8 rounded-xl hover-scale border-2 border-brand-green-200 shadow-lg">
                <div class="flex items-center gap-4 mb-5">
                    <div class="p-4 bg-brand-green-100 text-brand-green-700 rounded-full">
                        <i class="fas fa-laptop-code text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-brand-green-800 text-2xl">Frontend Team</h3>
                </div>
                <ul class="space-y-4">
                    <li class="flex items-center gap-4">
                        <img src="pics/1.jpg" alt="Princess Devilla" class="w-12 h-12 rounded-full object-cover">
                        <div>
                            <h5 class="font-semibold text-brand-green-800">Princess Devilla</h5>
                            <p class="text-gray-700">Frontend Developer</p>
                        </div>
                    </li>
                    <li class="flex items-center gap-4">
                        <img src="pics/4.jpg" alt="Francis Romero" class="w-12 h-12 rounded-full object-cover">
                        <div>
                            <h5 class="font-semibold text-brand-green-800">Francis Romero</h5>
                            <p class="text-gray-700">Frontend Developer</p>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Backend Team -->
            <div class="bg-white/90 p-8 rounded-xl hover-scale border-2 border-brand-green-200 shadow-lg">
                <div class="flex items-center gap-4 mb-5">
                    <div class="p-4 bg-brand-green-100 text-brand-green-700 rounded-full">
                        <i class="fas fa-database text-2xl"></i>
                    </div>
                    <h3 class="font-bold text-brand-green-800 text-2xl">Backend Team</h3>
                </div>
                <ul class="space-y-4">
                    <li class="flex items-center gap-4">
                        <img src="pics/2.jpg" alt="Alpha Mae Valdez" class="w-12 h-12 rounded-full object-cover">
                        <div>
                            <h5 class="font-semibold text-brand-green-800">Alpha Mae Valdez</h5>
                            <p class="text-gray-700">Backend Developer</p>
                        </div>
                    </li>
                    <li class="flex items-center gap-4">
                        <img src="pics/5.jpg" alt="Joan Manzano" class="w-12 h-12 rounded-full object-cover">
                        <div>
                            <h5 class="font-semibold text-brand-green-800">Joan Manzano</h5>
                            <p class="text-gray-700">Backend Developer</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Technologies -->
        <div class="mt-10 p-8 bg-white/90 rounded-xl border-2 border-brand-green-200 shadow-lg">
            <h3 class="text-2xl font-bold text-brand-green-800 mb-6 flex items-center">
                <i class="fas fa-code text-brand-green-600 mr-2"></i> Technologies Used
            </h3>
            <div class="flex flex-wrap gap-4 justify-center">
                <span class="px-4 py-2 bg-brand-green-50 text-brand-green-700 rounded-lg border border-brand-green-200 flex items-center gap-2">
                    <i class="fab fa-php"></i> PHP
                </span>
                <span class="px-4 py-2 bg-brand-green-50 text-brand-green-700 rounded-lg border border-brand-green-200 flex items-center gap-2">
                    <i class="fas fa-database"></i> MySQL
                </span>
                <span class="px-4 py-2 bg-brand-green-50 text-brand-green-700 rounded-lg border border-brand-green-200 flex items-center gap-2">
                    <i class="fab fa-html5"></i> HTML5
                </span>
                <span class="px-4 py-2 bg-brand-green-50 text-brand-green-700 rounded-lg border border-brand-green-200 flex items-center gap-2">
                    <i class="fab fa-css3-alt"></i> CSS3
                </span>
                <span class="px-4 py-2 bg-brand-green-50 text-brand-green-700 rounded-lg border border-brand-green-200 flex items-center gap-2">
                    <i class="fab fa-js"></i> JavaScript
                </span>
                <span class="px-4 py-2 bg-brand-green-50 text-brand-green-700 rounded-lg border border-brand-green-200 flex items-center gap-2">
                    <i class="fab fa-bootstrap"></i> Bootstrap
                </span>
                <span class="px-4 py-2 bg-brand-green-50 text-brand-green-700 rounded-lg border border-brand-green-200 flex items-center gap-2">
                    <i class="fas fa-chart-bar"></i> Chart.js
                </span>
                <span class="px-4 py-2 bg-brand-green-50 text-brand-green-700 rounded-lg border border-brand-green-200 flex items-center gap-2">
                    <i class="fas fa-lock"></i> Encryption
                </span>
                <span class="px-4 py-2 bg-brand-green-50 text-brand-green-700 rounded-lg border border-brand-green-200 flex items-center gap-2">
                    <i class="fas fa-wind"></i> TailwindCSS
                </span>
            </div>
        </div>

        <!-- Faculty Advisor -->
        <div class="mt-10">
            <h3 class="text-2xl font-bold text-brand-green-800 mb-6 flex items-center">
                <i class="fas fa-chalkboard-teacher text-brand-green-600 mr-2"></i> Faculty Advisor
            </h3>
            <div class="flex gap-4 bg-white/90 p-6 rounded-xl border-2 border-brand-green-200 shadow-lg hover-scale">
                <img src="pics/6.jpg" alt="Sir Uriel Melendrez" class="w-16 h-16 rounded-full object-cover">
                <div>
                    <h4 class="text-xl font-bold text-brand-green-800">Sir Uriel Melendres</h4>
                    <p class="text-brand-green-600">Faculty Advisor</p>
                    <p class="text-gray-700 text-sm mt-1">College of Computer Studies - Minsu Bongabong Campus</p>
                </div>
            </div>
        </div>
    </div>
</section>
    
    <!-- About System Section -->
    <section class="min-h-screen w-full flex items-center justify-center px-6 py-20 bg-gradient-to-b from-transparent to-brand-green-900/30">
        <div class="glass-effect w-full max-w-7xl p-10 z-10 card-glow">
            <h2 class="text-3xl md:text-4xl font-bold text-brand-green-800 mb-10 text-center">
                <i class="fas fa-vote-yea text-brand-green-600 mr-3"></i>
                About Our Voting System
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white/90 p-8 rounded-xl hover-scale border-2 border-brand-green-200 shadow-lg">
                    <div class="flex items-center gap-4 mb-5">
                        <div class="p-4 bg-brand-green-100 text-brand-green-700 rounded-full">
                            <i class="fas fa-shield-alt text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-brand-green-800 text-2xl">Secure & Reliable</h3>
                    </div>
                    <p class="text-gray-700 text-lg sm-text-larger leading-relaxed">End-to-end encrypted voting platform ensuring data integrity and voter privacy. Designed to prevent fraud and maintain election integrity at every step of the process.</p>
                </div>
                
                <div class="bg-white/90 p-8 rounded-xl hover-scale border-2 border-brand-green-200 shadow-lg">
                    <div class="flex items-center gap-4 mb-5">
                        <div class="p-4 bg-brand-green-100 text-brand-green-700 rounded-full">
                            <i class="fas fa-chart-bar text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-brand-green-800 text-2xl">Real-time Results</h3>
                    </div>
                    <p class="text-gray-700 text-lg sm-text-larger leading-relaxed">Instant vote counting and result generation after polls close. Detailed analytics and visualization tools for comprehensive election insights and transparent reporting.</p>
                </div>
                
                <div class="bg-white/90 p-8 rounded-xl hover-scale border-2 border-brand-green-200 shadow-lg">
                    <div class="flex items-center gap-4 mb-5">
                        <div class="p-4 bg-brand-green-100 text-brand-green-700 rounded-full">
                            <i class="fas fa-mobile-alt text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-brand-green-800 text-2xl">Accessible Anywhere</h3>
                    </div>
                    <p class="text-gray-700 text-lg sm-text-larger leading-relaxed">Mobile-responsive design allows voting from any device. Streamlined interface ensures easy voting process for all users regardless of technical expertise or device type.</p>
                </div>
            </div>
            
            <div class="mt-10 text-center">
                <p class="text-gray-700 text-lg">
                    © 2025 Votesys.Online - Developed for educational institutions and organizations
                </p>
            </div>
        </div>
    </section>


    <!-- Add particles.js -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <script>
        // Particles.js configuration
        particlesJS("particles-js", {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: "#22c55e" },
                shape: { type: "circle" },
                opacity: { value: 0.6, random: true },
                size: { value: 4, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#16a34a",
                    opacity: 0.5,
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
            },
            retina_detect: true
        });
        
        // Background slideshow functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slideshow-item');
        const indicators = document.querySelectorAll('.slideshow-indicator');
        const totalSlides = slides.length;
        
        // Initialize slideshow
        function initSlideshow() {
            slides[0].classList.add('active');
            indicators[0].classList.add('active');
            
            // Auto advance slideshow
            setInterval(() => {
                changeSlide(1);
            }, 6000); // Change slide every 6 seconds
        }
        
        // Change slide by offset
        function changeSlide(direction) {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }
        
        // Go to specific slide
        function goToSlide(slideIndex) {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            currentSlide = slideIndex;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }
        
        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', initSlideshow);
    </script>

    <?php include 'includes/scripts.php' ?>
</body>
</html>
