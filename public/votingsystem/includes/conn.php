<?php
	// Use Laravel's SQLite database
	$db_path = realpath(__DIR__ . '/../../../database/database.sqlite');
	
	try {
		$conn = new PDO('sqlite:' . $db_path);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
		die("Connection failed: " . $e->getMessage());
	}
?>