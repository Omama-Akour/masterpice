<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';

// ----------------------------------------------------------------------------------
// ----------------------------POST METHOD TO ADD A PRODUCT TO carts-------------------
// ------------------------------------FOR A SPECIFIC USER AND PRODUCT-----------------
// ----------------------------------------------------------------------------------
// localhost\API\server\carts_add.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        $user_id = $data['user_id'];
        $product_id = $data['id'];
        $AddorSub = $data['AddorSub'];

        // Assuming quantity is provided in the request
        $quantity = 1; // Default value, you may modify this based on your needs

        // Fetch product details including price
        $productQuery = "SELECT price FROM products WHERE id  = ?";
        $stmtProduct = $mysqli->prepare($productQuery);
        $stmtProduct->bind_param("i", $product_id);
        $stmtProduct->execute();
        $stmtProduct->bind_result($price);
        $stmtProduct->fetch();
        $stmtProduct->close();

        // Check if the product already exists in the carts for the specified user
        $existingProductQuery = "SELECT * FROM `carts` WHERE `user_id` = ? AND `product_id` = ?";
        $stmtExistingProduct = $mysqli->prepare($existingProductQuery);
        $stmtExistingProduct->bind_param("ii", $user_id, $product_id);
        $stmtExistingProduct->execute();
        $existingProduct = $stmtExistingProduct->get_result()->fetch_assoc();
        $stmtExistingProduct->close();
        
        
        if ($AddorSub == "add") {
            if ($existingProduct) {
                // If the product already exists, update the quantity
                $updateQuery = "UPDATE carts SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?";
                $stmtUpdate = $mysqli->prepare($updateQuery);
                $stmtUpdate->bind_param("ii", $user_id, $product_id);
                $stmtUpdate->execute();
                echo json_encode(['message' => 'Product quantity updated in the carts.', 'price' => $price]);
            } else {
                // If the product doesn't exist, insert a new record
                $insertQuery = "INSERT INTO carts (user_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
                $stmtInsert = $mysqli->prepare($insertQuery);
                $stmtInsert->bind_param("iiid", $user_id, $product_id, $quantity, $price);
                $stmtInsert->execute();
                echo json_encode(['message' => 'Product added to the carts successfully.', 'price' => $price]);
            }
        } else {
            // Subtraction logic
            if ($existingProduct && $quantity > 0) {
                // If the product exists and quantity is greater than 1, update the quantity
                $updateQuery = "UPDATE carts SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?";
                $stmtUpdate = $mysqli->prepare($updateQuery);
                $stmtUpdate->bind_param("ii", $user_id, $product_id);
                $stmtUpdate->execute();
                echo json_encode(['message' => 'Product quantity updated in the carts.', 'price' => $price]);
            } elseif ($existingProduct && $quantity == 1) {
                // If the product exists and quantity is 1, you may choose to remove the product or handle it as needed
                $deleteQuery = "DELETE FROM carts WHERE user_id = ? AND product_id = ?";
                $stmtDelete = $mysqli->prepare($deleteQuery);
                $stmtDelete->bind_param("ii", $user_id, $product_id);
                $stmtDelete->execute();
                echo json_encode(['message' => 'Product quantity is already 1. The product has been removed.', 'price' => $price]);
            } else {
                // If the product doesn't exist, you may handle it as needed
                echo json_encode(['message' => 'Product does not exist in the carts.', 'price' => $price]);
            }
        }
    } 
    catch (mysqli_sql_exception $e) {
        die("Error: " . $e->getMessage());
    }
    
    $mysqli->close();
}
?>
