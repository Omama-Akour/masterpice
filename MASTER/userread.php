<?php
// Set CORS headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Include the file that establishes the database connection
include 'connect.php';

// Handling GET requests to retrieve all users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM users";
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) { 
        // If there are user records
        $users = array();
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users); // Output JSON data of all users
    } else {
        echo json_encode(array("message" => "No user records found."));
    }
} 
// Handling POST requests to get a specific user by ID
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['user_id'])) {
        // Get the user ID from the request data
        $userId = $data['user_id'];
        
        // Query to fetch the user with the provided ID
        $sql = "SELECT * FROM users WHERE id = $userId";
        $result = $mysqli->query($sql);

        if ($result->num_rows > 0) {  
            // If the user with the provided ID is found
            $user = $result->fetch_assoc();
            echo json_encode($user); // Output JSON data of the found user
        } else {
            echo json_encode(array("message" => "User with the provided ID not found."));
        }
    } else {
        echo json_encode(array("error" => "Please provide the user ID."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method."));
}

// Close the database connection
$mysqli->close();
?>
