<?php
include 'includes/session.php';

// Ensure the candidate ID and position ID are provided
if (isset($_GET['candidate_id']) && isset($_GET['position_id'])) {
    $candidate_id = $_GET['candidate_id'];
    $position_id = $_GET['position_id'];

    // Fetch candidate details from the database
    $sql = "SELECT c.firstname, c.lastname, p.description AS position_description 
            FROM candidates c 
            JOIN positions p ON c.position_id = p.id 
            WHERE c.id = '$candidate_id' AND p.id = '$position_id'";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $candidate = $result->fetch_assoc();
        echo json_encode($candidate); // Return candidate details as JSON
    } else {
        echo json_encode(['error' => 'Candidate not found.']);
    }
} else {
    echo json_encode(['error' => 'Invalid request.']);
}
?>
