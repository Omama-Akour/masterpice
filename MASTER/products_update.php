<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'connect.php';
if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    try {
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);

        // Check if the data is not empty
        if (!empty($data)) {
            // Build the SQL query dynamically based on the provided data
            $query = "UPDATE products SET ";
            $params = [];

            // Iterate through the provided attributes and construct the query
            foreach ($data as $key => $value) {

                // ------------------------------------------------------------------------------------
                // ------------------------------------------------------------------------------------
                // -----------provide your products table attributes in $valid_columns array------------
                $valid_columns = ['name', 'image', 'description', 'price', 'category_id', 'created_at', 'updated_at'];
                // ------------------------------------------------------------------------------------
                // ------------------------------------------------------------------------------------

                if (in_array($key, $valid_columns)) {
                    $query .= "$key = ?, ";
                    $params[] = $value;
                }
            }

            // Remove the trailing comma and space
            $query = rtrim($query, ', ');

            $query .= " WHERE id = ?;";
            $params[] = $data['id'];

            $mysqli = new mysqli('localhost', 'root', '', 'pharmacyapi');

            if ($mysqli->connect_error) {
                die("Connection failed: " . $mysqli->connect_error);
            }

            $stmt = $mysqli->prepare($query);

            // Bind parameters
            $types = str_repeat('s', count($params));
            $stmt->bind_param($types, ...$params);

            $stmt->execute();

            // Check the affected rows to see if the update was successful
            $affectedRows = $stmt->affected_rows;

            if ($affectedRows > 0) {
                echo json_encode(['message' => 'Update successful']);
            } else {
                echo json_encode(['message' => 'No matching records found for the provided product_id']);
            }

            $stmt->close();
            $mysqli->close();
        } else {
            echo json_encode(['message' => 'No data provided for updating']);
        }
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }
} else {
    echo json_encode(['message' => 'Incorrect request method']);
}

?>
