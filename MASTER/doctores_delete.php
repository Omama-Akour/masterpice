<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');
///////////////////
// {
//     "user_id":"16"
   
//   }
////////////////////////

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Read JSON data from the request body
    $json_data = json_decode(file_get_contents('php://input'), true);

    if ($json_data && isset($json_data['user_id'])) {
        $user_id = $json_data['user_id'];

        // Delete user
        $sql_delete_user = "DELETE FROM users WHERE id=$user_id";
        $mysqli->query($sql_delete_user);

        // Delete doctor
        $sql_delete_doctor = "DELETE FROM doctors WHERE user_id=$user_id";
        $mysqli->query($sql_delete_doctor);

        echo json_encode(array("message" => "User and associated Doctor deleted successfully"));
    } else {
        echo json_encode(array("error" => "Invalid JSON data or missing user_id"));
    }
} else {
    echo json_encode(array("error" => "Invalid request method. Expected DELETE."));
}

$mysqli->close();
?>
