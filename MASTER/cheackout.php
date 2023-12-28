<?php

include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

//////////////////////////
// {
//     "id":"1"
//         }
////////////////////////////

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if ($data === null) {
        echo json_encode(["error" => "Invalid JSON data."]);
        exit;
    }

    $user_id = $data['id'];

    // Calculate total price
    $sql = "SELECT SUM(products.price * carts.quantity) as total FROM products
            JOIN carts ON products.id = carts.product_id
            WHERE carts.user_id = $user_id";

    $result = $mysqli->query($sql);

    if ($result === false) {
        echo json_encode(["error" => "Error in total calculation: " . $mysqli->error]);
        exit;
    }

    $row = $result->fetch_assoc();
    $total = $row["total"];

    // Check if total is null or not
    if ($total === null) {
        echo json_encode(["error" => "Total price is NULL. There might be no items in the cart."]);
        exit;
    }

    // Retrieve cart items
    $sql = "SELECT products.id, products.name, products.image, products.description, 
                   products.price, products.category_id, carts.quantity
            FROM products
            JOIN carts ON products.id = carts.product_id
            WHERE carts.user_id = $user_id";

    $result = $mysqli->query($sql);

    if ($result === false) {
        echo json_encode(["error" => "Error in retrieving cart items: " . $mysqli->error]);
        exit;
    }

    $cart = $result->fetch_all(MYSQLI_ASSOC);

    // Empty the cart
    $sql = "DELETE FROM carts WHERE user_id = $user_id";

    if (!$mysqli->query($sql)) {
        echo json_encode(["error" => "Error in deleting cart items: " . $mysqli->error]);
        exit;
    }

    // Insert into orders
    try {
        $sql = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
        $stmt = $mysqli->prepare($sql);

        if (!$stmt) {
            echo json_encode(["error" => "Error in order insertion: " . $mysqli->error]);
            exit;
        }

        // Check if total is not null before binding parameters
        if ($total !== null) {
            $stmt->bind_param("ii", $user_id, $total);
        } else {
            echo json_encode(["error" => "Total price is NULL. There might be no items in the cart."]);
            exit;
        }

        if ($stmt->execute()) {
            echo json_encode(["success" => "Order placed successfully."]);
        } else {
            echo json_encode(["error" => "Error in order insertion: " . $stmt->error]);
        }

        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(["error" => "Error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "This endpoint only accepts POST requests."]);
}
?>
