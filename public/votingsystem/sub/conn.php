<?php
// conn.php - Use Laravel's SQLite database

// Database configuration
$db_path = realpath(__DIR__ . '/../../../database/database.sqlite');

// Create PDO connection for SQLite
try {
    $conn = new PDO('sqlite:' . $db_path);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set timeout to avoid database locked errors
    $conn->setAttribute(PDO::ATTR_TIMEOUT, 15);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
