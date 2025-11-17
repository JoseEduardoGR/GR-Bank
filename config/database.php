<?php
// Configuración de la base de datos para MAMP
define('DB_HOST', '189.203.143.177');
define('DB_NAME', 'gr_bank');
define('DB_USER', 'root');
define('DB_PASS', 'vertrigo'); // Contraseña por defecto de MAMP

// Configuración de la aplicación
define('APP_NAME', 'GR Bank');
define('APP_URL', 'http://189.203.143.177:81'); // URL por defecto de MAMP

class Database {
    private $host = DB_HOST;
    private $port = DB_PORT;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $conn = null;

    public function getConnection() {
        try {
            $dsn = "mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $e) {
            error_log("Connection error: " . $e->getMessage());
            return null;
        }
        return $this->conn;
    }

    public function closeConnection() {
        $this->conn = null;
    }
}

// Función para validar email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Función para validar teléfono
function isValidPhone($phone) {
    return preg_match('/^[\+]?[0-9\s\-$$$$]{10,20}$/', $phone);
}

// Función para sanitizar entrada
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Configurar zona horaria
date_default_timezone_set('America/Mexico_City');

// Configurar manejo de errores
error_reporting(E_ALL);
ini_set('display_errors', 0); // No mostrar errores en producción
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/error.log');

// Crear directorio de logs si no existe
if (!file_exists(__DIR__ . '/../logs')) {
    mkdir(__DIR__ . '/../logs', 0755, true);
}
?>
