<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // If the request method is DELETE, try to delete a comment
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id)) {
        $commentId = $data->id;

        $deleteSql = "DELETE FROM comments WHERE id = $commentId";
        $deleteResult = $mysqli->query($deleteSql);

        if ($deleteResult) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "Comment deleted successfully."));
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Error deleting comment."));
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Comment ID is required for deletion."));
    }

    exit();
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("message" => "Method not allowed."));
    exit();
}
?>
