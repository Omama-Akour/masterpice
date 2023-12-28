<?php
//////////////////////////////////////////////////////////////////////
///////////////////send :id  ///////////////////////////////////////// 
/////////////////to delete the user /////////////////////////////////
//////////////////////////////////////////////////////////////////////

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
    // Retrieve the user_id from the request body
    $data = json_decode(file_get_contents('php://input'), true);
    $user_id = $data['id'];

    if (!empty($user_id)) {
        $sql = "DELETE FROM users WHERE id = $user_id"; 

        if ($mysqli->query($sql) === TRUE) {
            echo json_encode(array("message" => "User record deleted successfully."));
        } else {
            echo json_encode(array("error" => "Error: " . $mysqli->error));
        }
    } else {
        echo json_encode(array("message" => "No ID provided for deletion."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method. Please use DELETE method."));
}

$mysqli->close();
?>
