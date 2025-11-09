<?php
    session_start();
    if(isset($_SESSION['admin'])){
        header('location:home.php');
    }
?>
<?php include 'includes/header.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mindoro State University Online Voting System</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            animation: slideshow 12s infinite linear;
            overflow-x: hidden;
        }

        @keyframes slideshow {
            0% { background-image: url('../pics/bg1.jpg'); }
            24% { background-image: url('../pics/bg1.jpg'); }
            25% { background-image: url('../pics/bg2.jpg'); }
            49% { background-image: url('../pics/bg2.jpg'); }
            50% { background-image: url('../pics/bg3.jpg'); }
            74% { background-image: url('../pics/bg3.jpg'); }
            75% { background-image: url('../pics/bg4.jpg'); }
            100% { background-image: url('../pics/bg4.jpg'); }
        }

        .login-container {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 100%;
            max-width: 480px;
            border: 3px solid rgba(34, 197, 94, 0.3);
            animation: fadeIn 0.8s ease-in-out;
            margin: 80px 20px 20px;
            position: relative;
            z-index: 10;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .login-container:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .logo-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            top: -60px;
            left: 0;
            right: 0;
            padding: 0 20px;
        }

        .logo {
            background: white;
            border-radius: 50%;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            border: 3px solid rgba(34, 197, 94, 0.3);
            overflow: hidden;
            transition: transform 0.3s ease;
        }

        .logo:hover {
            transform: scale(1.05) rotate(5deg);
        }

        .logo img {
            max-width: 70px;
            max-height: 70px;
            object-fit: contain;
        }

        .login-header {
            margin-top: 40px;
            margin-bottom: 30px;
        }

        .login-header h1 {
            background: linear-gradient(45deg, #166534, #22c55e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 28px;
            font-weight: 700;
            line-height: 1.3;
            margin: 0 0 10px;
        }

        .login-box-msg {
            color: #4b5563;
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 25px;
        }

        .form-group {
            position: relative;
            margin-bottom: 25px;
        }

        .form-control {
            width: 100%;
            padding: 16px 20px 16px 50px;
            border: 2px solid rgba(34, 197, 94, 0.3);
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            font-family: 'Poppins', sans-serif;
            color: #1f2937;
            transition: all 0.3s ease;
        }

        .form-control:focus {
            border-color: #22c55e;
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
            background: white;
            outline: none;
        }

        .form-control::placeholder {
            color: #9ca3af;
        }

        .form-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #22c55e;
            font-size: 18px;
        }

        .login-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(45deg, #166534, #22c55e);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 17px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
            margin-bottom: 15px;
        }

        .login-btn:hover {
            background: linear-gradient(45deg, #14532d, #16a34a);
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(34, 197, 94, 0.4);
        }

        .login-btn i {
            font-size: 18px;
        }

        .back-btn {
            width: 100%;
            padding: 14px;
            background: rgba(255, 255, 255, 0.8);
            color: #166534;
            border: 2px solid #22c55e;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 15px;
            text-decoration: none;
        }

        .back-btn:hover {
            background: rgba(34, 197, 94, 0.1);
            transform: translateY(-3px);
        }

        .back-btn i {
            font-size: 16px;
        }

        .error-message {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
            color: #b91c1c;
            padding: 14px;
            margin: 20px 0;
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

        @media (max-width: 767px) {
            .login-container {
                padding: 30px;
                max-width: 90%;
            }
            .logo {
                width: 80px;
                height: 80px;
            }
            .logo img {
                max-width: 55px;
                max-height: 55px;
            }
            .login-header h1 {
                font-size: 22px;
            }
            .form-control {
                padding: 14px 14px 14px 45px;
                font-size: 15px;
            }
        }

        @media (max-width: 480px) {
            .logo-wrapper {
                top: -45px;
            }
            .logo {
                width: 70px;
                height: 70px;
            }
            .logo img {
                max-width: 45px;
                max-height: 45px;
            }
            .login-container {
                padding: 25px 20px;
                margin-top: 60px;
            }
            .login-header h1 {
                font-size: 20px;
            }
            .login-box-msg {
                font-size: 16px;
            }
            .form-control {
                font-size: 14px;
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
        <div class="logo-wrapper">
            <div class="logo">
                <img src="pics/Picture5.jpg" alt="University Logo 1">
            </div>
            <div class="logo">
                <img src="../pics/logo.png" alt="University Logo 2">
            </div>
        </div>
        
        <div class="login-header">
            <h1>Mindoro State University Online Voting System</h1>
            <p class="login-box-msg">Sign in as an administrator</p>
        </div>
        
        <form action="login.php" method="POST">
            <div class="form-group">
                <i class="fas fa-user form-icon"></i>
                <input type="text" class="form-control" name="username" placeholder="Username" required>
            </div>
            <div class="form-group">
                <i class="fas fa-lock form-icon"></i>
                <input type="password" class="form-control" name="password" placeholder="Password" required>
            </div>
            <button type="submit" class="login-btn" name="login">
                <i class="fas fa-sign-in-alt"></i> Sign In as Administrator
            </button>
        </form>
        
        <?php
            if(isset($_SESSION['error'])){
                echo "
                    <div class='error-message'>
                        <i class='fas fa-exclamation-circle'></i>
                        <p>".$_SESSION['error']."</p>
                    </div>
                ";
                unset($_SESSION['error']);
            }
        ?>
        
        <a href="../index.php" class="back-btn">
            <i class="fas fa-arrow-left"></i> Back to Homepage
        </a>
    </div>

    <?php include 'includes/scripts.php' ?>
</body>
</html>