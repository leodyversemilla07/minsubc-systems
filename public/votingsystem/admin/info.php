<?php
include 'includes/session.php';
include 'includes/header.php';

// Use the existing database connection from includes/conn.php instead of creating a new one
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle form submissions for adding, updating, and deleting
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['add'])) {
        $course = $_POST['course'];
        $year_section = $_POST['year_section'];

        $stmt = $conn->prepare("INSERT INTO courses (course, year_section) VALUES (?, ?)");
        $stmt->bind_param("ss", $course, $year_section);
        
        if ($stmt->execute()) {
            $_SESSION['success'] = 'Course added successfully';
        } else {
            $_SESSION['error'] = 'Error adding course: ' . $stmt->error;
        }
        header('location: info.php');
        exit();
    } elseif (isset($_POST['update'])) {
        $id = $_POST['id'];
        $course = $_POST['course'];
        $year_section = $_POST['year_section'];

        $stmt = $conn->prepare("UPDATE courses SET course = ?, year_section = ? WHERE id = ?");
        $stmt->bind_param("ssi", $course, $year_section, $id);
        
        if ($stmt->execute()) {
            $_SESSION['success'] = 'Course updated successfully';
        } else {
            $_SESSION['error'] = 'Error updating course: ' . $stmt->error;
        }
        header('location: info.php');
        exit();
    } elseif (isset($_POST['delete'])) {
        $id = $_POST['id'];

        // First check if there are students using this course
        $check = $conn->prepare("SELECT COUNT(*) as count FROM students WHERE course = (SELECT course FROM courses WHERE id = ?)");
        $check->bind_param("i", $id);
        $check->execute();
        $result = $check->get_result();
        $row = $result->fetch_assoc();
        
        if ($row['count'] > 0) {
            $_SESSION['error'] = 'Cannot delete: There are ' . $row['count'] . ' students assigned to this course';
        } else {
            $stmt = $conn->prepare("DELETE FROM courses WHERE id = ?");
            $stmt->bind_param("i", $id);
            
            if ($stmt->execute()) {
                $_SESSION['success'] = 'Course deleted successfully';
            } else {
                $_SESSION['error'] = 'Error deleting course: ' . $stmt->error;
            }
        }
        header('location: info.php');
        exit();
    }
}

// Fetch all courses
$courses_query = "SELECT * FROM courses ORDER BY course ASC, year_section ASC";
$courses_result = $conn->query($courses_query);
?>

<body class="hold-transition skin-green sidebar-mini">
<div class="wrapper">
    <?php include 'includes/navbar.php'; ?>
    <?php include 'includes/menubar1.php'; ?>

    <div class="content-wrapper" style="background-color: #f8faf8;">
        <section class="content-header">
            <h1 style="color: #046a0f; font-weight: 700; margin-bottom: 15px;">Programs Management</h1>
            <ol class="breadcrumb" style="background-color: #ffffff; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <li><a href="home.php" style="color: #046a0f;"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Programs</li>
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
                                <i class="fa fa-book" style="margin-right: 10px;"></i> Program & Section Management
                            </h3>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#addCourseModal" style="background-color: #046a0f; border-color: #035a0d; padding: 5px 12px; font-weight: 600; transition: all 0.3s ease;">
                                    <i class="fa fa-plus"></i> Add Program
                                </button>
                            </div>
                        </div>

                        <div class="box-body" style="padding: 20px; background-color: #fff; border-radius: 0 0 8px 8px;">
                            <div class="table-responsive">
                                <table id="courses-table" class="table table-bordered table-hover" style="width: 100%;">
                                    <thead style="background-color: #046a0f; color: white;">
                                        <tr>
                                            <th width="50%">Program</th>
                                            <th width="25%">Year and Section</th>
                                            <th width="25%">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php 
                                        if ($courses_result->num_rows > 0) {
                                            while ($row = $courses_result->fetch_assoc()): 
                                        ?>
                                        <tr>
                                            <td style="vertical-align: middle;"><strong><?php echo htmlspecialchars($row['course']); ?></strong></td>
                                            <td style="vertical-align: middle;"><?php echo htmlspecialchars($row['year_section']); ?></td>
                                            <td style="vertical-align: middle;">
                                                <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#updateModal<?php echo $row['id']; ?>" style="margin-right: 5px; background-color: #046a0f; border-color: #035a0d; transition: all 0.3s ease;">
                                                    <i class="fa fa-edit"></i> Edit
                                                </button>
                                                <form method="POST" action="" style="display:inline;">
                                                    <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                                                    <button type="submit" name="delete" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to delete this course? This action cannot be undone.');" style="transition: all 0.3s ease;">
                                                        <i class="fa fa-trash"></i> Delete
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>

                                        <!-- Update Modal -->
                                        <div class="modal fade" id="updateModal<?php echo $row['id']; ?>" tabindex="-1" role="dialog">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content" style="border-radius: 8px; overflow: hidden; border: none; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                                    <div class="modal-header" style="background-color: #046a0f; color: #fff; border-bottom: none; padding: 15px 20px;">
                                                        <button type="button" class="close" data-dismiss="modal" style="color: #fff; opacity: 0.8;">&times;</button>
                                                        <h4 class="modal-title"><i class="fa fa-edit"></i> Update Course</h4>
                                                    </div>
                                                    <form method="POST" action="">
                                                        <div class="modal-body" style="background-color: #fff; padding: 20px;">
                                                            <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                                                            <div class="form-group">
                                                                <label style="color: #046a0f; font-weight: 600;">Program Name:</label>
                                                                <input type="text" name="course" class="form-control" value="<?php echo htmlspecialchars($row['course']); ?>" required style="border: 1px solid #d0e0d0; border-radius: 4px; padding: 8px 12px;">
                                                            </div>
                                                            <div class="form-group">
                                                                <label style="color: #046a0f; font-weight: 600;">Year and Section:</label>
                                                                <input type="text" name="year_section" class="form-control" value="<?php echo htmlspecialchars($row['year_section']); ?>" required style="border: 1px solid #d0e0d0; border-radius: 4px; padding: 8px 12px;">
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer" style="background-color: #f0fdf0; border-top: 1px solid #e0f0e0; padding: 15px 20px;">
                                                            <button type="button" class="btn btn-default" data-dismiss="modal" style="background-color: #777; color: #fff; border: none;">Cancel</button>
                                                            <button type="submit" name="update" class="btn btn-success" style="background-color: #046a0f; border-color: #035a0d;">Save Changes</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <?php 
                                            endwhile; 
                                        } else {
                                            echo "<tr><td colspan='3' class='text-center' style='padding: 20px; color: #777;'>No courses found</td></tr>";
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

    <!-- Add Course Modal -->
    <div class="modal fade" id="addCourseModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="border-radius: 8px; overflow: hidden; border: none; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                <div class="modal-header" style="background-color: #046a0f; color: #fff; border-bottom: none; padding: 15px 20px;">
                    <button type="button" class="close" data-dismiss="modal" style="color: #fff; opacity: 0.8;">&times;</button>
                    <h4 class="modal-title"><i class="fa fa-plus-circle"></i> Add New Course</h4>
                </div>
                <form method="POST" action="">
                    <div class="modal-body" style="background-color: #fff; padding: 20px;">
                        <div class="form-group">
                            <label style="color: #046a0f; font-weight: 600;">Program Name:</label>
                            <input type="text" name="course" class="form-control" placeholder="e.g. Bachelor of Science in Information Technology" required style="border: 1px solid #d0e0d0; border-radius: 4px; padding: 8px 12px;">
                        </div>
                        <div class="form-group">
                            <label style="color: #046a0f; font-weight: 600;">Year and Section:</label>
                            <input type="text" name="year_section" class="form-control" placeholder="e.g. 2nd Year - A" required style="border: 1px solid #d0e0d0; border-radius: 4px; padding: 8px 12px;">
                        </div>
                    </div>
                    <div class="modal-footer" style="background-color: #f0fdf0; border-top: 1px solid #e0f0e0; padding: 15px 20px;">
                        <button type="button" class="btn btn-default" data-dismiss="modal" style="background-color: #777; color: #fff; border: none;">Cancel</button>
                        <button type="submit" name="add" class="btn btn-success" style="background-color: #046a0f; border-color: #035a0d;">Add Course</button>
                    </div>
                </form>
            </div>
        </div>
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
.btn-danger:hover {
    background-color: #c9302c;
}
.form-control:focus {
    border-color: #046a0f;
    box-shadow: 0 0 0 2px rgba(4, 106, 15, 0.25);
}
</style>

<?php include 'includes/scripts.php'; ?>
<script>
$(function() {
    // First, check if DataTable is already initialized and destroy it if so
    if ($.fn.DataTable.isDataTable('#courses-table')) {
        $('#courses-table').DataTable().destroy();
    }
    
    // Then initialize the DataTable
    $('#courses-table').DataTable({
        'responsive': true,
        'autoWidth': false,
        'language': {
            'search': 'Search Courses:',
            'lengthMenu': 'Show _MENU_ entries per page',
            'zeroRecords': 'No matching courses found',
            'info': 'Showing _START_ to _END_ of _TOTAL_ courses',
            'infoEmpty': 'Showing 0 to 0 of 0 courses',
            'infoFiltered': '(filtered from _MAX_ total courses)'
        },
        'pagingType': 'full_numbers',
        'dom': '<"top"lf>rt<"bottom"ip><"clear">',
        'order': [[0, 'asc'], [1, 'asc']],  // Sort by course, then by year_section
        'drawCallback': function() {
            $('.dataTables_paginate > .pagination').addClass('pagination-sm');
        }
    });
});
</script>
</body>
</html>