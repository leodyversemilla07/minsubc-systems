<?php
	$conn = new mysqli('localhost', 'root', '', 'votingsystem5');

	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	
?>