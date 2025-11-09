<?php
// Include session management and database connection
include 'includes/session.php';

// Fetch feedback data with election name
$sql = "
    SELECT elections.name AS election_name, feedback.feedback, feedback.created_at 
    FROM feedback 
    JOIN elections ON feedback.election_id = elections.id 
    ORDER BY feedback.created_at DESC";
$result = $conn->query($sql);
?>
<?php include 'includes/header.php'; ?>
<body class="hold-transition skin-green sidebar-mini">
<div class="wrapper">
  <?php include 'includes/navbar.php'; ?>
  <?php include 'includes/menubar1.php'; ?>

  <div class="content-wrapper" style="background-color: #f8faf8;">
    <section class="content-header">
      <h1 style="color: #046a0f; font-weight: 700; margin-bottom: 15px;">User Feedback</h1>
      <ol class="breadcrumb" style="background-color: #ffffff; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <li><a href="home.php" style="color: #046a0f;"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Feedback</li>
      </ol>
    </section>

    <section class="content" style="padding-top: 20px;">
      <?php
        if (isset($_SESSION['error'])) {
          echo "<div class='alert alert-danger alert-dismissible' style='border-left: 4px solid #d9534f; border-radius: 4px;'>
                  <button type='button' class='close' data-dismiss='alert'>&times;</button>
                  <h4><i class='icon fa fa-warning'></i> Error!</h4>
                  " . $_SESSION['error'] . "
                </div>";
          unset($_SESSION['error']);
        }
        if (isset($_SESSION['success'])) {
          echo "<div class='alert alert-success alert-dismissible' style='border-left: 4px solid #046a0f; border-radius: 4px;'>
                  <button type='button' class='close' data-dismiss='alert'>&times;</button>
                  <h4><i class='icon fa fa-check'></i> Success!</h4>
                  " . $_SESSION['success'] . "
                </div>";
          unset($_SESSION['success']);
        }
      ?>

      <div class="row">
        <div class="col-xs-12">
          <div class="box" style="border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <div class="box-header with-border" style="background-color: #f0fdf0; border-bottom: 1px solid #e0f0e0; border-radius: 8px 8px 0 0; padding: 20px;">
              <h3 class="box-title" style="color: #046a0f; font-weight: 600;">
                <i class="fa fa-comments" style="margin-right: 10px;"></i> All Student Feedback
              </h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus" style="color: #046a0f;"></i>
                </button>
              </div>
            </div>

            <div class="box-body" style="padding: 20px; background-color: #fff; border-radius: 0 0 8px 8px;">
              <div class="table-responsive">
                <table id="feedback-table" class="table table-bordered table-hover" style="width: 100%;">
                  <thead style="background-color: #046a0f; color: white;">
                    <tr>
                      <th width="20%">Election Name</th>
                      <th width="60%">Feedback</th>
                      <th width="20%">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                      if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                          echo "
                            <tr>
                              <td style='vertical-align: middle;'><strong>" . htmlspecialchars($row['election_name']) . "</strong></td>
                              <td style='vertical-align: middle;'>" . htmlspecialchars($row['feedback']) . "</td>
                              <td style='vertical-align: middle;'>" . date('M d, Y - h:i a', strtotime($row['created_at'])) . "</td>
                            </tr>
                          ";
                        }
                      } else {
                        echo "<tr><td colspan='3' class='text-center' style='padding: 20px; color: #777;'>No feedback found</td></tr>";
                      }
                    ?>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="box-footer" style="background-color: #f0fdf0; border-top: 1px solid #e0f0e0; border-radius: 0 0 8px 8px; padding: 15px 20px;">
              <div class="pull-right">
                <span style="color: #777; font-size: 14px;">
                  Total Feedback: <strong><?php echo $result->num_rows; ?></strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <?php include 'includes/footer.php'; ?>
</div>

<style>
.table {
  border-collapse: separate;
  border-spacing: 0;
}
.table th {
  font-weight: 600;
}
.table tbody tr:hover {
  background-color: #f0fdf0;
}
.table th, .table td {
  padding: 12px 15px;
}
.pagination > .active > a,
.pagination > .active > a:focus,
.pagination > .active > a:hover,
.pagination > .active > span,
.pagination > .active > span:focus,
.pagination > .active > span:hover {
  background-color: #046a0f;
  border-color: #035a0d;
}
.pagination > li > a {
  color: #046a0f;
}
/* DataTable styling enhancements */
.dataTables_wrapper .dataTables_filter input {
  border: 1px solid #d0e0d0;
  border-radius: 4px;
  padding: 5px 10px;
}
.dataTables_wrapper .dataTables_filter input:focus {
  border-color: #046a0f;
  outline: none;
  box-shadow: 0 0 0 2px rgba(4, 106, 15, 0.25);
}
.dataTables_wrapper .dataTables_length select {
  border: 1px solid #d0e0d0;
  border-radius: 4px;
  padding: 5px 10px;
}
</style>

<?php include 'includes/scripts.php'; ?>
<script>
$(function() {
  // First, check if the DataTable is already initialized and destroy it if so
  if ($.fn.DataTable.isDataTable('#feedback-table')) {
    $('#feedback-table').DataTable().destroy();
  }
  
  // Then initialize the DataTable
  $('#feedback-table').DataTable({
    'responsive': true,
    'autoWidth': false,
    'language': {
      'search': 'Search Feedback:',
      'lengthMenu': 'Show _MENU_ entries per page',
      'zeroRecords': 'No matching feedback found',
      'info': 'Showing _START_ to _END_ of _TOTAL_ feedback',
      'infoEmpty': 'Showing 0 to 0 of 0 feedback',
      'infoFiltered': '(filtered from _MAX_ total feedback)'
    },
    'pagingType': 'full_numbers',
    'columnDefs': [
      { 'orderable': false, 'targets': [1] }
    ],
    'dom': '<"top"lf>rt<"bottom"ip><"clear">',
    'drawCallback': function() {
      $('.dataTables_paginate > .pagination').addClass('pagination-sm');
    }
  });
});
</script>
</body>
</html>