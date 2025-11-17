<table>
  <tr>
    <td width="150">
      <img src="https://github.com/JoseEduardoGR/GR-Bank/blob/main/assets/logo.png?raw=true" width="100%" style="display:block;">
    </td>
    <td>
      <h1>GR Bank</h1>
      <em>“Tu banco de confianza - Página de Inicio y Dashboard Bancario”</em>
    </td>
  </tr>
</table>

![Banner](https://img.shields.io/badge/GR_Bank-v1.0.0-blueviolet?style=for-the-badge\&logo=html5)

![Powered by HTML](https://img.shields.io/badge/Powered%20by-HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Powered by CSS](https://img.shields.io/badge/Powered%20by-CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Powered by JavaScript](https://img.shields.io/badge/Powered%20by-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 💡 Sobre GR_Bank

**GR_Bank** es una **aplicación web bancaria de ejemplo** desarrollada como proyecto escolar.
Combina una **página de inicio atractiva** con un **dashboard funcional** para la gestión de cuentas, movimientos y servicios financieros simulados.

> ⚠️ **Nota:** Este proyecto es *educativo* y *no está conectado a un sistema bancario real* ni maneja datos sensibles.

---

## ✨ Características Destacadas

| ⚡ Funcionalidad                   | 📌 Detalle                                                             |
| --------------------------------- | ---------------------------------------------------------------------- |
| **Diseño Responsivo**             | Interfaz adaptable a diferentes dispositivos (móvil, tablet, desktop). |
| **Página de Inicio Interactiva**  | Hero section, servicios, estadísticas y modales de autenticación.      |
| **Dashboard Bancario**            | Visualización de saldos, transacciones, gráficos y servicios.          |
| **Autenticación Simulada**        | Flujos de inicio de sesión y registro mediante HTML/CSS/JS.            |
| **Backend Básico (PHP)**          | Scripts de autenticación y base de datos para usuarios (simulado).     |
| **Estilos Modernos**              | Uso de CSS moderno para una apariencia profesional y limpia.           |

---

## 🎨 Badges & Estado

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge\&logo=php\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge\&logo=mysql\&logoColor=white)
![Status](https://img.shields.io/badge/Status-Escolar-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📁 Estructura del Proyecto

```text
GR_BANK/
├── api/                 # Scripts PHP para autenticación (simulada)
│   ├── login.php
│   ├── logout.php
│   └── register.php
├── assets/              # Imágenes y logotipos
│   ├── GR Bank.svg
│   ├── isotipo dark.png
│   ├── isotipo light.png
│   ├── isotipo.png
│   ├── logo.png
│   └── logotipo.png
├── classes/             # Clases PHP (simulado)
│   └── User.php
├── config/              # Configuración de base de datos
│   └── database.php
├── css/                 # Hojas de estilo
│   ├── auth-styles.css
│   ├── dashboard-styles.css
│   └── styles.css
├── dashboard.html       # Página del dashboard bancario
├── index.html           # Página de inicio
├── js/                  # Scripts JavaScript
│   ├── auth.js
│   ├── script_dashboard.js
│   └── script.js
├── logs/                # Archivos de log (simulados)
├── package.json         # (Opcional, si se usa Node.js para tareas)
├── scripts/             # Scripts SQL
│   └── create_database.sql
└── SETUP_INSTRUCTIONS.md # Instrucciones de instalación local (opcional)
```

---

## 🚀 Cómo Usar GR_Bank (Localmente)

Para ejecutar este proyecto en tu entorno local, necesitarás un servidor web que soporte PHP y MySQL (como XAMPP, WAMP, MAMP o un entorno LAMP).

1.  **Clonar el Repositorio**
    ```bash
    git clone https://github.com/JoseEduardoGR/GR-Bank.git
    cd GR-Bank
    ```

2.  **Configurar el Servidor**
    *   Mueve la carpeta del proyecto a la raíz de tu servidor web local (por ejemplo, `htdocs` en XAMPP).
    *   Inicia tu servidor Apache y MySQL.

3.  **Configurar la Base de Datos (Opcional - Simulado)**
    *   Si decides implementar el backend PHP/MySQL completamente:
        *   Crea una base de datos en tu servidor MySQL local.
        *   Importa el script `scripts/create_database.sql` para crear la tabla de usuarios.
        *   Asegúrate de que `config/database.php` tenga los credenciales correctos para tu base de datos local.

4.  **Abrir en el Navegador**
    *   Abre tu navegador y navega a `http://localhost/GR-Bank/index.html`.

---

## 📚 Tecnologías Utilizadas

*   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
*   **Backend (Simulado):** PHP, MySQL
*   **Gráficos:** Chart.js
*   **Animaciones:** AOS (Animate On Scroll Library)
*   **Iconos:** Font Awesome
*   **Fuentes:** Google Fonts (opcional, si se usan)

---

## 🙏 Agradecimientos

*   Inspirado en el diseño de GR Leviatan para la estructura del README.
*   Este proyecto fue realizado como parte de un trabajo escolar.

---

## 💙 Apoya El Proyecto

<center>
Si este proyecto te ha sido útil o te ha gustado, considera apoyarlo.  
Tu contribución, por pequeña que sea, ¡es muy apreciada!
</center>

---

<div align="center">

  <img 
    src="https://avatars.githubusercontent.com/u/186231665?v=4" 
    width="90" 
    style="border-radius: 50%; margin-bottom: 12px;"
  />

  <p style="font-size: 22px; font-weight: 800; margin: 0;">
    JoseEduardoGR
  </p>

  <p>
    <strong>Desarrollador • Python • C++ • Node</strong><br/>
    🚀 Avanza aunque duela, cada salto te acerca a la versión que nadie creía posible.
  </p>

  <p>
    <a href="https://github.com/JoseEduardoGR?tab=followers">
      ⭐ Seguir en GitHub
    </a>
  </p>

  <a href="https://github.com/sponsors/JoseEduardoGR">
    <img 
      src="https://img.shields.io/badge/Sponsor_Me-FF4081?style=for-the-badge&logo=githubsponsors&logoColor=white"
      height="44"
    />
  </a>

</div>

---

## 📄 Licencia

Este proyecto es de código abierto y está licenciado bajo la Licencia [MIT](https://choosealicense.com/licenses/mit/). Siéntete libre de usarlo y modificarlo como desees para fines educativos o personales.

---
