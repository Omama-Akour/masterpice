<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 

// Assuming you have received user_id and comment from the request body
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];
$comment_text = $data['comment'];

// Validate input (you may want to add more validation)
if (empty($user_id) || empty($comment_text)) {
    http_response_code(400); // Bad Request
    echo json_encode(array("message" => "Invalid input data."));
    exit();
}


// Assuming you have a comments table with fields user_id, comment, created_at
$sql = "INSERT INTO comments (user_id, comment, created_at) VALUES ('$user_id', '$comment_text', NOW())";

if ($mysqli->query($sql) === TRUE) {
    http_response_code(201); // Created
    echo json_encode(array("message" => "Comment created successfully."));
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(array("message" => "Error creating comment: " . $mysqli->error));
}
}else{
    echo json_encode(array("message" => "Error creating comment: "));

}
$mysqli->close();

?>
