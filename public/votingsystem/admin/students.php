<?php
// Include session management and database connection
include 'includes/session.php';

// Update students table to set election_name if it's null
$conn->query("
    UPDATE students s
    JOIN elections e ON s.election_id = e.id
    SET s.election_name = e.name
    WHERE s.election_name IS NULL
");

// Get all elections including those that only exist in students table
$elections_sql = "
    SELECT id, name FROM elections 
    UNION 
    SELECT DISTINCT election_id as id, election_name as name 
    FROM students 
    WHERE election_id NOT IN (SELECT id FROM elections)
    ORDER BY name ASC";
$elections_result = $conn->query($elections_sql);

// Get election filter from URL (name instead of ID)
$election_filter_name = isset($_GET['election']) ? trim($_GET['election']) : '';

// If no election name filter is set, redirect to the first election
if (!isset($_GET['election']) || $election_filter_name === '') {
    if ($elections_result->num_rows > 0) {
        $first_election = $elections_result->fetch_assoc();
        // Only redirect if we have a valid election name
        if (!empty($first_election['name'])) {
            header('Location: students.php?election=' . urlencode($first_election['name']));
            exit();
        }
    }
    // If we reach here, no valid elections exist - set to empty and continue
    $election_filter_name = '';
}

// Find the election ID for the given name
$election_filter = 0;
mysqli_data_seek($elections_result, 0); // Reset pointer
while ($election = $elections_result->fetch_assoc()) {
    if ($election['name'] === $election_filter_name) {
        $election_filter = $election['id'];
        break;
    }
}

// Get filter values
$course_filter = isset($_GET['course']) ? $_GET['course'] : '';
$year_section_filter = isset($_GET['year_section']) ? $_GET['year_section'] : '';

// Pagination setup
$limit = 10; // Number of records per page
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1; // Current page
$offset = ($page - 1) * $limit; // Offset for SQL query

// Build SQL query - first try by election ID, fallback to election name
$where_clause = "";
if ($election_filter > 0) {
    $where_clause = "WHERE students.election_id = $election_filter";
} else if (!empty($election_filter_name)) {
    $safe_election_name = $conn->real_escape_string($election_filter_name);
    $where_clause = "WHERE students.election_name = '$safe_election_name'";
}

// Add additional filters if set
if (!empty($course_filter)) {
    $where_clause .= " AND students.course = '" . $conn->real_escape_string($course_filter) . "'";
}
if (!empty($year_section_filter)) {
    $where_clause .= " AND students.year_section = '" . $conn->real_escape_string($year_section_filter) . "'";
}

// Fetch total number of records for this election with applied filters
$total_sql = "SELECT COUNT(*) AS total FROM students $where_clause";
$total_result = $conn->query($total_sql);
$total_row = $total_result->fetch_assoc();
$total_records = $total_row['total'];
$total_pages = ceil($total_records / $limit); // Total number of pages

// Fetch students data for the selected election with applied filters
$sql = "
    SELECT students.id, voters.voters_id AS student_id, students.name, students.year_section, 
           students.course, COALESCE(elections.name, students.election_name) AS election_name 
    FROM students 
    LEFT JOIN elections ON students.election_id = elections.id 
    LEFT JOIN voters ON students.voters_id = voters.id
    $where_clause
    ORDER BY students.name ASC 
    LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

// Get unique courses and year/sections for filters
$courses_sql = "SELECT DISTINCT course FROM students $where_clause ORDER BY course ASC";
$courses_result = $conn->query($courses_sql);

$year_sections_sql = "SELECT DISTINCT year_section FROM students $where_clause ORDER BY year_section ASC";
$year_sections_result = $conn->query($year_sections_sql);

// Reset pointer for the elections dropdown
mysqli_data_seek($elections_result, 0);
?>
<?php include 'includes/header.php'; ?>
<body class="hold-transition skin-green sidebar-mini">
<div class="wrapper">
  <?php include 'includes/navbar.php'; ?>
  <?php include 'includes/menubar1.php'; ?>

  <div class="content-wrapper" style="background-color: #f8faf8;">
    <section class="content-header">
      <h1 style="color: #046a0f; font-weight: 700; margin-bottom: 15px;">Election Students</h1>
      <ol class="breadcrumb" style="background-color: #ffffff; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <li><a href="home.php" style="color: #046a0f;"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Students</li>
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
                <i class="fa fa-users" style="margin-right: 10px;"></i> Students Registered for Election
              </h3>
              
              <!-- Election Selection Dropdown -->
              <div class="pull-right">
                <form method="GET" action="students.php" class="form-inline">
                  <div class="form-group" style="margin-bottom: 0; margin-right: 10px;">
                    <label for="election_filter" style="color: #046a0f; margin-right: 10px; font-weight: 600;">Election:</label>
                    <select name="election" id="election_filter" class="form-control" style="border: 1px solid #d0e0d0; border-radius: 4px; padding: 6px 10px; width: 180px;" onchange="this.form.submit()">
                      <?php
                      while ($election = $elections_result->fetch_assoc()) {
                        $selected = ($election_filter_name == $election['name']) ? 'selected' : '';
                        echo "<option value='" . htmlspecialchars($election['name']) . "' $selected>" . htmlspecialchars($election['name']) . "</option>";
                      }
                      ?>
                    </select>
                  </div>
                  
                  <input type="hidden" name="page" value="1"> <!-- Reset to page 1 when filtering -->
                  
                  <?php if ($course_filter): ?>
                  <input type="hidden" name="course" value="<?php echo htmlspecialchars($course_filter); ?>">
                  <?php endif; ?>
                  
                  <?php if ($year_section_filter): ?>
                  <input type="hidden" name="year_section" value="<?php echo htmlspecialchars($year_section_filter); ?>">
                  <?php endif; ?>
                </form>
              </div>
            </div>
            
            <!-- Filter Bar -->
            <div class="box-header" style="background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0; padding: 15px 20px;">
              <div class="filter-container" style="display: flex; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div class="filter-label" style="color: #046a0f; font-weight: 600;">
                  <i class="fa fa-filter" style="margin-right: 5px;"></i> Filter by:
                </div>
                
                <!-- Course filter -->
                <div class="filter-item">
                  <form method="GET" action="students.php" class="form-inline" style="margin-bottom: 0;">
                    <input type="hidden" name="election" value="<?php echo htmlspecialchars($election_filter_name); ?>">
                    <input type="hidden" name="page" value="1"> <!-- Reset to page 1 when filtering -->
                    
                    <?php if ($year_section_filter): ?>
                    <input type="hidden" name="year_section" value="<?php echo htmlspecialchars($year_section_filter); ?>">
                    <?php endif; ?>
                    
                    <select name="course" class="form-control form-control-sm" style="border: 1px solid #d0e0d0; border-radius: 4px; padding: 6px 10px; width: 180px;" onchange="this.form.submit()">
                      <option value="">All Courses</option>
                      <?php
                      while ($course = $courses_result->fetch_assoc()) {
                        $selected = ($course_filter == $course['course']) ? 'selected' : '';
                        echo "<option value='" . htmlspecialchars($course['course']) . "' $selected>" . htmlspecialchars($course['course']) . "</option>";
                      }
                      ?>
                    </select>
                  </form>
                </div>
                
                <!-- Year & Section filter -->
                <div class="filter-item">
                  <form method="GET" action="students.php" class="form-inline" style="margin-bottom: 0;">
                    <input type="hidden" name="election" value="<?php echo htmlspecialchars($election_filter_name); ?>">
                    <input type="hidden" name="page" value="1"> <!-- Reset to page 1 when filtering -->
                    
                    <?php if ($course_filter): ?>
                    <input type="hidden" name="course" value="<?php echo htmlspecialchars($course_filter); ?>">
                    <?php endif; ?>
                    
                    <select name="year_section" class="form-control form-control-sm" style="border: 1px solid #d0e0d0; border-radius: 4px; padding: 6px 10px; width: 180px;" onchange="this.form.submit()">
                      <option value="">All Year/Sections</option>
                      <?php
                      while ($year_section = $year_sections_result->fetch_assoc()) {
                        $selected = ($year_section_filter == $year_section['year_section']) ? 'selected' : '';
                        echo "<option value='" . htmlspecialchars($year_section['year_section']) . "' $selected>" . htmlspecialchars($year_section['year_section']) . "</option>";
                      }
                      ?>
                    </select>
                  </form>
                </div>
                
                <!-- Reset filters button -->
                <?php if ($course_filter || $year_section_filter): ?>
                <div class="filter-reset">
                  <a href="students.php?election=<?php echo urlencode($election_filter_name); ?>" class="btn btn-sm btn-default" style="border-color: #d0e0d0;">
                    <i class="fa fa-times"></i> Clear Filters
                  </a>
                </div>
                <?php endif; ?>
              </div>
            </div>

            <!-- Students Table -->
            <div class="box-body" style="padding: 20px; background-color: #fff; border-radius: 0 0 8px 8px;">
              <?php 
                // Build filter description
                $filter_desc = "";
                if ($course_filter) {
                  $filter_desc .= " | Course: <strong>" . htmlspecialchars($course_filter) . "</strong>";
                }
                if ($year_section_filter) {
                  $filter_desc .= " | Year/Section: <strong>" . htmlspecialchars($year_section_filter) . "</strong>";
                }
              ?>
              <div class="alert alert-info" style="background-color: #e8f4fb; color: #0c5460; border-color: #bee5eb; border-left: 4px solid #17a2b8;">
                <i class="fa fa-info-circle"></i> Showing students registered for: <strong><?php echo htmlspecialchars($election_filter_name); ?></strong><?php echo $filter_desc; ?>
              </div>

              <div class="table-responsive">
                <table id="students-table" class="table table-bordered table-hover" style="width: 100%;">
                  <thead style="background-color: #046a0f; color: white;">
                    <tr>
                      <th width="30%">Student Name</th>
                      <th width="20%">Student ID</th>
                      <th width="20%">Year & Section</th>
                      <th width="30%">Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php
                      if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                          echo "
                            <tr>
                              <td style='vertical-align: middle;'><strong>" . htmlspecialchars($row['name']) . "</strong></td>
                              <td style='vertical-align: middle;'>" . htmlspecialchars($row['student_id']) . "</td>
                              <td style='vertical-align: middle;'>" . htmlspecialchars($row['year_section']) . "</td>
                              <td style='vertical-align: middle;'>" . htmlspecialchars($row['course']) . "</td>
                            </tr>
                          ";
                        }
                      } else {
                        echo "<tr><td colspan='4' class='text-center' style='padding: 20px; color: #777;'>No students found for this election</td></tr>";
                      }
                    ?>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pagination -->
            <div class="box-footer clearfix" style="background-color: #f0fdf0; border-top: 1px solid #e0f0e0; border-radius: 0 0 8px 8px; padding: 15px 20px;">
              <div class="pull-left" style="color: #046a0f; font-size: 14px;">
                Showing <?php echo ($result->num_rows > 0) ? ($offset + 1) : 0; ?> to <?php echo min($offset + $limit, $total_records); ?> of <?php echo $total_records; ?> students
              </div>
              <ul class="pagination pagination-sm no-margin pull-right">
                <?php 
                // Build pagination URL with all active filters
                $pagination_url = "students.php?election=" . urlencode($election_filter_name);
                if (!empty($course_filter)) {
                    $pagination_url .= "&course=" . urlencode($course_filter);
                }
                if (!empty($year_section_filter)) {
                    $pagination_url .= "&year_section=" . urlencode($year_section_filter);
                }
                ?>
                
                <?php if($page > 1): ?>
                  <li><a href="<?php echo $pagination_url; ?>&page=1" style="color: #046a0f; border-color: #d0e0d0;">&laquo;</a></li>
                  <li><a href="<?php echo $pagination_url; ?>&page=<?php echo $page-1; ?>" style="color: #046a0f; border-color: #d0e0d0;">&lsaquo;</a></li>
                <?php endif; ?>
                
                <?php
                  // Show limited page numbers with current page in center
                  $start_page = max(1, $page - 2);
                  $end_page = min($total_pages, $page + 2);
                  
                  for ($i = $start_page; $i <= $end_page; $i++) {
                    $active = ($i == $page) ? 'active' : '';
                    echo "<li class='$active'><a href='$pagination_url&page=$i' style='" . ($active ? "background-color: #046a0f; border-color: #035a0d; color: #fff;" : "color: #046a0f; border-color: #d0e0d0;") . "'>$i</a></li>";
                  }
                ?>
                
                <?php if($page < $total_pages): ?>
                  <li><a href="<?php echo $pagination_url; ?>&page=<?php echo $page+1; ?>" style="color: #046a0f; border-color: #d0e0d0;">&rsaquo;</a></li>
                  <li><a href="<?php echo $pagination_url; ?>&page=<?php echo $total_pages; ?>" style="color: #046a0f; border-color: #d0e0d0;">&raquo;</a></li>
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
.btn {
  transition: all 0.3s ease;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
.form-control:focus {
  border-color: #046a0f;
  box-shadow: 0 0 0 2px rgba(4, 106, 15, 0.25);
}
.label {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  font-weight: 600;
  font-size: 12px;
}
#election_filter {
  background-color: white;
  transition: all 0.3s ease;
}
#election_filter:focus {
  border-color: #046a0f;
  box-shadow: 0 0 0 2px rgba(4, 106, 15, 0.25);
}
.filter-container {
  display: flex;
  align-items: center;
}
.filter-item {
  margin-right: 10px;
}
</style>

<?php include 'includes/scripts.php'; ?>
<script>
$(function() {
  // First, check if the DataTable is already initialized and destroy it if so
  if ($.fn.DataTable.isDataTable('#students-table')) {
    $('#students-table').DataTable().destroy();
  }
  
  // Then initialize the DataTable with search but no pagination (we use custom pagination)
  $('#students-table').DataTable({
    'responsive': true,
    'autoWidth': false,
    'paging': false,
    'info': false,
    'language': {
      'search': 'Search Students:',
      'zeroRecords': 'No matching students found'
    },
    'dom': '<"top"f>rt<"clear">'
  });
});
</script>
</body>
</html>