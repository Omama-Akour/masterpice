<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    // If the request method is not GET, respond with an error
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Method not allowed."));
    exit();
}

// Assuming your table is named 'comments' and has columns id, user_id, product_id, comment, created_at
$sql = "SELECT c.id, u.name AS user_name, c.comment, c.created_at 
        FROM comments c
        JOIN users u ON c.user_id = u.id
        ORDER BY c.created_at DESC 
        LIMIT 3" ;
        
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    $comments = array();
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
    echo json_encode($comments);
} else {
    echo json_encode(array("message" => "No comments found."));
}

$mysqli->close();
?>
