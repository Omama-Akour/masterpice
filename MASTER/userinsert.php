<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data)) {
   
    $requiredFields = ['name', 'password', 'email'];
    $allFieldsPresent = true;

    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $allFieldsPresent = false;
            break;
        }
    }

    if ($allFieldsPresent) {
        // Assuming role_id is present in the incoming JSON data
        $role_id = isset($data['role_id']) ? intval($data['role_id']) : 2;

        $sql = "INSERT INTO users (name, email, password, role_id, created_at) VALUES (
            '{$data['name']}',
            '{$data['email']}',
            '{$data['password']}',
            $role_id,
            NOW()
        )";

        if ($mysqli->query($sql) === TRUE) {
            echo json_encode(array("message" => "User record created successfully."));
        } else {
            echo json_encode(array("error" => "Error: " . $mysqli->error));
        }
    } else {
        echo json_encode(array("error" => "Please provide all required fields."));
    }
} else {
    echo json_encode(array("error" => "No data received."));
}

$mysqli->close();
?>
