<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Position</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Poppins', sans-serif;
            color: #333;
        }
        .container {
            max-width: 500px;
            margin-top: 50px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 128, 0, 0.5);
        }
        .form-control {
            background: #f0f0f0;
            border: 1px solid #28a745;
            color: #333;
        }
        .btn-custom {
            background: #28a745;
            color: white;
            font-weight: bold;
            border: none;
        }
        .btn-custom:hover {
            background: #218838;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 class="text-center">Edit Position</h2>
        <?php
        require 'conn.php';

        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sql = "SELECT * FROM positions WHERE position_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $position = $result->fetch_assoc();
        }

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $id = $_POST['id'];
            $description = $_POST['description'];
            $max_vote = $_POST['max_vote'];

            $sql = "UPDATE positions SET description = ?, max_vote = ? WHERE position_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sii", $description, $max_vote, $id);
            if ($stmt->execute()) {
              header("Location: positions.php"); // 🔄 Redirect to positions.php after update
              exit; // 🚀 Ensure script stops execution after redirection
                        } else {
                echo "<div class='alert alert-danger'>Error updating position.</div>";
            }
        }
        ?>

        <form method="POST" action="">
            <input type="hidden" name="id" value="<?php echo $position['position_id']; ?>">
            <div class="form-group mb-3">
                <label>Description</label>
                <input type="text" class="form-control" name="description" value="<?php echo $position['description']; ?>" required>
            </div>
            <div class="form-group mb-3">
                <label>Max Vote</label>
                <input type="number" class="form-control" name="max_vote" value="<?php echo $position['max_vote']; ?>" required>
            </div>
            <button type="submit" class="btn btn-custom w-100">Update Position</button>
            <a href="positions.php" class="btn btn-secondary w-100 mt-2">Cancel</a>
        </form>
    </div>
</body>
</html>
