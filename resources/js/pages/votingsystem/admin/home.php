<?php
include 'includes/session.php';
include 'includes/header.php';
?>
<body class="hold-transition skin-green sidebar-mini">
<div class="wrapper">
    <?php include 'includes/navbar.php'; ?>
    <?php include 'includes/menubar1.php'; ?>

    <div class="content-wrapper" style="background-color: #f8faf8;">
        <section class="content-header text-center" style="padding: 30px 0 20px;">
            <h1 style="color: #046a0f; font-weight: 700; margin-bottom: 15px; font-size: 32px;">Welcome to the Student Voting System</h1>
            <div style="max-width: 700px; margin: 0 auto;">
                <p style="color: #388e3c; font-size: 18px; margin-bottom: 10px;">Select an option below to get started</p>
                <p style="color: #388e3c; font-size: 16px;">Manage courses, view elections, and handle student feedbacks efficiently.</p>
            </div>
        </section>

        <section class="content" style="padding-top: 10px; padding-bottom: 40px;">
            <div class="container">
                <div class="row justify-content-center">
                    <!-- Elections -->
                    <div class="col-lg-4 col-md-6 mb-4">
                        <a href="sub_admins.php" class="text-decoration-none">
                            <div class="info-box" style="background: white; border-left: 5px solid #046a0f; padding: 25px 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                                <span class="info-box-icon" style="font-size: 42px; color: #046a0f;">
                                    <i class="fa fa-check-square-o"></i>
                                </span>
                                <div class="info-box-content">
                                    <h3 style="color: #035a0d; font-size: 22px; font-weight: 600; margin-bottom: 10px;">Elections</h3>
                                    <p style="color: #555; font-size: 15px;">View and manage ongoing elections</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <!-- Students -->
                    <div class="col-lg-4 col-md-6 mb-4">
                        <a href="students.php" class="text-decoration-none">
                            <div class="info-box" style="background: white; border-left: 5px solid #046a0f; padding: 25px 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                                <span class="info-box-icon" style="font-size: 42px; color: #046a0f;">
                                    <i class="fa fa-users"></i>
                                </span>
                                <div class="info-box-content">
                                    <h3 style="color: #035a0d; font-size: 22px; font-weight: 600; margin-bottom: 10px;">Students</h3>
                                    <p style="color: #555; font-size: 15px;">Manage student accounts and voters</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <!-- History -->
                    <div class="col-lg-4 col-md-6 mb-4">
                        <a href="history.php" class="text-decoration-none">
                            <div class="info-box" style="background: white; border-left: 5px solid #046a0f; padding: 25px 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                                <span class="info-box-icon" style="font-size: 42px; color: #046a0f;">
                                    <i class="fa fa-history"></i>
                                </span>
                                <div class="info-box-content">
                                    <h3 style="color: #035a0d; font-size: 22px; font-weight: 600; margin-bottom: 10px;">History</h3>
                                    <p style="color: #555; font-size: 15px;">View past election results</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <!-- Feedbacks -->
                    <div class="col-lg-4 col-md-6 mb-4">
                        <a href="feedback.php" class="text-decoration-none">
                            <div class="info-box" style="background: white; border-left: 5px solid #046a0f; padding: 25px 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                                <span class="info-box-icon" style="font-size: 42px; color: #046a0f;">
                                    <i class="fa fa-comments"></i>
                                </span>
                                <div class="info-box-content">
                                    <h3 style="color: #035a0d; font-size: 22px; font-weight: 600; margin-bottom: 10px;">Feedbacks</h3>
                                    <p style="color: #555; font-size: 15px;">View student feedbacks and suggestions</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <?php include 'includes/footer.php'; ?>
</div>

<style>
.info-box {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.info-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    border-left-width: 8px;
}
.info-box:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #046a0f;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.info-box:hover:after {
    opacity: 1;
}
.text-decoration-none {
    text-decoration: none !important;
}
.info-box-content {
    margin-left: 60px;
}
.info-box-icon {
    position: absolute;
    transition: transform 0.3s ease;
}
.info-box:hover .info-box-icon {
    transform: scale(1.1);
}
</style>

<?php include 'includes/scripts.php'; ?>
</body>
</html>
