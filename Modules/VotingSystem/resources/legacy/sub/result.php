
<?php
session_start();
require 'conn.php';

if (!isset($_SESSION['election_id'])) {
    header("Location: index.php");
    exit();
}
if (isset($_POST['back'])) {
    unset($_SESSION['election_id']);
    header("Location: ../index.php");
    exit();
}
$election_id = $_SESSION['election_id'];

// Handle ending an election
if (isset($_POST['end_election'])) {
    $conn->begin_transaction();

    try {
        $result = $conn->query("SELECT name FROM elections WHERE id = '$election_id'");
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $election_title = $row['name'];

            $history_sql = "INSERT INTO history (election_title, deleted_at, candidates, voters, votes, positions, partylists)
                            VALUES ('$election_title', NOW(),
                                (SELECT GROUP_CONCAT(CONCAT(id, '|', position_id, '|', firstname, '|', lastname, '|', photo, '|', platform, '|', partylist_id) SEPARATOR ';') FROM candidates WHERE election_id = '$election_id'),
                                (SELECT GROUP_CONCAT(CONCAT(id, '|', voters_id) SEPARATOR ';') FROM voters WHERE election_id = '$election_id'),
                                (SELECT GROUP_CONCAT(CONCAT(id, '|', voters_id, '|', candidate_id, '|', position_id, '|', timestamp) SEPARATOR ';') FROM votes WHERE election_id = '$election_id'),
                                (SELECT GROUP_CONCAT(CONCAT(position_id, '|', description, '|', max_vote) SEPARATOR ';') FROM positions WHERE election_id = '$election_id'),
                                (SELECT GROUP_CONCAT(CONCAT(partylist_id, '|', name) SEPARATOR ';') FROM partylists WHERE election_id = '$election_id'))";
            $conn->query($history_sql) or die($conn->error);
        }

        $conn->query("DELETE FROM votes WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM candidates WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM voters WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM positions WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM partylists WHERE election_id = '$election_id'") or die($conn->error);
        $conn->query("DELETE FROM elections WHERE id = '$election_id'") or die($conn->error);

        $conn->commit();
        $_SESSION['success'] = 'Election has ended and all related records have been archived.';
    } catch (Exception $e) {
        $conn->rollback();
        $_SESSION['error'] = "Failed to end election: " . $e->getMessage();
    }

    header('location: ../index.php'); // Redirect to index.php after ending the election
    exit();
}

function getVotesByPosition($election_id) {
    global $conn;
    $sql = "
        SELECT p.description AS position,
               CONCAT(c.firstname, ' ', c.lastname) AS candidate,
               COALESCE(COUNT(v.candidate_id), 0) AS total_votes,
               p.position_id
        FROM candidates c
        JOIN positions p ON c.position_id = p.position_id
        LEFT JOIN votes v ON c.id = v.candidate_id AND v.election_id = ?
        WHERE c.election_id = ?
        GROUP BY p.position_id, c.id
        ORDER BY p.position_id, total_votes DESC;
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $election_id, $election_id);
    $stmt->execute();
    return $stmt->get_result();
}

function getTotalVotesByPosition($position_id, $election_id) {
    global $conn;
    $sql = "SELECT COUNT(v.id) AS total FROM votes v
            JOIN candidates c ON v.candidate_id = c.id
            WHERE c.position_id = ? AND v.election_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $position_id, $election_id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
 return $result['total'] ?? 0;
}

$results = getVotesByPosition($election_id);
$positionsData = [];
while ($row = $results->fetch_assoc()) {
    $totalVotes = getTotalVotesByPosition($row['position_id'], $election_id);
    $votesNeeded = ceil(($totalVotes / 2) + 1);
    $positionsData[$row['position']][] = [
        'candidate' => $row['candidate'],
        'total_votes' => $row['total_votes'],
        'votes_needed' => $votesNeeded
    ];
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Election Results</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">

    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Poppins', sans-serif;
            color: #333;
            transition: background-color 0.5s ease;
        }
        .container {
            max-width: 800px;
            margin-top: 50px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 128, 0, 0.5);
            animation: fadeIn 0.5s ease;
        }
        .table thead {
            background: #28a745;
            color: white;
        }
        .table tbody tr:hover {
            background: #f1f1f1;
        }
        .navbar {
            background-color: #28a745;
        }
        .navbar-brand, .nav-link {
            color: white !important;
        }
        .navbar-nav .nav-link:hover {
            color: #00ffcc !important;
        }
        .icon {
            margin-right: 5px;
        }
        #countdown {
            background-color: #28a745;
            color: white;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.2em;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body>
    <!-- Navigation bar -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="home.php">Election Dashboard</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <form method="POST" action="">
                            <button type="submit" name="back" class="btn btn-danger">
                                <i class="fas fa-sign-out-alt icon"></i>Logout
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <h1 class="text-center">Election Results</h1>

        <!-- Countdown Timer -->
        <div id="countdown">The page will refresh in <span id="time">5</span> seconds...</div>

        <?php foreach ($positionsData as $position => $candidates): ?>
            <h2 class="mt-4"><?php echo htmlspecialchars($position); ?></h2>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Total Votes</th>
                            <th>Votes Needed to Win</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($candidates as $candidate): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($candidate['candidate']); ?></td>
                                <td><?php echo htmlspecialchars($candidate['total_votes']); ?></td>
                                <td><?php echo htmlspecialchars($candidate['votes_needed']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endforeach; ?>
    </div>

    <script>
        let countdownTime = 5; // Set countdown time in seconds
        const timeDisplay = document.getElementById('time');

        const countdownInterval = setInterval(() => {
            countdownTime--;
            timeDisplay.textContent = countdownTime;

            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                location.reload(); // Refresh the page when countdown reaches zero
            }
        }, 1000); // Update every second
    </script>
</body>
</html>