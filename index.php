<?php
session_start(); // Iniciar la sesión

// Conexión a la base de datos
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'gamer_hub';
$conn = new mysqli($host, $user, $pass, $db);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Verificación de credenciales usando sentencias preparadas
    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        // Verificar la contraseña
        if (password_verify($password, $hashed_password)) {
            // Guardar información en la sesión
            $_SESSION['username'] = $username;

            // Redirigir a una página externa
            header("Location: https://www.xnalgas.com/karely-ruiz-deja-chupar-el-cono-de-giselle-montes-en-live-de-onlyfans/"); // Cambia esto por la URL de la página externa
            exit();
        } else {
            echo "Credenciales incorrectas.";
        }
    } else {
        echo "Credenciales incorrectas.";
    }
    $stmt->close();
}
?>
