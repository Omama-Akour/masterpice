<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
///////////////////
// "id":3
///////////////////
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if (isset($data['id'])) {
        
        $userid = $data['id'];
        $sql = "SELECT name, email, password FROM users WHERE id = $userid";
        $result = $mysqli->query($sql);
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            echo json_encode($user);
        } else {
            echo json_encode(array("message" => "user with the provided ID not found."));
        }
    } else {
        echo json_encode(array("error" => "Please provide the user ID."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method."));
}
// $conn->close();
?>
