<?php
include 'includes/session.php';

if(isset($_POST['subadmin'])){
    $subadmin_id = $_POST['subadmin'];

    // Delete sub-admin from the database
    $sql = "DELETE FROM sub_admins WHERE id = '$subadmin_id'";
    if($conn->query($sql)){
        $_SESSION['success'] = 'Sub-admin deleted successfully';
    }
    else{
        $_SESSION['error'] = $conn->error;
    }
}
else{
    $_SESSION['error'] = 'Select sub-admin to delete first';
}

header('location: sub_admins.php');
exit();
?>
