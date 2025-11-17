# Configuración de GR Bank con Base de Datos MySQL

## Requisitos Previos
- MAMP instalado y funcionando
- PHP 7.4 o superior
- MySQL 5.7 o superior

## Pasos de Instalación

### 1. Configurar MAMP
1. Inicia MAMP
2. Asegúrate de que Apache y MySQL estén ejecutándose
3. El puerto por defecto de Apache debe ser 8888
4. El puerto por defecto de MySQL debe ser 3306

### 2. Crear la Base de Datos
1. Abre phpMyAdmin en: http://localhost:8888/phpMyAdmin/
2. Crea una nueva base de datos llamada `gr_bank`
3. Ejecuta el script SQL que se encuentra en `scripts/create_database.sql`

### 3. Configurar los Archivos
1. Coloca todos los archivos en la carpeta `htdocs` de MAMP
2. La estructura debe ser:
\`\`\`
htdocs/grbank/
├── index.html
├── styles.css
├── script.js
├── js/
│   └── auth.js
├── css/
│   └── auth-styles.css
├── config/
│   └── database.php
├── classes/
│   └── User.php
├── api/
│   ├── register.php
│   ├── login.php
│   └── logout.php
├── scripts/
│   └── create_database.sql
└── logs/ (se crea automáticamente)
\`\`\`

### 4. Verificar la Configuración
1. Abre http://localhost:8888/grbank/
2. Intenta registrar un nuevo usuario
3. Intenta iniciar sesión

### 5. Usuario de Prueba
- Email: admin@grbank.com
- Contraseña: admin123

## Características de Seguridad Implementadas

### Contraseñas
- Hasheadas con `password_hash()` usando PASSWORD_DEFAULT
- Verificación con `password_verify()`
- Mínimo 6 caracteres requeridos

### Validación de Datos
- Sanitización de entradas con `htmlspecialchars()`
- Validación de email con `filter_var()`
- Validación de teléfono con expresiones regulares
- Prevención de SQL injection con prepared statements

### Sesiones
- Manejo seguro de sesiones PHP
- Datos del usuario almacenados en localStorage (frontend)
- Logout completo que destruye la sesión

### Base de Datos
- Conexión PDO con manejo de errores
- Índices en campos importantes
- Campos de auditoría (created_at, updated_at, last_login)
- Campo is_active para soft delete

## Solución de Problemas

### Error de Conexión
- Verifica que MAMP esté ejecutándose
- Confirma los puertos en config/database.php
- Revisa los logs en la carpeta logs/

### Error 404 en API
- Verifica que los archivos estén en la carpeta correcta
- Confirma que Apache esté ejecutándose
- Revisa la URL base en js/auth.js

### Error de Base de Datos
- Confirma que la base de datos `gr_bank` existe
- Verifica que el script SQL se ejecutó correctamente
- Revisa las credenciales en config/database.php
