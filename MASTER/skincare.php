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
        $query = "SELECT * , products.id as product_id  , products.name as product_name  FROM products join categories on products.category_id = categories.id
        where categories.id = 2";
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
