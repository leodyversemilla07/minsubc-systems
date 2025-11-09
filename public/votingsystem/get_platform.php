<?php
include 'includes/session.php';
header('Content-Type: application/json');

// Check if candidate_id is provided
if (!isset($_GET['candidate_id']) || empty($_GET['candidate_id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Candidate ID is required'
    ]);
    exit();
}

$candidate_id = $_GET['candidate_id'];

// Fetch candidate platform data
$stmt = $conn->prepare("
    SELECT c.id, c.firstname, c.lastname, c.photo, c.platform, 
           p.name AS partylist_name 
    FROM candidates c
    LEFT JOIN partylists p ON c.partylist_id = p.partylist_id
    WHERE c.id = ?
");
$stmt->bind_param("i", $candidate_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $candidate = $result->fetch_assoc();
    
    // Parse platform data (assuming it's stored as text)
    $platformText = $candidate['platform'];
    
    // Create a structured response
    $platformData = [
        'vision' => '',
        'mission' => '',
        'points' => [],
        'background' => ''
    ];
    
    // Try to parse JSON if the platform is in JSON format
    if (!empty($platformText)) {
        $jsonData = json_decode($platformText, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($jsonData)) {
            // If valid JSON, use the structure
            $platformData = $jsonData;
        } else {
            // Otherwise use the text as a single entry
            $platformData['vision'] = $platformText;
        }
    }
    
    echo json_encode([
        'success' => true,
        'candidate' => [
            'id' => $candidate['id'],
            'name' => $candidate['firstname'] . ' ' . $candidate['lastname'],
            'photo' => $candidate['photo'],
            'partylist' => $candidate['partylist_name']
        ],
        'platform' => $platformData
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Candidate not found'
    ]);
}
?>