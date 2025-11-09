<?php
session_start();
require 'conn.php';

// Security check
if (!isset($_SESSION['election_id'])) {
    echo json_encode(['error' => 'Unauthorized access']);
    exit();
}

$election_id = $_SESSION['election_id'];

// Get abstain counts by position
$abstain_counts = [];
$abstain_query = "SELECT p.position_id, p.description AS position, COUNT(*) AS abstain_count 
                 FROM votes v 
                 JOIN positions p ON v.position_id = p.position_id 
                 WHERE v.candidate_id IS NULL AND v.election_id = ? 
                 GROUP BY p.position_id";
$abstain_stmt = $conn->prepare($abstain_query);
$abstain_stmt->bind_param("i", $election_id);
$abstain_stmt->execute();
$abstain_result = $abstain_stmt->get_result();

while ($row = $abstain_result->fetch_assoc()) {
    $abstain_counts[$row['position']] = $row['abstain_count'];
}

// Get votes cast count
$votes_cast_query = "SELECT COUNT(DISTINCT voters_id) AS votes_cast FROM votes WHERE election_id = ?";
$stmt = $conn->prepare($votes_cast_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$votes_cast_result = $stmt->get_result()->fetch_assoc();
$votes_cast = $votes_cast_result['votes_cast'] ?? 0;

// Return JSON response
echo json_encode([
    'abstain_counts' => $abstain_counts,
    'votes_cast' => $votes_cast
]);
?>