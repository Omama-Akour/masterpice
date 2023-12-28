<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if form data is present in the request
    if (empty($_POST)) {
        echo json_encode(['message' => 'Invalid or empty form data provided for insertion']);
        exit();
    }

    // Check if the image is uploaded successfully
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['message' => 'Failed to upload image']);
        exit();
    }

    // Validate other form fields as needed

    // Move the uploaded file to the specified directory
    $image_name = basename($_FILES['image']['name']);
    $image_path = 'C:\xampp\htdocs\MasterPeice\img\\' . $image_name; // Use a relative path
    move_uploaded_file($_FILES['image']['tmp_name'], $image_path);

    if ($mysqli) {
        $query = 'INSERT INTO products (name, image, description, price, category_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())';

        $stmt = $mysqli->prepare($query);

        if (!$stmt) {
            echo json_encode(['message' => 'Failed to prepare statement', 'error' => $mysqli->error]);
            exit();
        }

        // Sanitize and bind parameters using mysqli_real_escape_string
        $name = mysqli_real_escape_string($mysqli, $_POST['name']);
        $description = mysqli_real_escape_string($mysqli, $_POST['description']);
        $price = floatval($_POST['price']); // Assuming price is a float
        $category_id = intval($_POST['category_id']); // Assuming category_id is an integer

        // Bind parameters
        $stmt->bind_param("sssii", $name, $image_name, $description, $price, $category_id);

        // Execute the statement
        $result = $stmt->execute();

        if ($result) {
            echo json_encode(['message' => 'Product inserted successfully']);
        } else {
            echo json_encode(['message' => 'Failed to insert the product', 'error' => $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(['message' => 'Database connection error']);
    }
} else {
    echo json_encode(['message' => 'Incorrect request method']);
}
?>
