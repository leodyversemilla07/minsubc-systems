// When adding a student
$election_id = $_POST['election'];

// Get election name
$election_sql = "SELECT name FROM elections WHERE id = ?";
$stmt = $conn->prepare($election_sql);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$result = $stmt->get_result();
$election_name = $result->fetch_assoc()['name'];

// Insert student with election name
$sql = "INSERT INTO students (student_id, name, year_section, course, election_id, election_name) 
        VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssis", $student_id, $name, $year_section, $course, $election_id, $election_name);
$stmt->execute();