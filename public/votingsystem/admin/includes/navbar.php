<header class="main-header">
  <!-- Logo -->
  <a href="#" class="logo" style="background-color: #035a0d; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.1);">
    <!-- mini logo for sidebar mini 50x50 pixels -->
    <span class="logo-mini" style="font-weight: 700;"><b>S</b>A</span>
    <!-- logo for regular state and mobile devices -->
    <span class="logo-lg" style="font-weight: 700;">Admin</span>
  </a>
  <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top" style="background-color: #046a0f; box-shadow: 0 1px 5px rgba(0,0,0,0.2);">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button" style="color: #fff;">
      <span class="sr-only">Toggle navigation</span>
    </a>

    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <!-- Notifications Menu -->
        <li class="dropdown notifications-menu">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="color: #fff;">
            <i class="fa fa-bell-o"></i>
            <span class="label label-success">0</span>
          </a>
          <ul class="dropdown-menu" style="border: none; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
            <li class="header" style="background-color: #f8f8f8; border-bottom: 1px solid #eee;">You have 0 notifications</li>
            <li>
              <ul class="menu">
                <!-- Notification items would go here -->
              </ul>
            </li>
            <li class="footer" style="background-color: #f8f8f8; border-top: 1px solid #eee;"><a href="#">View all</a></li>
          </ul>
        </li>
        <!-- User Account: style can be found in dropdown.less -->
        <li class="dropdown user user-menu">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="color: #fff;">
            <img src="<?php echo (!empty($user['photo'])) ? '../images/'.$user['photo'] : '../images/profile.jpg'; ?>" class="user-image" alt="User Image" style="border: 2px solid rgba(255,255,255,0.7);">
            <span class="hidden-xs"><?php echo $user['firstname'].' '.$user['lastname']; ?></span>
          </a>
          <ul class="dropdown-menu" style="border: none; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
            <!-- User image -->
            <li class="user-header" style="background-color: #046a0f;">
              <img src="<?php echo (!empty($user['photo'])) ? '../images/'.$user['photo'] : '../images/profile.jpg'; ?>" class="img-circle" alt="User Image" style="border: 4px solid rgba(255,255,255,0.3);">

              <p style="color: #fff;">
                <?php echo $user['firstname'].' '.$user['lastname']; ?>
                <small style="color: #e0f2e3;">Sub-Admin since <?php echo date('M. Y', strtotime($user['created_on'])); ?></small>
              </p>
            </li>
            <li class="user-footer" style="background-color: #f8f8f8;">
              <div class="pull-left">
                <a href="#profile" data-toggle="modal" class="btn btn-default btn-flat" id="admin_profile" style="background-color: #f5f5f5; border-color: #ddd;">Update Profile</a>
              </div>
              <div class="pull-right">
                <a href="logout.php" class="btn btn-default btn-flat" style="background-color: #046a0f; color: #fff; border-color: #035a0d;">Sign out</a>
              </div>
            </li>
          </ul>
        </li>
        <!-- Help Menu -->
        <li>
          <a href="#" data-toggle="control-sidebar" style="color: #fff;"><i class="fa fa-question-circle"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</header>

<style>
.navbar-nav > li > a:hover {
  background-color: rgba(255,255,255,0.15) !important;
}
.navbar .sidebar-toggle:hover {
  background-color: rgba(255,255,255,0.15) !important;
}
.dropdown-menu > li > a:hover {
  background-color: #f5f5f5 !important;
}
</style>

<?php include 'includes/profile_modal.php'; ?>