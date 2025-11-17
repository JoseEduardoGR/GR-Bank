// Configuración de la API
const API_BASE_URL = "http://189.203.143.177:81/GR_BANK/api" // Ajusta según tu configuración de MAMP

// Funciones auxiliares
function switchModal(from, to) {
  // Implementación de switchModal
  console.log(`Switching from ${from} to ${to}`)
}

function closeModal(modalId) {
  // Implementación de closeModal
  console.log(`Closing modal ${modalId}`)
}

// Clase para manejar autenticación
class AuthManager {
  constructor() {
    this.isLoggedIn = false
    this.currentUser = null
    this.checkLoginStatus()
  }

  // Verificar estado de login al cargar la página
  checkLoginStatus() {
    const userData = localStorage.getItem("grbank_user")
    if (userData) {
      try {
        this.currentUser = JSON.parse(userData)
        this.isLoggedIn = true
        this.updateUI()
      } catch (e) {
        localStorage.removeItem("grbank_user")
      }
    }
  }

  // Registro de usuario
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/register.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const result = await response.json()

      if (result.success) {
        this.showMessage("¡Registro exitoso! Ya puedes iniciar sesión.", "success")
        // Cambiar al modal de login después del registro exitoso
        setTimeout(() => {
          switchModal("register", "login")
        }, 1500)
      } else {
        this.showMessage(result.message, "error")
      }

      return result
    } catch (error) {
      console.error("Error en registro:", error)
      this.showMessage("Error de conexión. Verifica que MAMP esté ejecutándose.", "error")
      return { success: false, message: "Error de conexión" }
    }
  }

  // Login de usuario
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const result = await response.json()

      if (result.success) {
        this.currentUser = result.user
        this.isLoggedIn = true

        // Guardar datos del usuario en localStorage
        localStorage.setItem("grbank_user", JSON.stringify(result.user))

        this.showMessage(`¡Bienvenido, ${result.user.name}!`, "success")
        this.updateUI()
        closeModal("login")
      } else {
        this.showMessage(result.message, "error")
      }

      return result
    } catch (error) {
      console.error("Error en login:", error)
      this.showMessage("Error de conexión. Verifica que MAMP esté ejecutándose.", "error")
      return { success: false, message: "Error de conexión" }
    }
  }

  // Logout de usuario
  async logout() {
    try {
      await fetch(`${API_BASE_URL}/logout.php`, {
        method: "POST",
      })

      this.currentUser = null
      this.isLoggedIn = false
      localStorage.removeItem("grbank_user")

      this.showMessage("Sesión cerrada exitosamente", "success")
      this.updateUI()
    } catch (error) {
      console.error("Error en logout:", error)
    }
  }

  // Actualizar interfaz según estado de login
  updateUI() {
    const loginBtn = document.querySelector(".btn-login")
    const registerBtn = document.querySelector(".btn-register")
    const navButtons = document.querySelector(".nav-buttons")

    if (this.isLoggedIn && this.currentUser) {
      // Crear dropdown de usuario
      navButtons.innerHTML = `
                <div class="user-dropdown">
                    <button class="user-menu-btn">
                        <i class="fas fa-user-circle"></i>
                        ${this.currentUser.name}
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="user-dropdown-content">
                        <a href="#" onclick="authManager.showProfile()">
                            <i class="fas fa-user"></i> Mi Perfil
                        </a>
                        <a href="#" onclick="authManager.showDashboard()">
                            <i class="fas fa-tachometer-alt"></i> Dashboard
                        </a>
                        <a href="#" onclick="authManager.logout()">
                            <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                        </a>
                    </div>
                </div>
            `

      // Actualizar hero section para usuarios logueados
      this.updateHeroForLoggedUser()
    } else {
      // Restaurar botones originales
      navButtons.innerHTML = `
                <button class="btn-login" onclick="openModal('login')">
                    <i class="fas fa-user"></i>
                    Iniciar Sesión
                </button>
                <button class="btn-register" onclick="openModal('register')">
                    Registrarse
                </button>
            `
    }
  }

  // Actualizar hero section para usuarios logueados
  updateHeroForLoggedUser() {
    const heroTitle = document.querySelector(".hero-title")
    const heroDescription = document.querySelector(".hero-description")
    const heroButtons = document.querySelector(".hero-buttons")

    if (heroTitle && this.currentUser) {
      heroTitle.innerHTML = `
                ¡Hola, ${this.currentUser.name.split(" ")[0]}!
                <span class="highlight">Bienvenido a tu banco</span>
            `

      heroDescription.textContent = "Gestiona tus finanzas, revisa tus cuentas y realiza transacciones de forma segura."

      heroButtons.innerHTML = `
                <button class="btn-primary" onclick="authManager.showDashboard()">
                    Ver Dashboard
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button class="btn-secondary" onclick="authManager.showTransactions()">
                    <i class="fas fa-exchange-alt"></i>
                    Transferencias
                </button>
            `
    }
  }

  // Mostrar perfil (placeholder)
  showProfile() {
    alert(`Perfil de ${this.currentUser.name}\nEmail: ${this.currentUser.email}\nTeléfono: ${this.currentUser.phone}`)
  }

  // Mostrar dashboard (placeholder)
  showDashboard() {
    alert("Dashboard - Funcionalidad en desarrollo")
  }

  // Mostrar transacciones (placeholder)
  showTransactions() {
    alert("Transferencias - Funcionalidad en desarrollo")
  }

  // Mostrar mensajes
  showMessage(message, type = "info") {
    // Crear elemento de mensaje
    const messageDiv = document.createElement("div")
    messageDiv.className = `message-toast ${type}`
    messageDiv.innerHTML = `
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" class="message-close">
                <i class="fas fa-times"></i>
            </button>
        `

    // Agregar al DOM
    document.body.appendChild(messageDiv)

    // Auto-remover después de 5 segundos
    setTimeout(() => {
      if (messageDiv.parentElement) {
        messageDiv.remove()
      }
    }, 5000)
  }
}

// Inicializar AuthManager
const authManager = new AuthManager()

// Actualizar los event listeners de los formularios
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginModal .modal-form")
  const registerForm = document.querySelector("#registerModal .modal-form")

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      const submitBtn = loginForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      // Mostrar loading
      submitBtn.textContent = "Iniciando sesión..."
      submitBtn.disabled = true

      await authManager.login({ email, password })

      // Restaurar botón
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const fullName = document.getElementById("fullName").value
      const email = document.getElementById("regEmail").value
      const password = document.getElementById("regPassword").value
      const phone = document.getElementById("phone").value

      const submitBtn = registerForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      // Mostrar loading
      submitBtn.textContent = "Registrando..."
      submitBtn.disabled = true

      await authManager.register({
        fullName,
        email,
        password,
        phone,
      })

      // Restaurar botón
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    })
  }
})
