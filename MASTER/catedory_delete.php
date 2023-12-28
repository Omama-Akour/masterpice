<?php


///////////////// use DELETE method ////////////////////////////////////////////////
//////////////// send: id  ///////////////////////////////////////////////
// {
//     "id":"2",
// }
//////////////////////////////////////////////////////////////////




header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'connect.php';



if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
 $data = json_decode(file_get_contents('php://input'), true);
    if (!empty($data)) {
      $id=$data['id'];

        $sql = "DELETE FROM categories WHERE id = $id ";

        if ($mysqli->query($sql) === TRUE) {
            echo json_encode(array("message" => " record deleted successfully."));
        } else {
            echo json_encode(array("error" => "Error: " .$mysqli->error));
        }
    } else {
        echo json_encode(array("message" => "No data provided for deletion."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method. Please use delete method."));
}
//$mysqli->close();
?>

