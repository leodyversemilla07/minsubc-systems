<?php
include 'includes/session.php';
include 'includes/header.php';

// Pagination setup
$limit = 10; // Number of records per page
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1; // Current page
$offset = ($page - 1) * $limit; // Offset for SQL query

// Fetch total number of records
$total_sql = "SELECT COUNT(*) AS total FROM history";
$total_result = $conn->query($total_sql);
$total_row = $total_result->fetch_assoc();
$total_records = $total_row['total'];
$total_pages = ceil($total_records / $limit); // Total number of pages

// Fetch records for the current page
$sql = "SELECT * FROM history ORDER BY deleted_at DESC LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);
?>

<body class="hold-transition skin-green sidebar-mini">
<div class="wrapper">
  <?php include 'includes/navbar.php'; ?>
  <?php include 'includes/menubar1.php'; ?>

  <div class="content-wrapper" style="background-color: #f8faf8;">
    <section class="content-header">
      <h1 style="color: #046a0f; font-weight: 700; margin-bottom: 15px;">Elections History</h1>
      <ol class="breadcrumb" style="background-color: #ffffff; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <li><a href="home.php" style="color: #046a0f;"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">History</li>
      </ol>
    </section>

    <section class="content" style="padding-top: 20px;">
      <div class="row">
        <div class="col-xs-12">
          <div class="box" style="border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <div class="box-header with-border" style="background-color: #f0fdf0; border-bottom: 1px solid #e0f0e0; border-radius: 8px 8px 0 0; padding: 20px;">
              <h3 class="box-title" style="color: #046a0f; font-weight: 600;">
                <i class="fa fa-history" style="margin-right: 10px;"></i> List of Deleted Elections
              </h3>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus" style="color: #046a0f;"></i></button>
              </div>
            </div>

            <div class="box-body" style="padding: 20px; background-color: #fff; border-radius: 0 0 8px 8px;">
              <div class="table-responsive">
                <table id="history-table" class="table table-bordered table-hover" style="width: 100%;">
                  <thead style="background-color: #046a0f; color: white;">
                    <tr>
                      <th width="40%">Election Name</th>
                      <th width="30%">Deleted At</th>
                      <th width="30%">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                      if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                          // Format the date properly
                          $deleted_date = date('M d, Y - h:i a', strtotime($row['deleted_at']));
                          
                          echo "
                            <tr>
                              <td style='vertical-align: middle;'><strong>" . htmlspecialchars($row['election_title']) . "</strong></td>
                              <td style='vertical-align: middle;'>" . $deleted_date . "</td>
                              <td style='vertical-align: middle;'>
                                <button class='btn btn-success btn-sm view-history' data-id='" . $row['id'] . "' style='background-color: #046a0f; border-color: #035a0d; transition: all 0.3s ease;'>
                                  <i class='fa fa-eye'></i> View Details
                                </button>
                              </td>
                            </tr>";
                        }
                      } else {
                        echo "<tr><td colspan='3' class='text-center' style='padding: 20px; color: #777;'>No history records found</td></tr>";
                      }
                    ?>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pagination -->
            <div class="box-footer clearfix" style="background-color: #f0fdf0; border-top: 1px solid #e0f0e0; border-radius: 0 0 8px 8px; padding: 15px 20px;">
              <div class="pull-left" style="color: #046a0f; font-size: 14px;">
                Showing <?php echo ($result->num_rows > 0) ? ($offset + 1) : 0; ?> to <?php echo min($offset + $limit, $total_records); ?> of <?php echo $total_records; ?> records
              </div>
              <ul class="pagination pagination-sm no-margin pull-right">
                <?php if($page > 1): ?>
                  <li><a href="history.php?page=1" style="color: #046a0f; border-color: #d0e0d0;">&laquo;</a></li>
                  <li><a href="history.php?page=<?php echo $page-1; ?>" style="color: #046a0f; border-color: #d0e0d0;">&lsaquo;</a></li>
                <?php endif; ?>
                
                <?php
                  // Show limited page numbers with current page in center
                  $start_page = max(1, $page - 2);
                  $end_page = min($total_pages, $page + 2);
                  
                  for ($i = $start_page; $i <= $end_page; $i++) {
                    $active = ($i == $page) ? 'active' : '';
                    echo "<li class='$active'><a href='history.php?page=$i' style='" . ($active ? "background-color: #046a0f; border-color: #035a0d; color: #fff;" : "color: #046a0f; border-color: #d0e0d0;") . "'>$i</a></li>";
                  }
                ?>
                
                <?php if($page < $total_pages): ?>
                  <li><a href="history.php?page=<?php echo $page+1; ?>" style="color: #046a0f; border-color: #d0e0d0;">&rsaquo;</a></li>
                  <li><a href="history.php?page=<?php echo $total_pages; ?>" style="color: #046a0f; border-color: #d0e0d0;">&raquo;</a></li>
                <?php endif; ?>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <?php include 'includes/footer.php'; ?>
</div>
<?php include 'includes/scripts.php'; ?>

<script>
$(document).ready(function(){
  $('.view-history').click(function(){
    var id = $(this).data('id');
    $('#historyModal').modal('show');
    $('#loading-indicator').show();
    $('#modal-content').hide();
    
    $.ajax({
      url: 'view_history.php',
      method: 'POST',
      data: { id: id },
      success: function(response){
        setTimeout(function() {
          $('#loading-indicator').hide();
          $('#modal-content').show().html(response);
        }, 500);
      },
      error: function(xhr, status, error) {
        $('#loading-indicator').hide();
        $('#modal-content').show().html(`
          <div class="text-center text-danger py-4">
            <div class="bg-danger-light rounded-circle p-3 d-inline-block mb-3">
              <i class="fa fa-exclamation-triangle fa-2x"></i>
            </div>
            <p class="font-weight-bold">An error occurred while retrieving history details.</p>
            <p class="text-muted">Please try again or contact the system administrator.</p>
            <button class="btn btn-outline-danger try-again mt-2">
              <i class="fa fa-refresh mr-1"></i> Try Again
            </button>
          </div>
        `);
      }
    });
  });

  // Try again button
  $(document).on('click', '.try-again', function() {
    const lastClickedButton = $('.view-history[aria-pressed="true"]');
    if (lastClickedButton.length) {
      lastClickedButton.click();
    } else {
      $('#historyModal').modal('hide');
    }
  });

  // Mark button as pressed when clicked
  $(document).on('click', '.view-history', function() {
    $('.view-history').attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'true');
  });

  // Print button functionality
  $(document).on('click', '#print-button', function() {
    var printContent = document.getElementById('printable-content').innerHTML;
    var originalContent = document.body.innerHTML;
    var electionTitle = $('#printable-content').find('h5').first().text() || 'Deleted Election';
    
    document.body.innerHTML = `
      <div style="padding: 30px; max-width: 800px; margin: 0 auto;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="background-color: #f0fdf0; color: #046a0f; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin-right: 10px;">
            <i class="fa fa-vote-yea" style="font-size: 20px;"></i>
          </div>
          <div>
            <h1 style="color: #046a0f; font-size: 22px; margin: 0; font-weight: bold;">Election System</h1>
            <p style="color: #666; margin: 3px 0 0 0;">Deleted Election Report</p>
          </div>
        </div>
        <h2 style="text-align: center; color: #046a0f; margin-bottom: 20px; font-size: 24px; padding-bottom: 10px; border-bottom: 2px solid #e0f0e0;">${electionTitle}</h2>
        <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          ${printContent}
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>Generated on ${new Date().toLocaleString()}</p>
          <p>© ${new Date().getFullYear()} Election System. All rights reserved.</p>
        </div>
      </div>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    
    // Re-initialize event handlers
    $(document).ready(function() {
      $('.view-history').click(function(){
        var id = $(this).data('id');
        $('#historyModal').modal('show');
        // Rest of the click handler
      });
    });
  });

  // Button hover effect
  $('.btn').hover(
    function() { $(this).css('transform', 'translateY(-2px)').css('box-shadow', '0 4px 8px rgba(0,0,0,0.1)'); },
    function() { $(this).css('transform', 'translateY(0)').css('box-shadow', 'none'); }
  );
});
</script>

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
.pagination > li > a,
.pagination > li > span {
  padding: 6px 12px;
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
.btn-success:hover {
  background-color: #035a0d;
  border-color: #024a0b;
}
.bg-danger-light {
  background-color: #f8d7da;
}
.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>

<!-- History Modal - Fixed Structure -->
<div class="modal fade" id="historyModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" style="border-radius: 8px; overflow: hidden; border: none; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
      <div class="modal-header" style="background-color: #046a0f; color: #fff; border-bottom: none; padding: 15px 20px;">
        <button type="button" class="close" data-dismiss="modal" style="color: #fff; opacity: 0.8;">&times;</button>
        <h4 class="modal-title"><i class="fa fa-history"></i> Deleted Election Details</h4>
      </div>
      <div class="modal-body" style="background-color: #fff; padding: 20px;">
        <!-- Loading indicator -->
        <div class="text-center" id="loading-indicator" style="padding: 30px;">
          <div class="shimmer" style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 15px;"></div>
          <div class="shimmer" style="width: 180px; height: 20px; border-radius: 4px; margin: 0 auto 10px;"></div>
          <div class="shimmer" style="width: 240px; height: 15px; border-radius: 4px; margin: 0 auto;"></div>
        </div>
        <!-- Election history details will be loaded here -->
        <div id="modal-content"></div>
      </div>
      <div class="modal-footer" style="background-color: #f0fdf0; border-top: 1px solid #e0f0e0; padding: 15px 20px;">
        <button type="button" class="btn btn-default" data-dismiss="modal" style="background-color: #777; color: #fff; border: none;">
          <i class="fa fa-times mr-1"></i> Close
        </button>
        <button type="button" id="print-button" class="btn btn-success" style="background-color: #046a0f; border-color: #035a0d;">
          <i class="fa fa-print mr-1"></i> Print Details
        </button>
      </div>
    </div>
  </div>
</div>

</body>
</html>
