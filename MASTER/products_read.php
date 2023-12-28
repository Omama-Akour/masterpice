<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

// ----------------------------------------------------------------------------------
// ----------------------------GET METHOD TO SELECT ALL THE PRODUCTS-----------------
// ----------------------------------------------------------------------------------

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    try {
        $query = "SELECT * FROM products;";
        $result = $mysqli->query($query);

        if ($result) {
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }

            header("Content-Type: application/json");
            echo json_encode($data);
        } else {
            echo json_encode(['message' => 'Error in query execution']);
        }
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }
}

// ----------------------------------------------------------------------------------
// ----------------------------POST METHOD TO SELECT BY PRODUCT ID-------------------
// ----------------------------------------------------------------------------------

elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        $query = "SELECT * FROM products WHERE id = ? ;";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("i", $data['id']);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if ($row) {
            echo json_encode($row);
        } else {
            echo json_encode(['message' => 'No records found']);
        }
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }
} else {
    echo json_encode(['message' => 'Incorrect request method']);
}
?>
