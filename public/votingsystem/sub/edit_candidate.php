<?php
session_start();
require 'conn.php';

if (!isset($_SESSION['election_id'])) {
    header("Location: index.php");
    exit();
}

$election_id = $_SESSION['election_id'];

// Fetch candidate details
if (isset($_GET['id'])) {
    $candidate_id = $_GET['id'];
    $sql = "SELECT * FROM candidates WHERE id = ? AND election_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $candidate_id, $election_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $candidate = $result->fetch_assoc();

    if (!$candidate) {
        echo "Candidate not found.";
        exit();
    }
} else {
    echo "Invalid request.";
    exit();
}

// Fetch positions
$sql_positions = "SELECT * FROM positions WHERE election_id = ?";
$stmt_positions = $conn->prepare($sql_positions);
$stmt_positions->bind_param("i", $election_id);
$stmt_positions->execute();
$positions = $stmt_positions->get_result();

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $position_id = $_POST['position_id'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $platform = $_POST['platform'];

    // Handle photo upload
    if (!empty($_FILES['photo']['name'])) {
        $photo = uploadPhoto($_FILES['photo']);
        if ($photo) {
            $sql = "UPDATE candidates SET position_id = ?, firstname = ?, lastname = ?, photo = ?, platform = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("issssi", $position_id, $firstname, $lastname, $photo, $platform, $candidate_id);
        } else {
            echo "<div class='alert alert-danger'>Error uploading photo!</div>";
        }
    } else {
        $sql = "UPDATE candidates SET position_id = ?, firstname = ?, lastname = ?, platform = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isssi", $position_id, $firstname, $lastname, $platform, $candidate_id);
    }

    if ($stmt->execute()) {
        $_SESSION['message'] = "Candidate updated successfully!";
        header("Location: candidates.php");
        exit();
    } else {
        echo "<div class='alert alert-danger'>Error updating candidate!</div>";
    }
}

// Function to handle file upload
function uploadPhoto($file) {
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($file["name"]);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Validate file type
    $allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array($imageFileType, $allowedFormats)) {
        return false;
    }

    // Move uploaded file
    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        return $targetFile;
    } else {
        return false;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Candidate</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 800px;
            background-color: #ffffff;
            color: #333;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .form-control {
            border: 1px solid #28a745;
        }
        .btn-success {
            background-color: #28a745;
            border-color: #28a745;
        }
        .btn-outline-success {
            border-color: #28a745;
            color: #28a745;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="header text-center mb-4">
            <h1 class="text-success">Edit Candidate</h1>
            <a href="candidates.php" class="btn btn-outline-success"><i class="fas fa-arrow-left"></i> Back to Candidates</a>
        </div>

        <form method="POST" action="" enctype="multipart/form-data">
            <input type="hidden" name="action" value="edit_candidate">

            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="position_id" class="form-label text-success">Position</label>
                        <select name="position_id" id="position_id" class="form-control border-success" required>
                            <?php while ($position = $positions->fetch_assoc()): ?>
                                <option value="<?php echo $position['position_id']; ?>" <?php echo ($candidate['position_id'] == $position['position_id']) ? 'selected' : ''; ?>>
                                    <?php echo $position['description']; ?>
                                </option>
                            <?php endwhile; ?>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="firstname" class="form-label text-success">First Name</label>
                        <input type="text" name="firstname" id="firstname" class="form-control border-success" value="<?php echo $candidate['firstname']; ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="lastname" class="form-label text-success">Last Name</label>
                        <input type="text" name="lastname" id="lastname" class="form-control border-success" value="<?php echo $candidate['lastname']; ?>" required>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="platform" class="form-label text-success">Platform</label>
                        <textarea name="platform" id="platform" class="form-control border-success" required><?php echo $candidate['platform']; ?></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="photo" class="form-label text-success">Photo</label>
                        <input type="file" name="photo" id="photo" class="form-control border-success" onchange="previewImage(event)">
                        <img id="imagePreview" src="<?php echo $candidate['photo']; ?>" alt="Candidate Photo" width="100" class="mt-2">
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button type="submit" class="btn btn-success">Update Candidate</button>
                <a href="candidates.php" class="btn btn-outline-success">Cancel</a>
            </div>
        </form>
    </div>

    <script>
        function previewImage(event) {
            let reader = new FileReader();
            reader.onload = function () {
                let output = document.getElementById('imagePreview');
                output.src = reader.result;
                output.style.display = 'block';
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    </script>
</body>
</html>
