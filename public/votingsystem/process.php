<?php
session_start();
include 'includes/conn.php';

if (isset($_POST['voter'])) {
    $voter = $_POST['voter'];

    // Query voter and election details
    $stmt = $conn->prepare("SELECT v.*, e.status, e.id AS election_id
                            FROM voters v
                            JOIN elections e ON v.election_id = e.id
                            WHERE v.voters_id = ?");
    $stmt->bind_param("s", $voter);
    $stmt->execute();
    $query = $stmt->get_result();

    if ($query->num_rows < 1) {
        $_SESSION['error'] = 'Cannot find voter with the provided ID';
        header('Location: index.php');
        exit();
    }

    $row = $query->fetch_assoc();
    $election_id = $row['election_id'];
    $election_status = $row['status'];

    if (isset($_POST['login'])) {
        // Check if election is active
        if ($election_status != 1) {
            $_SESSION['error'] = 'This election has not started yet or has ended';
            header('Location: index.php');
            exit();
        }

        // Store voter session and redirect to verification
        $_SESSION['voter'] = $row['id'];
        $_SESSION['election_id'] = $election_id;
        header('Location: verification.php');
        exit();
    }

    if (isset($_POST['result'])) {
        // Check if election is active
        if ($election_status != 1) {
            $_SESSION['error'] = 'This election has not started yet or has ended';
            header('Location: index.php');
            exit();
        }

        // Redirect to results page with election ID
        header("Location: result.php?election_id=" . $election_id);
        exit();
    }
} else {
    $_SESSION['error'] = 'Please enter a voter ID!';
    header("Location: index.php");
    exit();
}
?>