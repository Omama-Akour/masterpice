<?php
header("Access-Control-Allow-Origin: ");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $json_data = file_get_contents('php://input');
    error_log("Received JSON data: " . $json_data);

    $data = json_decode($json_data, true);

    if (!empty($data)) {
        $query = 'DELETE FROM `products` WHERE id=?;';
        $stmt = $mysqli->prepare($query);

        // Assuming $mysqli is your MySQLi connection variable
        $stmt->bind_param("i", $data['id']);
        $stmt->execute();
        
        if ($stmt->affected_rows > 0) {
            echo json_encode(['message' => 'Record deleted successfully']);
        } else {
            echo json_encode(['message' => 'No records deleted']);
        }

        $stmt->close();
    } else {
        echo json_encode(['message' => 'Invalid data']);
    }
} else {
    echo json_encode(['message' => 'Incorrect request method']);
}
?>
