<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Voting System using PHP</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- iCheck for checkboxes and radio inputs -->
    <link rel="stylesheet" href="plugins/iCheck/all.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
        folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">

    <!-- Google Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
    <link rel="stylesheet" href="style.css">

    <style>
        /* Custom Styles */
        .mt20 {
            margin-top: 20px;
        }

        .title {
            font-size: 50px;
            color: #2ecc71; /* Green */
        }

        #candidate_list {
            margin-top: 20px;
        }

        #candidate_list ul {
            list-style-type: none;
        }

        #candidate_list ul li {
            margin: 0 30px 30px 0;
            vertical-align: top;
        }

        .clist {
            margin-left: 20px;
        }

        .cname {
            font-size: 25px;
            color: #27ae60; /* Darker Green */
        }

        .votelist {
            font-size: 17px;
            color: #2ecc71; /* Green */
        }
        
        /* Tailwind CSS customizations */
        .selected-candidate {
            @apply border-4 border-green-500 shadow-lg transition-all duration-200;
        }
        
        .candidate-card {
            @apply rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-200;
        }
        
        .btn-vote {
            @apply bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-200;
        }
        
        .btn-abstain {
            @apply bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full shadow-md transition-all duration-200;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .candidate-grid {
                @apply grid grid-cols-2 gap-2;
            }
        }
    </style>        

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Add SweetAlert2 library -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#70C237',
                        'primary-dark': '#5AA12E',
                    }
                }
            }
        }
    </script>
</head>
