<?php
require 'conn.php';
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate and sanitize input
    $partylistName = isset($_POST['partylistName']) ? trim($_POST['partylistName']) : '';

    if (!empty($partylistName)) {
        // Get the current election ID from the session
        $election_id = $_SESSION['election_id'];

        // Insert the new partylist into the database
        $stmt = $conn->prepare("INSERT INTO partylists (name, election_id) VALUES (?, ?)");
        $stmt->bind_param("si", $partylistName, $election_id);

        if ($stmt->execute()) {
            // Redirect back to the partylist page with a success message
            header("Location: partylist.php?success=Partylist added successfully");
            exit();
        } else {
            // Handle database errors
            die("Error adding partylist: " . $stmt->error);
        }
    } else {
        // Redirect back with an error message if the name is empty
        header("Location: partylist.php?error=Partylist name cannot be empty");
        exit();
    }
} else {
    // Redirect back if the request method is not POST
    header("Location: partylist.php");
    exit();
}
?>
