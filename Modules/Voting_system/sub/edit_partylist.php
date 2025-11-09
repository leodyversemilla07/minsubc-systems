<?php
require 'conn.php';
session_start();

$election_id = $_SESSION['election_id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize input
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';

    if (!empty($name) && $id > 0) {
        // Update the partylist in the database
        $stmt = $conn->prepare("UPDATE partylists SET name = ? WHERE partylist_id = ? AND election_id = ?");
        $stmt->bind_param("sii", $name, $id, $election_id);

        if ($stmt->execute()) {
            // Redirect back with a success message
            header("Location: partylist.php?success=Partylist updated successfully");
            exit();
        } else {
            // Handle database errors
            header("Location: partylist.php?error=Failed to update partylist");
            exit();
        }
    } else {
        // Redirect back with an error message if the name is empty or ID is invalid
        header("Location: partylist.php?error=Invalid input. Please try again.");
        exit();
    }
} else {
    // Redirect back if the request method is not POST
    header("Location: partylist.php");
    exit();
}
?>
