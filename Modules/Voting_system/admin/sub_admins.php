<?php
include 'includes/session.php';

// Handle form submission to generate a single code
if (isset($_POST['generate'])) {
    $election_name = $_POST['election_name'];

    // Generate a single election code
    $set = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $election_code = substr(str_shuffle($set), 0, 10);

    // Set status to 0 (not started) by default
    $sql = "INSERT INTO elections (name, election_code, status) VALUES ('$election_name', '$election_code', 0)";
    if ($conn->query($sql)) {
        $_SESSION['success'] = 'Election code generated successfully for ' . $election_name . '.';
    } else {
        $_SESSION['error'] = $conn->error;
    }

    header('location: sub_admins.php');
    exit();
}
?>

<?php include 'includes/header.php'; ?>
<body class="hold-transition skin-green sidebar-mini">
<div class="wrapper">
  <?php include 'includes/navbar.php'; ?>
  <?php include 'includes/menubar1.php'; ?>

  <div class="content-wrapper" style="background-color: #f8faf8;">
    <section class="content-header">
      <h1 style="color: #046a0f; font-weight: 700; margin-bottom: 15px;">Elections Management</h1>
      <ol class="breadcrumb">
        <li><a href="home.php"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Elections</li>
      </ol>
    </section>

    <section class="content">
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
              <h3 class="box-title" style="color: #046a0f; font-weight: 600; margin-bottom: 15px;">Create New Election</h3>
              <form action="" method="post">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label style="color: #046a0f; font-weight: 600;">Election Name:</label>
                      <input type="text" name="election_name" class="form-control" style="border: 1px solid #d0e0d0; border-radius: 4px; padding: 8px 12px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);" placeholder="Enter election name" required>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <button type="submit" name="generate" class="btn btn-success" style="margin-top: 25px; background-color: #046a0f; border-color: #035a0d; padding: 8px 16px; font-weight: 600; border-radius: 4px; transition: all 0.3s ease;">
                        <i class="fa fa-plus-circle"></i> Generate Code
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div class="box-body" style="padding: 20px; background-color: #fff; border-radius: 0 0 8px 8px;">
              <div class="table-responsive">
                <table id="example1" class="table table-bordered table-hover" style="width: 100%;">
                  <thead style="background-color: #046a0f; color: white;">
                    <tr>
                      <th>Election Name</th>
                      <th>Status</th>
                      <th>End Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                      // Retrieve elections from the database
                      $sql = "SELECT id, name, election_code, status, end_time FROM elections";
                      $result = $conn->query($sql);

                      if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                          $status = ($row['status'] == 1) 
                            ? '<span class="label label-success" style="background-color: #046a0f; padding: 5px 10px; border-radius: 4px; font-weight: 600;">Active</span>' 
                            : '<span class="label label-default" style="background-color: #777; padding: 5px 10px; border-radius: 4px; font-weight: 600;">Not Started</span>';
                          $end_time = $row['end_time'] ? date('Y-m-d H:i:s', strtotime($row['end_time'])) : 'N/A';

                          echo "
                            <tr>
                              <td style='vertical-align: middle;'><strong>" . htmlspecialchars($row['name']) . "</strong></td>
                              <td style='vertical-align: middle;'>" . $status . "</td>
                              <td style='vertical-align: middle;'>" . $end_time . "</td>
                              <td style='vertical-align: middle;'>
                                <button type='button' class='btn btn-info btn-sm' style='margin-right: 5px; background-color: #046a0f; border-color: #035a0d;' onclick='viewElectionCode(\"" . htmlspecialchars($row['election_code']) . "\")'>
                                  <i class='fa fa-key'></i> View Code
                                </button>
                                <form method='GET' action='result.php' style='display:inline;'>
                                  <input type='hidden' name='election_id' value='" . $row['id'] . "'>
                                  <button type='submit' class='btn btn-primary btn-sm' style='background-color: #035a0d; border-color: #024a0b;'>
                                    <i class='fa fa-bar-chart'></i> View Results
                                  </button>
                                </form>
                              </td>
                            </tr>";
                        }
                      } else {
                        echo "<tr><td colspan='4' class='text-center' style='padding: 20px; color: #777;'>No elections found</td></tr>";
                      }
                    ?>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <?php include 'includes/footer.php'; ?>
</div>
<?php include 'includes/scripts.php'; ?>

<!-- Modal for Viewing Election Code -->
<div id="electionCodeModal" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="border-radius: 8px; overflow: hidden; border: none; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
      <div class="modal-header" style="background-color: #046a0f; color: #fff; border-bottom: none; padding: 15px 20px;">
        <h4 class="modal-title"><i class="fa fa-key"></i> Election Code</h4>
        <button type="button" class="close" data-dismiss="modal" style="color: #fff; opacity: 0.8;">&times;</button>
      </div>
      <div class="modal-body" style="background-color: #f8faf8; padding: 30px 20px;">
        <div style="background-color: #fff; padding: 20px; border-radius: 4px; border: 1px dashed #046a0f; text-align: center; margin-bottom: 15px;">
          <p style="margin-bottom: 5px; color: #666; font-size: 14px;">Election Access Code:</p>
          <p id="electionCodeText" style="font-size: 24px; font-weight: bold; color: #046a0f; letter-spacing: 1px; margin: 0; font-family: monospace;"></p>
        </div>
        <div style="text-align: center; margin-top: 10px;">
          <button type="button" class="btn btn-default" id="copyCodeBtn" style="background-color: #f0fdf0; border-color: #d0e0d0; color: #046a0f;">
            <i class="fa fa-copy"></i> Copy to Clipboard
          </button>
        </div>
      </div>
      <div class="modal-footer" style="background-color: #f0fdf0; border-top: 1px solid #e0f0e0; padding: 15px 20px;">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" style="background-color: #777; color: #fff; border: none;">Close</button>
      </div>
    </div>
  </div>
</div>

<style>
.btn {
  transition: all 0.3s ease;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
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
.form-control:focus {
  border-color: #046a0f;
  box-shadow: 0 0 0 0.2rem rgba(4, 106, 15, 0.25);
}
</style>

<script>
  function viewElectionCode(code) {
    document.getElementById('electionCodeText').textContent = code;
    $('#electionCodeModal').modal('show');
  }
  
  // Add clipboard functionality
  $(document).ready(function() {
    $("#copyCodeBtn").click(function() {
      const codeText = document.getElementById('electionCodeText').textContent;
      navigator.clipboard.writeText(codeText).then(function() {
        // Temporarily change button text to show success
        const $btn = $("#copyCodeBtn");
        const originalHtml = $btn.html();
        $btn.html('<i class="fa fa-check"></i> Copied!');
        $btn.css('background-color', '#046a0f').css('color', '#fff');
        
        setTimeout(function() {
          $btn.html(originalHtml);
          $btn.css('background-color', '#f0fdf0').css('color', '#046a0f');
        }, 2000);
      });
    });
  });
</script>

</body>
</html>