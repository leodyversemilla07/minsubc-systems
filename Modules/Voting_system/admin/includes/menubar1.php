<aside class="main-sidebar">
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar" style="background: linear-gradient(to bottom, #046a0f, #035a0d); color: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.3); border-radius: 0 10px 10px 0;">
    <!-- Sidebar user panel -->
    <div class="user-panel" style="background-color:rgba(0,0,0,0.1); padding: 22px 15px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center;">
      <div class="pull-left image">
        <img src="<?php echo (!empty($user['photo'])) ? '../images/'.$user['photo'] : '../images/profile.jpg'; ?>" class="img-circle" alt="User Image" style="border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.3); width: 50px; height: 50px; object-fit: cover;">
      </div>
      <div class="pull-left info" style="padding-left: 15px;">
        <p style="font-weight: 700; font-size: 16px; margin-bottom: 6px; color: #fff;"><?php echo $user['firstname'].' '.$user['lastname']; ?></p>
        <a style="font-size: 13px; color: #e0f2e3; display: flex; align-items: center;"><i class="fa fa-circle text-success" style="font-size: 10px; margin-right: 6px;"></i> Online</a>
      </div>
    </div>
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu" data-widget="tree">
      <li class="header" style="background-color:rgba(0,0,0,0.2); color: #fff; text-align: center; font-weight: 600; padding: 12px; letter-spacing: 1.5px; text-transform: uppercase; font-size: 13px; border-radius: 5px; margin: 0 15px 15px;">NAVIGATION</li>
      
      <li class="sidebar-item">
        <a href="home.php" style="color: #fff; border-left: 4px solid transparent; padding: 14px 15px; margin: 5px 10px; transition: all 0.3s; border-radius: 8px; display: flex; align-items: center;">
          <i class="fa fa-home" style="width: 24px; margin-right: 10px; text-align: center;"></i> <span>Home</span>
        </a>
      </li>
      <li class="sidebar-item">
        <a href="sub_admins.php" style="color: #fff; border-left: 4px solid transparent; padding: 14px 15px; margin: 5px 10px; transition: all 0.3s; border-radius: 8px; display: flex; align-items: center;">
          <i class="fa fa-calendar-check-o" style="width: 24px; margin-right: 10px; text-align: center;"></i> <span>Elections</span>
        </a>
      </li>
      <li class="sidebar-item">
        <a href="feedback.php" style="color: #fff; border-left: 4px solid transparent; padding: 14px 15px; margin: 5px 10px; transition: all 0.3s; border-radius: 8px; display: flex; align-items: center;">
          <i class="fa fa-comments" style="width: 24px; margin-right: 10px; text-align: center;"></i> <span>Feedbacks</span>
        </a>
      </li>
      <li class="sidebar-item">
        <a href="history.php" style="color: #fff; border-left: 4px solid transparent; padding: 14px 15px; margin: 5px 10px; transition: all 0.3s; border-radius: 8px; display: flex; align-items: center;">
          <i class="fa fa-history" style="width: 24px; margin-right: 10px; text-align: center;"></i> <span>History</span>
        </a>
      </li>
      <li class="sidebar-item">
        <a href="students.php" style="color: #fff; border-left: 4px solid transparent; padding: 14px 15px; margin: 5px 10px; transition: all 0.3s; border-radius: 8px; display: flex; align-items: center;">
          <i class="fa fa-users" style="width: 24px; margin-right: 10px; text-align: center;"></i> <span>Students</span>
        </a>
      </li>
      
      <li class="sidebar-footer" style="margin-top: 30px; padding: 15px; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7);">
        <p>© 2025 Votesys Admin Panel</p>
      </li>
    </ul>
  </section>
  <!-- /.sidebar -->
</aside>

<style>
.sidebar-item a:hover {
  background-color: rgba(255,255,255,0.15) !important;
  border-left-color: #fff !important;
  transform: translateX(5px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.sidebar-menu > li.active > a {
  background-color: rgba(255,255,255,0.2) !important;
  border-left-color: #fff !important;
  font-weight: bold;
  transform: translateX(5px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.sidebar-item a:hover i, .sidebar-menu > li.active > a i {
  color: #ffffff;
  transform: scale(1.1);
  transition: all 0.3s;
}
.sidebar-item a {
  position: relative;
  overflow: hidden;
}
.sidebar-item a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
  transition: 0.5s;
}
.sidebar-item a:hover::before {
  left: 100%;
}
</style>

<?php include 'config_modal.php'; ?>
