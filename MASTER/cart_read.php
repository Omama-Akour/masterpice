<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

// ----------------------------------------------------------------------------------
// ----------------------------GET METHOD TO SELECT ALL THE CART PRODUCTS------------
// ------------------------------------FOR EVERY USER--------------------------------
// ----------------------------------------------------------------------------------

if ($_SERVER["REQUEST_METHOD"] == "GET" || $_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        $query = "SELECT products.id, products.image, products.name, products.price, carts.quantity
                  FROM carts
                  JOIN products ON carts.product_id = products.id
                  WHERE carts.user_id = ?
                  LIMIT 0, 25";

        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("i", $data['id']);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $output = array();
            while ($row = $result->fetch_assoc()) {
                $output[] = $row;
            }
            echo json_encode($output);
        } else {
            echo json_encode(['message' => 'No products found in the cart for the specified user.']);
        }

        $stmt->close();
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }
}
?>
        

