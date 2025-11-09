<?php
require 'conn.php';
session_start();

$election_id = $_SESSION['election_id'];

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    // Validate the ID
    if ($id > 0) {
        // Delete the partylist from the database
        $stmt = $conn->prepare("DELETE FROM partylists WHERE partylist_id = ? AND election_id = ?");
        $stmt->bind_param("ii", $id, $election_id);

        if ($stmt->execute()) {
            // Redirect back with a success message
            header("Location: partylist.php?success=Partylist deleted successfully");
            exit();
        } else {
            // Handle database errors
            header("Location: partylist.php?error=Failed to delete partylist");
            exit();
        }
    } else {
        // Redirect back with an error message if the ID is invalid
        header("Location: partylist.php?error=Invalid partylist ID");
        exit();
    }
} else {
    // Redirect back if no ID is provided
    header("Location: partylist.php?error=No partylist ID provided");
    exit();
}
?>