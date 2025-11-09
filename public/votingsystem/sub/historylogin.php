<?php
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $password = $_POST['password'];

    // Validate the password
    if ($password === "kian1103") {
        // Redirect to history.php if the password is correct
        header("Location: history.php");
        exit();
    } else {
        $error_message = "Invalid password. Please try again.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>History Access Portal</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-image: linear-gradient(135deg, #1e9e6a, #4cd382, #67e796);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }
        
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .login-container {
            width: 420px;
            background: rgba(255, 255, 255, 0.92);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            padding: 45px;
            animation: fadeIn 1s ease-in-out;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .login-container:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 35px;
        }
        
        .login-header h1 {
            background: linear-gradient(45deg, #105c3e, #2e7d32);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }
        
        .login-header p {
            color: #4b5563;
            font-size: 16px;
            font-weight: 500;
        }
        
        .form-group {
            margin-bottom: 28px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 10px;
            color: #374151;
            font-size: 15px;
            font-weight: 600;
        }
        
        .form-control {
            width: 100%;
            padding: 16px;
            background: rgba(255, 255, 255, 0.85);
            border: 2px solid rgba(76, 211, 130, 0.4);
            border-radius: 14px;
            font-size: 16px;
            font-weight: 500;
            color: #1f2937;
            outline: none;
            transition: all 0.3s ease;
        }
        
        .form-control:focus {
            border-color: #2e7d32;
            background: white;
            box-shadow: 0 0 0 5px rgba(76, 211, 130, 0.2);
        }
        
        .submit-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(45deg, #2e7d32, #4caf50);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 17px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .submit-btn:hover {
            background: linear-gradient(45deg, #1b5e20, #43a047);
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(46, 125, 50, 0.4);
        }
        
        .submit-btn i {
            font-size: 18px;
            transition: transform 0.3s ease;
        }
        
        .submit-btn:hover i {
            transform: translateX(4px);
        }
        
        .links {
            display: flex;
            justify-content: space-between;
            margin-top: 25px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .links a {
            color: #2e7d32;
            text-decoration: none;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .links a:hover {
            color: #1b5e20;
            transform: translateX(3px);
        }
        
        .links a:first-child:hover {
            transform: translateX(-3px);
        }
        
        .error-message {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
            color: #b91c1c;
            padding: 14px;
            margin-bottom: 25px;
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
        
        /* Enhanced floating shapes animation */
        .shape {
            position: absolute;
            background: rgba(255, 255, 255, 0.12);
            border-radius: 50%;
            backdrop-filter: blur(5px);
            z-index: -1;
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
        
        /* Enhanced logo animation */
        .logo {
            width: 90px;
            height: 90px;
            margin: 0 auto 25px;
            border-radius: 50%;
            background: linear-gradient(145deg, #ffffff, #f1f1f1);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .logo::before {
            content: '';
            position: absolute;
            width: 150%;
            height: 150%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
            transform: translateX(-100%);
            animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            20% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
        }
        
        .logo i {
            font-size: 42px;
            color: #2e7d32;
            transition: all 0.4s ease;
            z-index: 2;
        }
        
        .logo:hover {
            transform: rotate(5deg) scale(1.05);
            box-shadow: 0 8px 30px rgba(46, 125, 50, 0.25);
        }
        
        .logo:hover i {
            transform: scale(1.15);
        }

        /* Responsive adjustments */
        @media (max-width: 500px) {
            .login-container {
                width: 90%;
                padding: 30px 25px;
            }
            
            .logo {
                width: 80px;
                height: 80px;
            }
            
            .login-header h1 {
                font-size: 26px;
            }
            
            .form-control, .submit-btn {
                padding: 14px;
            }
        }
    </style>
</head>
<body>
    <!-- Decorative floating shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
    <div class="shape shape-4"></div>

    <div class="login-container">
        <div class="login-header">
            <div class="logo">
                <i class="fas fa-history"></i>
            </div>
            <h1>Election History Access</h1>
            <p>Enter password to view election history</p>
        </div>
        
        <?php if (isset($error_message)) : ?>
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <?php echo $error_message; ?>
            </div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="form-group">
                <label for="password">Administrator Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    class="form-control" 
                    placeholder="Enter secure password" 
                    required
                    autocomplete="off"
                >
            </div>
            <button type="submit" class="submit-btn">
                Access History
                <i class="fas fa-unlock"></i>
            </button>
        </form>
        
        <div class="links">
            <a href="index.php">
                <i class="fas fa-arrow-left"></i> Back to Election Access
            </a>
            <a href="../index.php">
                <i class="fas fa-home"></i> Main Page
            </a>
        </div>
    </div>

    <!-- Optional: Add a subtle particle effect with JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const logo = document.querySelector('.logo');
            logo.addEventListener('mouseover', function() {
                this.style.transform = 'rotate(' + (Math.random() * 10 - 5) + 'deg) scale(1.05)';
            });
            logo.addEventListener('mouseout', function() {
                this.style.transform = '';
            });
            
            // Add focus effect on input
            const input = document.querySelector('.form-control');
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
            
            // Add password visibility toggle
            const passwordField = document.getElementById('password');
            const toggleButton = document.createElement('button');
            toggleButton.type = 'button';
            toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
            toggleButton.className = 'absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-700 focus:outline-none';
            toggleButton.style.top = '70%';
            toggleButton.style.right = '15px';
            toggleButton.style.position = 'absolute';
            toggleButton.style.background = 'none';
            toggleButton.style.border = 'none';
            toggleButton.style.cursor = 'pointer';
            
            passwordField.parentElement.style.position = 'relative';
            passwordField.parentElement.appendChild(toggleButton);
            
            toggleButton.addEventListener('click', function() {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    passwordField.type = 'password';
                    this.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
        });
    </script>
</body>
</html>