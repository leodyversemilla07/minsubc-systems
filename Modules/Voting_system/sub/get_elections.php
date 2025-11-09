<?php
session_start();
include 'conn.php';

// Check if user is logged in
if (!isset($_SESSION['admin_id']) && !isset($_SESSION['voter_id'])) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unauthorized access']);
    exit();
}

// Default values
$page = isset($_POST['page']) ? intval($_POST['page']) : 1;
$limit = isset($_POST['limit']) ? intval($_POST['limit']) : 10;
$sort = isset($_POST['sort']) && $_POST['sort'] === 'ASC' ? 'ASC' : 'DESC';
$search = isset($_POST['search']) ? $_POST['search'] : '';

// Calculate offset
$offset = ($page - 1) * $limit;

// Build query
$countQuery = "SELECT COUNT(*) as total FROM history";
$dataQuery = "SELECT * FROM history";

// Add search condition if search term is provided
if (!empty($search)) {
    $searchTerm = "%{$search}%";
    $countQuery .= " WHERE election_title LIKE ? OR deleted_at LIKE ?";
    $dataQuery .= " WHERE election_title LIKE ? OR deleted_at LIKE ?";
}

// Add sorting and limit
$dataQuery .= " ORDER BY deleted_at $sort LIMIT ?, ?";

// Get total count
if (!empty($search)) {
    $stmt = $conn->prepare($countQuery);
    $stmt->bind_param("ss", $searchTerm, $searchTerm);
    $stmt->execute();
} else {
    $stmt = $conn->prepare($countQuery);
    $stmt->execute();
}
$result = $stmt->get_result();
$totalRows = $result->fetch_assoc()['total'];

// Get data for current page
if (!empty($search)) {
    $stmt = $conn->prepare($dataQuery);
    $stmt->bind_param("ssii", $searchTerm, $searchTerm, $offset, $limit);
    $stmt->execute();
} else {
    $stmt = $conn->prepare($dataQuery);
    $stmt->bind_param("ii", $offset, $limit);
    $stmt->execute();
}
$result = $stmt->get_result();

$elections = [];
while ($row = $result->fetch_assoc()) {
    $elections[] = $row;
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode([
    'total' => $totalRows,
    'elections' => $elections
]);