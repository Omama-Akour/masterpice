<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class Database {
    private $servername = "localhost";
    private $name = "root";
    private $password = "";
    private $dbname = "pharmacyapi";
    private $mysqli;

    public function __construct() {
        $this->connect();
    }

    private function connect() {
        $this->mysqli= new mysqli($this->servername, $this->name, $this->password, $this->dbname);
        if ($this->mysqli->connect_error) {
            die("Connection failed: " . $this->mysqli->connect_error);
        }
    }
    public function insertUser($name, $email, $password) {
        $insert_query = "INSERT INTO users (name, email, password,role_id) VALUES (?, ?, ?,2)";
        $stmt = $this->mysqli->prepare($insert_query);
    
        if (!$stmt) {
            return "Error preparing statement: " . $this->mysqli->error;
        }
    
        // Bind parameters
        $stmt->bind_param("sss", $name, $email, $password);
    
        // Execute the statement
        $result = $stmt->execute();
    
        if ($result) {
            return true;
        } else {
            return "Error executing statement: " . $stmt->error;
        }
    }
    

    public function close() {
        $this->mysqli->close();
    }
}

class UserRegistration {
    private $db;

    public function __construct(Database $db) {
        $this->db = $db;
    }
   
    public function register() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $data = json_decode(file_get_contents('php://input'), true);

            if ($data && isset($data["name"]) && isset($data["email"]) && isset($data["password"])) {
                $name = $data["name"];
                $email = $data["email"];
                $password = $data["password"];

                $result = $this->db->insertUser($name, $email, $password);

                if ($result === true) {
                    $response = array('success' => true);
                    echo json_encode($response);
                } else {
                    $response = array('error' => "Error: " . $result);
                    echo json_encode($response);
                }
            } else {
                $response = array('error' => "Invalid JSON data.");
                echo json_encode($response);
            }
        }else{
          
            echo "REQUEST_METHOD is not correct plece use post";
        }
    }

    
}

$db = new Database();
$userRegistration = new UserRegistration($db);
$userRegistration->register();
$db->close();
?>
