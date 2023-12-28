<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Establish a database connection using mysqli
// $mysqli = mysqli_connect('localhost', 'root', '', 'sqlmaster');
include 'connect.php';
if (!$mysqli) {
    echo json_encode(array("error" => "Connection failed."));
} else {
    // Retrieve the JSON payload from the request
    $jsonPayload = file_get_contents('php://input');
    $data = json_decode($jsonPayload, true);

    // Retrieve the product name parameter from the JSON data
    $productName = $data['name'] ;

    // Prepare the SQL query
    $query = "SELECT products.id, products.name , products.image, products.description, products.price
              FROM products
            --   INNER JOIN categories ON products.category_id = categories.id
              WHERE products.name LIKE ?";

    // Prepare the statement
    $stmt = $mysqli->prepare($query);

    if ($stmt) {
        // Bind parameters
        $stmt->bind_param('s', $productName);

        // Execute the query
        if ($stmt->execute()) {
            // Get the result
            $result = $stmt->get_result();

            // Fetch the results
            $results = $result->fetch_all(MYSQLI_ASSOC);

            // Encode the results as JSON
            $jsonResponse = json_encode($results);

            // Set the response headers
            header('Content-Type: application/json');

            // Return the JSON response
            echo $jsonResponse;
        } else {
            // Handle the error if the statement couldn't be executed
            echo json_encode(array("error" => "Error executing the SQL statement: " . $stmt->error));
        }

        // Close the statement
        $stmt->close();
    } else {
        // Handle the error if the statement couldn't be prepared
        echo json_encode(array("error" => "Error preparing the SQL statement: " . $mysqli->error));
    }

    // Close the database connection
    mysqli_close($mysqli);
}



?>