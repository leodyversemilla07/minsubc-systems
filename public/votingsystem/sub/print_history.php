<?php
session_start();

// Include the database connection
include 'conn.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Fetch deleted election details
    $sql = "SELECT * FROM history WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    echo "<!DOCTYPE html>";
    echo "<html lang='en'>";
    echo "<head>";
    echo "<meta charset='UTF-8'>";
    echo "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    echo "<title>Print Election Results</title>";
    echo "<style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h2, h4, p {
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table th, table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        table th {
            background-color: #f4f4f4;
            font-weight: bold;
        }
        tfoot tr {
            background-color: #f9f9f9;
            font-weight: bold;
        }
    </style>";
    echo "</head>";
    echo "<body>";

    echo "<h2>Election Results Summary</h2>";
    echo "<h4>Election Name: " . htmlspecialchars($row['election_title']) . "</h4>";
    echo "<p>Date: " . htmlspecialchars($row['deleted_at']) . "</p>";

    // Display the vote summary
    function displayVoteSummary($votes, $candidates, $positions) {
        if (empty($votes) || empty($candidates) || empty($positions)) {
            echo "<p>No voting data available.</p>";
            return;
        }

        $voteRecords = explode(";", $votes);
        $candidateRecords = explode(";", $candidates);
        $positionRecords = explode(";", $positions);

        // Create arrays to store vote counts and candidate details
        $voteCounts = [];
        $candidateDetails = [];
        $positionDetails = [];

        // Process candidates
        foreach ($candidateRecords as $candidate) {
            $data = explode("|", $candidate);
            if (count($data) >= 4) {
                $candidateDetails[$data[0]] = [
                    'name' => $data[2] . " " . $data[3],
                    'position_id' => $data[1]
                ];
            }
        }

        // Process positions
        foreach ($positionRecords as $position) {
            $data = explode("|", $position);
            if (count($data) >= 2) {
                $positionDetails[$data[0]] = $data[1];
            }
        }

        // Count votes
        foreach ($voteRecords as $vote) {
            $data = explode("|", $vote);
            if (count($data) >= 3) {
                $candidate_id = $data[2];
                $position_id = $data[3];

                if (!isset($voteCounts[$position_id][$candidate_id])) {
                    $voteCounts[$position_id][$candidate_id] = 0;
                }
                $voteCounts[$position_id][$candidate_id]++;
            }
        }

        // Display results by position
        foreach ($positionDetails as $position_id => $position_name) {
            echo "<h4>$position_name</h4>";
            if (isset($voteCounts[$position_id])) {
                // Sort candidates by vote count
                arsort($voteCounts[$position_id]);

                // Calculate total votes for this position
                $totalVotes = array_sum($voteCounts[$position_id]);

                echo "<table>";
                echo "<thead>";
                echo "<tr>
                        <th>Rank</th>
                        <th>Candidate</th>
                        <th>Votes</th>
                        <th>Percentage</th>
                    </tr>";
                echo "</thead>";
                echo "<tbody>";

                $rank = 1;
                foreach ($voteCounts[$position_id] as $candidate_id => $votes) {
                    if (isset($candidateDetails[$candidate_id])) {
                        $percentage = ($totalVotes > 0) ? round(($votes / $totalVotes) * 100, 2) : 0;

                        echo "<tr>";
                        echo "<td>" . $rank . "</td>";
                        echo "<td>" . htmlspecialchars($candidateDetails[$candidate_id]['name']) . "</td>";
                        echo "<td>" . $votes . "</td>";
                        echo "<td>" . $percentage . "%</td>";
                        echo "</tr>";
                        $rank++;
                    }
                }
                echo "</tbody>";
                echo "<tfoot>";
                echo "<tr>
                        <td colspan='2'><strong>Total Votes:</strong></td>
                        <td><strong>" . $totalVotes . "</strong></td>
                        <td><strong>100%</strong></td>
                    </tr>";
                echo "</tfoot>";
                echo "</table>";
            } else {
                echo "<p>No votes recorded for this position.</p>";
            }
        }
    }

    displayVoteSummary($row['votes'], $row['candidates'], $row['positions']);

    echo "</body>";
    echo "</html>";
}
?>
