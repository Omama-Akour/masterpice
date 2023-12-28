<?php
//////////////////////////////////////////////////////////////////////////////////////
/////////////// use PUT method ///////////////////////////////////////////////////////
/////////////// send: category_name + category_id ///////////////////////////////////////////////////
//   {
//     "name": "Skincare",
//     "id": 2
 
// }

////////////use it to insert new category/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
include 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
         

      

    if (!empty($data['id'])) {
        $categoryid = $data['id'];

        
        $sql = "SELECT * FROM categories WHERE id = $categoryid";
        $result = $mysqli->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $categoryname =$data['name'];
            $id = $row['id'];
                
            if (!empty($categoryname)) {
                $sql = "UPDATE categories SET name = '$categoryname' WHERE id = $id";
                $mysqli->query($sql);

                echo json_encode(array("success" => "Category updated successfully."));
            } else {
                echo json_encode(array("error" => "Category name is empty."));
            }
        } else {
            echo json_encode(array("error" => "Category not found."));
        }
    } else {
        echo json_encode(array("error" => "Please provide the category ID."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method. Please use PUT method."));
}
$mysqli->close();
?>
