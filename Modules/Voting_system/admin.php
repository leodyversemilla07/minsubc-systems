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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
            padding: 15px;
            animation: slideshow 12s infinite linear;
        }

        @keyframes slideshow {
            0% { background-image: url('pics/bg1.jpg'); }
            24% { background-image: url('pics/bg1.jpg'); }
            25% { background-image: url('pics/bg2.jpg'); }
            49% { background-image: url('pics/bg2.jpg'); }
            50% { background-image: url('pics/bg3.jpg'); }
            74% { background-image: url('pics/bg3.jpg'); }
            75% { background-image: url('pics/bg4.jpg'); }
            100% { background-image: url('pics/bg4.jpg'); }
        }

        .login-box {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            padding: 35px 30px;
            border-radius: 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 100%;
            max-width: 450px;
            border: 3px solid rgba(34, 197, 94, 0.3);
            animation: fadeIn 0.8s ease-in-out;
            color: #333;
            transition: transform 0.3s, box-shadow 0.3s;
            margin: 10px auto;
        }

        .login-box:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .logo-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 25px;
        }

        .logo-container img {
            max-width: 80px;
            margin-right: 15px;
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
            animation: pulse 3s infinite alternate;
        }

        @keyframes pulse {
            from { transform: scale(1); }
            to { transform: scale(1.08); }
        }

        .logo-container .votesys {
            font-size: 2.2em;
            font-weight: bold;
            color: #166534;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .login-box-body {
            margin-top: 20px;
        }

        .login-box-msg {
            margin: 0 0 20px;
            padding: 8px 0;
            font-size: 1.4em;
            font-weight: 600;
            color: #166534;
        }

        .admin-buttons {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin: 25px 0;
        }

        .btn {
            padding: 14px 18px;
            border: none;
            border-radius: 12px;
            font-size: 1.2em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            gap: 10px;
        }

        .btn-admin {
            background: linear-gradient(45deg, #166534, #22c55e);
            color: white;
            width: 48%;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        }

        .btn-subadmin {
            background: linear-gradient(45deg, #15803d, #4ade80);
            color: white;
            width: 48%;
            box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
        }

        .btn:hover {
            transform: translateY(-3px);
        }

        .btn-admin:hover {
            background: linear-gradient(45deg, #14532d, #16a34a);
            box-shadow: 0 7px 20px rgba(34, 197, 94, 0.4);
        }

        .btn-subadmin:hover {
            background: linear-gradient(45deg, #14532d, #16a34a);
            box-shadow: 0 7px 20px rgba(74, 222, 128, 0.4);
        }

        .btn i {
            font-size: 1.2em;
        }

        .callout {
            padding: 14px;
            border-radius: 12px;
            margin-top: 15px;
            margin-bottom: 15px;
            font-weight: 500;
            font-size: 1.1em;
        }

        .callout-danger {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
            color: #b91c1c;
        }

        .mt20 {
            margin-top: 18px;
            font-size: 1.1em;
        }

        .mt20 a {
            color: #16a34a;
            font-weight: bold;
            text-decoration: none;
            transition: all 0.3s;
        }

        .mt20 a:hover {
            color: #166534;
            text-decoration: underline;
        }

        /* Floating shapes */
        .shape {
            position: fixed;
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

        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }

        /* Container wrapper to help with vertical centering */
        .container-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 100vh;
        }

        @media (max-width: 767px) {
            body {
                padding: 15px;
                overflow-y: auto;
                align-items: center;
                justify-content: center;
                height: auto;
            }
            
            .login-box {
                padding: 25px 20px;
                margin: 15px auto;
                max-width: 90%;
            }
            
            .logo-container img {
                max-width: 65px;
            }
            
            .logo-container .votesys {
                font-size: 1.8em;
            }
            
            .admin-buttons {
                gap: 12px;
            }
            
            .btn {
                font-size: 1.1em;
                padding: 14px;
            }
        }

        @media (max-width: 480px) {
            .login-box {
                padding: 22px 18px;
                margin: 0 auto;
            }
            
            .logo-container {
                flex-direction: column;
                gap: 8px;
                margin-bottom: 15px;
            }
            
            .logo-container img {
                max-width: 55px;
                margin-right: 0;
            }
            
            .logo-container .votesys {
                font-size: 1.5em;
            }
            
            .login-box-msg {
                font-size: 1.2em;
                margin-bottom: 15px;
            }
            
            .admin-buttons {
                flex-direction: column;
                gap: 12px;
                margin: 15px 0;
            }
            
            .btn-admin, .btn-subadmin {
                width: 100%;
                padding: 12px;
            }
            
            .mt20 {
                margin-top: 15px;
                font-size: 0.95em;
            }
            
            /* Hide some shapes on very small screens */
            .shape-3, .shape-4 {
                display: none;
            }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Decorative floating shapes -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
    <div class="shape shape-4"></div>

    <div class="container-wrapper">
        <div class="login-box">
            <div class="logo-container">
                <img src="pics/logo.png" alt="University Logo">
                <div class="votesys">Votesys.Online</div>
            </div>
            
            <p class="login-box-msg">Manage an Election</p>
            <div class="admin-buttons">
                <a href="admin/index.php" class="btn btn-admin">
                    <i class="fas fa-user-shield"></i> Admin
                </a>
                <a href="sub/index.php" class="btn btn-subadmin">
                    <i class="fas fa-user-cog"></i> Sub Admin
                </a>
            </div>

            <?php
                if (isset($_SESSION['error'])) {
                    echo "
                        <div class='callout callout-danger text-center'>
                            <p>" . $_SESSION['error'] . "</p>
                        </div>
                    ";
                    unset($_SESSION['error']);
                }
            ?>

            <p class="mt20">Go <a href="index.php">Back to Homepage</a></p>
        </div>
    </div>

    <?php include 'includes/scripts.php' ?>
</body>
</html>