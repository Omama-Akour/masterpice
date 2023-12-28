<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include('connect.php');
////////////////////
// name 
// email 
// password 
// role_id
// image 
// specialization
// description
///////////////////////


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $specialization = $_POST['specialization'] ?? '';
    $description = $_POST['description'] ?? '';

    // Role ID for doctors
    $role_id = 3;

    // Check if the image is uploaded successfully
    if (!empty($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image_name = $_FILES['image']['name'];
        $image_tmp = $_FILES['image']['tmp_name'];
        $image_path = 'C:\xampp\htdocs\MasterPeice\img\\' . $image_name; // Set the path where images will be stored

        // Ensure the directory exists and has write permissions
        if (!is_dir('C:\xampp\htdocs\MasterPeice\img\\')) {
            mkdir('C:\xampp\htdocs\MasterPeice\img\\', 0777, true);
        }

        // Move the uploaded file to the specified directory
        if (!move_uploaded_file($image_tmp, $image_path)) {
            echo json_encode(array("error" => "Failed to upload image"));
            exit;
        }
    } else {
        echo json_encode(array("error" => "No image uploaded or upload failed"));
        exit;
    }

    try {
        // Insert user if the email doesn't exist
        $sql_user = "INSERT INTO users (name, email, password, role_id) SELECT '$name', '$email', '$password', $role_id FROM dual WHERE NOT EXISTS (SELECT * FROM users WHERE email = '$email')";
        $mysqli->query($sql_user);

        if ($mysqli->affected_rows == 0) {
            echo json_encode(array("error" => "Email already exists"));
            exit;
        }

        $user_id = $mysqli->insert_id;

        // Insert doctor
        $sql_doctor = "INSERT INTO doctors (user_id, image, specialization, description) VALUES ('$user_id', '$image_name', '$specialization', '$description')";
        $mysqli->query($sql_doctor);

        echo json_encode(array("message" => "Doctor added successfully"));
    } catch (mysqli_sql_exception $e) {
        echo json_encode(array("error" => $e->getMessage()));
    }
} else {
    echo json_encode(array("error" => "Invalid request method"));
}
?>