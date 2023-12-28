<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $sql = "SELECT orders.*, users.name 
            FROM orders
            INNER JOIN users ON orders.user_id = users.id";

    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        $orders = array();
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
        echo json_encode($orders);
    } else {
        echo json_encode(array("message" => "No order records found."));
    }
} elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
    
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id'])) {
        $orderid = $data['id'];
        $sql = "SELECT orders.*, users.name 
                FROM orders
                INNER JOIN users ON orders.user_id = users.id
                WHERE orders.id = $orderid";
        $result = $mysqli->query($sql);
        if ($result->num_rows > 0) {
            $order = $result->fetch_assoc();
            echo json_encode($order);
        } else {
            echo json_encode(array("message" => "Order with the provided ID not found."));
        }
    } else {
        echo json_encode(array("error" => "Please provide the order ID."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method."));
}

$mysqli->close();

?>
