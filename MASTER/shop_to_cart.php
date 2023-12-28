<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

/////////////////////////////
// {
//     "user_id": 1,
//     "product_id": 2,
//     "quantity": 3,
//     "price": 19.99
//   }
///////////////////////////////

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Get the JSON data from the request
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        // Assuming the data structure includes user_id, product_id, quantity, price
        $user_id = $data['user_id'];
        $product_id = $data['product_id'];
        $quantity = $data['quantity'];
        $price = $data['price']; // New parameter

        // // Create a mysqli connection
        // $mysqli = new mysqli('your_host', 'your_username', 'your_password', 'your_database');

        // // Check connection
        // if ($mysqli->connect_error) {
        //     die("Connection failed: " . $mysqli->connect_error);
        // }

        // Check if the product already exists in the cart for the specified user
        $existingProductQuery = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
        $stmtExistingProduct = $mysqli->prepare($existingProductQuery);
        $stmtExistingProduct->bind_param('ii', $user_id, $product_id);
        $stmtExistingProduct->execute();

        // // Bind the result variables
        // $stmtExistingProduct->bind_result($existingProductId, $existingUserId, $existingProductId, $existingQuantity, $existingPrice);

        // Fetch the result
        $stmtExistingProduct->fetch();

        if ($existingProductId) {
            // If the product already exists, update the quantity and price
            $updateQuery = "UPDATE cart SET quantity = quantity + ?, price = ?  WHERE user_id = ? AND product_id = ?";
            $stmtUpdate = $mysqli->prepare($updateQuery);
            $stmtUpdate->bind_param('ddii', $quantity, $price, $user_id, $product_id);
            $stmtUpdate->execute();
            echo json_encode(['message' => 'Product quantity and price updated in the cart.']);
        } else {
            // If the product doesn't exist, insert a new record
            $insertQuery = "INSERT INTO cart (user_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
            $stmtInsert = $mysqli->prepare($insertQuery);
            $stmtInsert->bind_param('iiid', $user_id, $product_id, $quantity, $price);
            $stmtInsert->execute();
            echo json_encode(['message' => 'Product added to the cart successfully.']);
        }

        // Close the mysqli connection
        $mysqli->close();
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }
}
?>
