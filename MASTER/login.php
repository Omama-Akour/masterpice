<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class UserAuthentication {
    private $mysqli;

    public function __construct($mysqli) {
        $this->mysqli = $mysqli;
    }

    public function authenticateUser($json_data) {
        $data = json_decode($json_data, true);

        if ($data && isset($data["email"]) && isset($data["password"])) {
            $email = $data["email"];
            $password = $data["password"];

            $query = "SELECT id, role_id FROM users WHERE email = ? AND password = ?";
            $stmt = $this->mysqli->prepare($query);
            $stmt->bind_param('ss', $email, $password);
            $stmt->execute();
            $result = $stmt->get_result()->fetch_assoc();

            if ($result) {
                $response = array('STATUS' => true, 'ROLE' => $result['role_id'], 'USER_ID' => $result['id']);
            } else {
                $response = array('STATUS' => false);
            }
        } else {
            $response = array('error' => 'Invalid JSON data');
        }

        return $response;
    }
}

include "connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json_data = file_get_contents('php://input');
    $authenticator = new UserAuthentication($mysqli);
    $response = $authenticator->authenticateUser($json_data);
} else {
    $response = array('error' => 'Invalid request method');
}

header("Content-Type: application/json");
echo json_encode($response);

$mysqli->close();
// {
//     "email": "user1",
//     "password": "1111"
// }
?>
