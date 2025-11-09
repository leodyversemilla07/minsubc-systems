<?php
session_start();
require 'conn.php';

// Check if user is logged in and has access
if (!isset($_SESSION['election_id'])) {
    header('HTTP/1.1 403 Forbidden');
    exit('Access denied');
}

// Get the election ID from the session
$election_id = $_SESSION['election_id'];

// Get election name for the file title
$election_query = "SELECT name FROM elections WHERE id = ?";
$stmt = $conn->prepare($election_query);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$result = $stmt->get_result();
$election = $result->fetch_assoc();
$election_name = $election ? $election['name'] : 'Election';

// Set timezone to Manila/Philippines
date_default_timezone_set('Asia/Manila');
$current_date = date('F j, Y, g:i a');
$current_date_short = date('Y-m-d H:i:s');

// Set headers for Excel file download with Office XML
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="' . $election_name . '_All_Voter_Codes.xls"');
header('Cache-Control: max-age=0');
header("Pragma: public");
header("Expires: 0");
header("Content-Transfer-Encoding: binary");

// Create HTML for Excel with filterable table
echo '<!DOCTYPE html>';
echo '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
echo '<head>';
echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
echo '<title>All Voter Codes - ' . $election_name . '</title>';
echo '<!--[if gte mso 9]>';
echo '<xml>';
echo '<x:ExcelWorkbook>';
echo '<x:ExcelWorksheets>';
echo '<x:ExcelWorksheet>';
echo '<x:Name>Voter Codes</x:Name>';
echo '<x:WorksheetOptions>';
echo '<x:DisplayGridlines/>';
echo '<x:FilterPrivacy/>';
echo '<x:FreezePanes/>';
echo '<x:FrozenNoSplit/>';
echo '<x:SplitHorizontal>1</x:SplitHorizontal>';
echo '<x:TopRowBottomPane>1</x:TopRowBottomPane>';
echo '<x:ActivePane>2</x:ActivePane>';
echo '</x:WorksheetOptions>';
echo '</x:ExcelWorksheet>';
echo '</x:ExcelWorksheets>';
echo '</x:ExcelWorkbook>';
echo '</xml>';
echo '<![endif]-->';

// Add improved styles for better readability
echo '<style>';
echo 'body { font-family: Arial, sans-serif; font-size: 14pt; }';
echo 'table { border-collapse: collapse; width: 100%; font-size: 14pt; }';
echo 'th { 
    background-color: #4CAF50; 
    color: white; 
    font-weight: bold; 
    text-align: center; 
    padding: 12px; 
    border: 2px solid #000;
    font-size: 16pt;
}';
echo 'td { 
    mso-number-format:"\\@"; 
    border: 1px solid #000; 
    padding: 10px; 
    font-size: 14pt;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
}';
echo 'tr:nth-child(even) { background-color: #f0f0f0; }';
echo '.header { 
    font-size: 24pt; 
    font-weight: bold; 
    margin-bottom: 10px;
    color: #2C3E50;
}';
echo '.subheader { 
    font-size: 14pt; 
    margin-bottom: 20px;
    color: #7F8C8D;
}';
echo '.summary {
    margin-top: 20px;
    font-size: 14pt;
    font-weight: bold;
}';
echo '</style>';
echo '</head>';
echo '<body>';

// Add header with election name
echo '<div class="header">' . $election_name . ' - All Voter Codes</div>';
echo '<div class="subheader">Generated on: ' . $current_date_short . ' (Manila Time)</div>';

// Create filterable table
echo '<table border="1">';
echo '<thead>';
echo '<tr>';
echo '<th style="width: 10%;">No.</th>';
echo '<th style="width: 60%;">Voter Code</th>';
echo '<th style="width: 30%;">Batch</th>';
echo '</tr>';
echo '</thead>';
echo '<tbody>';

// Get all voter codes for this election
$sql = "SELECT * FROM voters WHERE election_id = ? ORDER BY prefix, voters_id";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $election_id);
$stmt->execute();
$result = $stmt->get_result();

// Counter for row numbers
$counter = 1;

// Output all voter codes
while ($row = $result->fetch_assoc()) {
    echo '<tr>';
    echo '<td style="text-align: center;">' . $counter . '</td>';
    echo '<td style="text-align: center; letter-spacing: 1px;">' . $row['voters_id'] . '</td>';
    echo '<td>' . $row['prefix'] . '</td>';
    echo '</tr>';
    $counter++;
}

echo '</tbody>';
echo '</table>';

// Add summary at bottom
echo '<div class="summary">';
echo 'Total Voter Codes: ' . ($counter - 1) . '<br>';
echo 'Election: ' . $election_name . '<br>';
echo 'Date Generated: ' . $current_date . ' (Manila Time)<br>';
echo '</div>';

echo '</body>';
echo '</html>';
?>