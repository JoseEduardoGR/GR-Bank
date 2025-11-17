<?php
require_once __DIR__ . '/../config/database.php';

class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $full_name;
    public $email;
    public $phone;
    public $password_hash;
    public $created_at;
    public $updated_at;
    public $is_active;
    public $last_login;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // Registrar nuevo usuario
    public function register($full_name, $email, $phone, $password) {
        try {
            // Validar datos
            if (empty($full_name) || empty($email) || empty($phone) || empty($password)) {
                return ['success' => false, 'message' => 'Todos los campos son obligatorios'];
            }

            if (!isValidEmail($email)) {
                return ['success' => false, 'message' => 'Email no válido'];
            }

            if (!isValidPhone($phone)) {
                return ['success' => false, 'message' => 'Teléfono no válido'];
            }

            if (strlen($password) < 6) {
                return ['success' => false, 'message' => 'La contraseña debe tener al menos 6 caracteres'];
            }

            // Verificar si el email ya existe
            if ($this->emailExists($email)) {
                return ['success' => false, 'message' => 'Este email ya está registrado'];
            }

            // Sanitizar datos
            $full_name = sanitizeInput($full_name);
            $email = sanitizeInput($email);
            $phone = sanitizeInput($phone);

            // Hashear contraseña
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            // Insertar usuario
            $query = "INSERT INTO " . $this->table_name . " 
                     (full_name, email, phone, password_hash) 
                     VALUES (:full_name, :email, :phone, :password_hash)";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':full_name', $full_name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':password_hash', $password_hash);

            if ($stmt->execute()) {
                return [
                    'success' => true, 
                    'message' => 'Usuario registrado exitosamente',
                    'user_id' => $this->conn->lastInsertId()
                ];
            } else {
                return ['success' => false, 'message' => 'Error al registrar usuario'];
            }

        } catch (PDOException $e) {
            error_log("Error en registro: " . $e->getMessage());
            return ['success' => false, 'message' => 'Error interno del servidor'];
        }
    }

    // Login de usuario
    public function login($email, $password) {
        try {
            if (empty($email) || empty($password)) {
                return ['success' => false, 'message' => 'Email y contraseña son obligatorios'];
            }

            if (!isValidEmail($email)) {
                return ['success' => false, 'message' => 'Email no válido'];
            }

            $email = sanitizeInput($email);

            // Buscar usuario por email
            $query = "SELECT id, full_name, email, phone, password_hash, is_active 
                     FROM " . $this->table_name . " 
                     WHERE email = :email AND is_active = 1";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if ($stmt->rowCount() == 1) {
                $user = $stmt->fetch();
                
                // Verificar contraseña
                if (password_verify($password, $user['password_hash'])) {
                    // Actualizar último login
                    $this->updateLastLogin($user['id']);
                    
                    // Iniciar sesión
                    session_start();
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['user_name'] = $user['full_name'];
                    $_SESSION['user_email'] = $user['email'];
                    $_SESSION['logged_in'] = true;

                    return [
                        'success' => true,
                        'message' => 'Login exitoso',
                        'user' => [
                            'id' => $user['id'],
                            'name' => $user['full_name'],
                            'email' => $user['email'],
                            'phone' => $user['phone']
                        ]
                    ];
                } else {
                    return ['success' => false, 'message' => 'Contraseña incorrecta'];
                }
            } else {
                return ['success' => false, 'message' => 'Usuario no encontrado'];
            }

        } catch (PDOException $e) {
            error_log("Error en login: " . $e->getMessage());
            return ['success' => false, 'message' => 'Error interno del servidor'];
        }
    }

    // Verificar si email existe
    private function emailExists($email) {
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }
    function sanitizeInput($data) {
        return htmlspecialchars(strip_tags(trim($data)));
    }

    function isValidEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    function isValidPhone($phone) {
        // Valida que sea numérico y tenga entre 7 y 15 dígitos
        return preg_match('/^[0-9]{7,15}$/', $phone);
    }

    // Actualizar último login
    private function updateLastLogin($user_id) {
        $query = "UPDATE " . $this->table_name . " SET last_login = NOW() WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $user_id);
        $stmt->execute();
    }

    // Obtener información del usuario
    public function getUserById($id) {
        $query = "SELECT id, full_name, email, phone, created_at, last_login 
                 FROM " . $this->table_name . " 
                 WHERE id = :id AND is_active = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch();
    }

    // Logout
    public function logout() {
        session_start();
        session_unset();
        session_destroy();
        return ['success' => true, 'message' => 'Sesión cerrada exitosamente'];
    }

    // Verificar si está logueado
    public function isLoggedIn() {
        session_start();
        return isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
    }
}
?>
