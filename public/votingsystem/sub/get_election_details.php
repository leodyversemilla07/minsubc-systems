<?php
session_start();
include 'conn.php';

// Check if user is logged in
if (!isset($_SESSION['admin_id']) && !isset($_SESSION['voter_id'])) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unauthorized access']);
    exit();
}

if (isset($_POST['id'])) {
    $id = intval($_POST['id']);
    
    // Prepare statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM history WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $election = $result->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($election);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Election not found']);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No election ID provided']);
}