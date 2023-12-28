<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
/////////////////////////////////
// {
//     "user_id":"1"
//         }
///////////////////////////////////

include "connect.php";

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    try {
        // Get JSON data from the request
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);

        // Prepare and execute the query using mysqli
        $query = "SELECT `updated_at`, total_price FROM `orders` WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1;";
        $stmt = $mysqli->prepare($query);

        // Bind parameters
        $stmt->bind_param("i", $data['user_id']);
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        // Fetch the associative array
        $row = $result->fetch_assoc();

        // Check if result exists
        if ($row) {
            echo json_encode($row);
        }
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    } finally {
        // Close the statement
        $stmt->close();
    }
} else {
    // If the request method is not POST, return an error message
    echo json_encode(['message' => 'Incorrect request method']);
}
?>
