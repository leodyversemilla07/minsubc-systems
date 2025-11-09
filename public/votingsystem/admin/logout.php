<?php
session_start();

// Check if the user confirmed logout
if (isset($_GET['confirm']) && $_GET['confirm'] == 'yes') {
    session_destroy();
    header('location: ../index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Logout</title>
    <!-- SweetAlert2 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .back-button {
            position: absolute;
            top: 20px;
            left: 20px;
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .back-button:hover {
            background-color: #388E3C;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        /* Custom SweetAlert styling */
        .swal2-styled.swal2-confirm {
            background-color: #4CAF50 !important;
        }
        .swal2-styled.swal2-confirm:focus {
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5) !important;
        }
        .swal2-styled.swal2-cancel {
            background-color: #757575 !important;
        }
    </style>
    <!-- SweetAlert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>    
    <script>
        // Show SweetAlert2 modal on page load
        document.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                title: 'Logout Confirmation',
                text: 'Are you sure you want to log out of your account?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, Log Out',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#4CAF50',
                cancelButtonColor: '#757575',
                background: '#fff',
                backdrop: `rgba(0,0,0,0.4)`,
                allowOutsideClick: false,
                customClass: {
                    title: 'swal-title',
                    confirmButton: 'swal-confirm',
                    cancelButton: 'swal-cancel'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Show success message before redirecting
                    Swal.fire({
                        title: 'Logging Out',
                        text: 'You have been successfully logged out',
                        icon: 'success',
                        confirmButtonColor: '#4CAF50',
                        timer: 1500,
                        timerProgressBar: true,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = '?confirm=yes';
                    });
                } else {
                    // Return to previous page
                    window.history.back();
                }
            });
        });
    </script>
</body>
</html>