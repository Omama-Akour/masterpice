<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT doctors.user_id, users.name, users.email, users.password, doctors.image, doctors.specialization, doctors.description, doctors.created_at, doctors.updated_at
            FROM doctors
            INNER JOIN users ON doctors.user_id = users.id";
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) { 
        $events = array();
        while ($row = $result->fetch_assoc()) {
            $events[] = $row;
        }
        echo json_encode($events);
    } else {
        echo json_encode(array("message" => "No user records found."));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['user_id'])) {
        $Id = $data['user_id'];
        $sql = "SELECT doctors.id, users.name, users.email, users.password, doctors.image, doctors.specialization, doctors.description, doctors.created_at, doctors.updated_at
                FROM doctors
                INNER JOIN users ON doctors.user_id = users.id
                WHERE doctors.user_id = $Id"; // Corrected the WHERE clause
        $result = $mysqli->query($sql);

        if ($result->num_rows > 0) {  
            $event = $result->fetch_assoc();
            echo json_encode($event);
        } else {
            echo json_encode(array("message" => "User with the provided ID not found."));
        }
    } else {
        echo json_encode(array("error" => "Please provide the user ID."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method."));
}

$mysqli->close();
?>
