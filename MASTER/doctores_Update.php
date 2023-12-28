<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Read JSON data from the request body
    $json_data = json_decode(file_get_contents('php://input'), true);

    if ($json_data && isset($json_data['user_id'])) {
        $user_id = $json_data['user_id'];
        $name = $json_data['name'];
        $email = $json_data['email'];
        $password = $json_data['password'];
        
        $specialization = $json_data['specialization'];
        $description = $json_data['description'];

        // Perform the update using a single query
        $sql_update = "UPDATE users
                        INNER JOIN doctors ON users.id = doctors.user_id
                        SET users.name='$name', users.email='$email', users.password='$password', doctors.specialization='$specialization',
                            doctors.description='$description'
                        WHERE users.id = $user_id";

        // Execute the query
        $result = $mysqli->query($sql_update);

        if ($result) {
            echo json_encode(array("message" => "User and Doctor information updated successfully"));
        } else {
            echo json_encode(array("error" => "Error updating information"));
        }
    } else {
        echo json_encode(array("error" => "Invalid JSON data or missing user_id"));
    }
} else {
    echo json_encode(array("error" => "Invalid request method. Expected PUT."));
}

$mysqli->close();
?>
