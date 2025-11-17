// Global Variables
let currentPage = 1
let totalPages = 3
let transactions = []
let filteredTransactions = []
const charts = {}
let currentTheme = "light"

// Sample Data
const sampleTransactions = [
  {
    id: 1,
    date: "2025-06-29",
    description: "Pago de nómina",
    category: "Ingresos",
    amount: 25000,
    status: "completed",
    type: "income",
  },
  {
    id: 2,
    date: "2025-06-28",
    description: "Supermercado Walmart",
    category: "Alimentación",
    amount: -1250.5,
    status: "completed",
    type: "expense",
  },
  {
    id: 3,
    date: "2025-06-28",
    description: "Gasolina Pemex",
    category: "Transporte",
    amount: -800,
    status: "completed",
    type: "expense",
  },
  {
    id: 4,
    date: "2025-06-27",
    description: "Transferencia recibida",
    category: "Transferencias",
    amount: 5000,
    status: "completed",
    type: "income",
  },
  {
    id: 5,
    date: "2025-06-27",
    description: "Netflix Suscripción",
    category: "Entretenimiento",
    amount: -299,
    status: "completed",
    type: "expense",
  },
  {
    id: 6,
    date: "2025-06-26",
    description: "Pago de luz CFE",
    category: "Servicios",
    amount: -450,
    status: "pending",
    type: "expense",
  },
  {
    id: 7,
    date: "2025-06-25",
    description: "Compra en línea Amazon",
    category: "Compras",
    amount: -2100,
    status: "completed",
    type: "expense",
  },
  {
    id: 8,
    date: "2025-06-24",
    description: "Depósito en efectivo",
    category: "Depósitos",
    amount: 3000,
    status: "completed",
    type: "income",
  },
]

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  try {
    setTimeout(() => {
      hideLoadingScreen()
      initializeData()
      initializeEventListeners()
      //initializeCharts()
      initializeAnimations()
      loadTransactions()
    }, 2000)
  } catch (error) {
    console.error("Error inicializando app:", error)
  }
}


function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")
  loadingScreen.style.opacity = "0"
  setTimeout(() => {
    loadingScreen.style.display = "none"
  }, 500)
}

function initializeData() {
  // Set random balance data with animation
  animateNumber("saldoTotal", 0, 125750.8, 2000)
  animateNumber("saldoAhorros", 0, 85000.5, 2000)
  animateNumber("saldoCorriente", 0, 35250.3, 2000)
  animateNumber("saldoCredito", 0, 5500, 2000)

  // Set transactions data
  transactions = [...sampleTransactions]
  filteredTransactions = [...transactions]
}

function animateNumber(elementId, start, end, duration) {
  const element = document.getElementById(elementId)
  const startTime = performance.now()

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = start + (end - start) * easeOutQuart

    element.textContent = formatCurrency(current)

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  requestAnimationFrame(updateNumber)
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))
}

function initializeEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById("themeToggle")
  themeToggle.addEventListener("click", toggleTheme)

  // Mobile menu
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      navLinks.forEach((l) => l.classList.remove("active"))
      link.classList.add("active")

      // Close mobile menu
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Search functionality
  const searchInput = document.getElementById("searchTransactions")
  searchInput.addEventListener("input", filterTransactions)

  // Filter functionality
  const filterSelect = document.getElementById("filterTransactions")
  filterSelect.addEventListener("change", filterTransactions)

  // Logout functionality
  const logoutBtn = document.getElementById("logoutBtn")
  logoutBtn.addEventListener("click", handleLogout)

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeAllModals()
    }
  })

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals()
    }
  })
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  document.documentElement.setAttribute("data-theme", currentTheme)

  const themeIcon = document.querySelector("#themeToggle i")
  themeIcon.className = currentTheme === "light" ? "fas fa-moon" : "fas fa-sun"

  // Update charts for theme
  updateChartsTheme()

  showToast("Tema cambiado exitosamente", "success")
}

function initializeCharts() {
  initializeExpensesChart()
  initializeIncomeExpensesChart()
}

function initializeExpensesChart() {
  const ctx = document.getElementById("expensesChart").getContext("2d")

  const data = {
    labels: ["Alimentación", "Transporte", "Servicios", "Entretenimiento", "Compras", "Otros"],
    datasets: [
      {
        data: [1250, 800, 450, 299, 2100, 500],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`
          },
        },
      },
    },
  }

  charts.expenses = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: options,
  })
}

function initializeIncomeExpensesChart() {
  const ctx = document.getElementById("incomeExpensesChart").getContext("2d")

  const data = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ingresos",
        data: [25000, 28000, 26500, 30000, 27500, 33000],
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderColor: "#10b981",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Gastos",
        data: [18000, 19500, 17800, 21000, 19200, 22500],
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "#ef4444",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          display: false,
        },
        ticks: {
          callback: (value) => "$" + value.toLocaleString(),
        },
      },
    },
  }

  charts.incomeExpenses = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  })
}

function updateChartsTheme() {
  const isDark = currentTheme === "dark"
  const textColor = isDark ? "#f9fafb" : "#1f2937"
  const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"

  Object.values(charts).forEach((chart) => {
    if (chart.options.plugins && chart.options.plugins.legend) {
      chart.options.plugins.legend.labels.color = textColor
    }
    if (chart.options.scales) {
      Object.values(chart.options.scales).forEach((scale) => {
        if (scale.ticks) scale.ticks.color = textColor
        if (scale.grid) scale.grid.color = gridColor
      })
    }
    chart.update()
  })
}

function initializeAnimations() {
  // Initialize AOS (Animate On Scroll)
  const AOS = window.AOS // Declare AOS variable
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    })
  }
}

function loadTransactions() {
  renderTransactions()
  updatePagination()
}

function renderTransactions() {
  const tbody = document.getElementById("transactionsBody")
  const startIndex = (currentPage - 1) * 5
  const endIndex = startIndex + 5
  const pageTransactions = filteredTransactions.slice(startIndex, endIndex)

  if (pageTransactions.length === 0) {
    tbody.innerHTML = `
            <div class="transaction-row">
                <div class="table-cell" style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">
                    No se encontraron transacciones
                </div>
            </div>
        `
    return
  }

  tbody.innerHTML = pageTransactions
    .map(
      (transaction) => `
        <div class="transaction-row" onclick="showTransactionDetails(${transaction.id})">
            <div class="table-cell" data-label="Fecha">${formatDate(transaction.date)}</div>
            <div class="table-cell" data-label="Descripción">
                <div class="transaction-description">${transaction.description}</div>
            </div>
            <div class="table-cell" data-label="Categoría">
                <span class="transaction-category">${transaction.category}</span>
            </div>
            <div class="table-cell transaction-amount ${transaction.amount > 0 ? "positive" : "negative"}" data-label="Monto">
                ${transaction.amount > 0 ? "+" : ""}$${formatCurrency(transaction.amount)}
            </div>
            <div class="table-cell" data-label="Estado">
                <span class="transaction-status status-${transaction.status}">
                    ${getStatusText(transaction.status)}
                </span>
            </div>
        </div>
    `,
    )
    .join("")
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function getStatusText(status) {
  const statusMap = {
    completed: "Completado",
    pending: "Pendiente",
    failed: "Fallido",
  }
  return statusMap[status] || status
}

function filterTransactions() {
  const searchTerm = document.getElementById("searchTransactions").value.toLowerCase()
  const filterType = document.getElementById("filterTransactions").value

  filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm) ||
      transaction.category.toLowerCase().includes(searchTerm)

    const matchesFilter =
      filterType === "all" ||
      (filterType === "income" && transaction.amount > 0) ||
      (filterType === "expense" && transaction.amount < 0)

    return matchesSearch && matchesFilter
  })

  currentPage = 1
  totalPages = Math.ceil(filteredTransactions.length / 5)
  renderTransactions()
  updatePagination()
}

function updatePagination() {
  const pageInfo = document.getElementById("pageInfo")
  const prevBtn = document.getElementById("prevPage")
  const nextBtn = document.getElementById("nextPage")

  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`
  prevBtn.disabled = currentPage === 1
  nextBtn.disabled = currentPage === totalPages
}

function changePage(direction) {
  const newPage = currentPage + direction
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage
    renderTransactions()
    updatePagination()
  }
}

function refreshBalance() {
  const refreshBtn = document.querySelector(".refresh-btn")
  refreshBtn.style.transform = "rotate(360deg)"

  setTimeout(() => {
    // Generate new random balances
    const newTotal = Math.random() * 50000 + 100000
    const newSavings = Math.random() * 30000 + 70000
    const newChecking = Math.random() * 20000 + 25000
    const newCredit = Math.random() * 3000 + 4000

    animateNumber(
      "saldoTotal",
      Number.parseFloat(document.getElementById("saldoTotal").textContent.replace(/,/g, "")),
      newTotal,
      1000,
    )
    animateNumber(
      "saldoAhorros",
      Number.parseFloat(document.getElementById("saldoAhorros").textContent.replace(/,/g, "")),
      newSavings,
      1000,
    )
    animateNumber(
      "saldoCorriente",
      Number.parseFloat(document.getElementById("saldoCorriente").textContent.replace(/,/g, "")),
      newChecking,
      1000,
    )
    animateNumber(
      "saldoCredito",
      Number.parseFloat(document.getElementById("saldoCredito").textContent.replace(/,/g, "")),
      newCredit,
      1000,
    )

    refreshBtn.style.transform = "rotate(0deg)"
    showToast("Saldos actualizados correctamente", "success")
  }, 500)
}

function updateExpensesChart() {
  const period = document.getElementById("expensesPeriod").value
  let newData

  switch (period) {
    case "quarter":
      newData = [3750, 2400, 1350, 897, 6300, 1500]
      break
    case "year":
      newData = [15000, 9600, 5400, 3588, 25200, 6000]
      break
    default:
      newData = [1250, 800, 450, 299, 2100, 500]
  }

  charts.expenses.data.datasets[0].data = newData
  charts.expenses.update("active")

  showToast("Gráfico actualizado", "success")
}

function exportTransactions() {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "Fecha,Descripción,Categoría,Monto,Estado\n" +
    filteredTransactions
      .map((t) => `${t.date},"${t.description}","${t.category}",${t.amount},"${getStatusText(t.status)}"`)
      .join("\n")

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "movimientos_bancarios.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  showToast("Transacciones exportadas exitosamente", "success")
}

function showTransactionDetails(transactionId) {
  const transaction = transactions.find((t) => t.id === transactionId)
  if (!transaction) return

  showToast(`Detalles: ${transaction.description} - $${formatCurrency(transaction.amount)}`, "info")
}

// Modal Functions
function openTransferModal() {
  showModal("transferModal")
}

function openPaymentModal() {
  showModal("paymentModal")
}

function openDepositModal() {
  showToast("Función de depósito próximamente disponible", "info")
}

function openServiceModal(service) {
  const messages = {
    investment: "Nuestros asesores de inversión te contactarán pronto",
    loan: "Solicitud de préstamo iniciada. Revisaremos tu perfil crediticio",
    insurance: "Catálogo de seguros disponible en tu área personal",
    support: "Conectando con soporte técnico...",
  }

  showToast(messages[service] || "Servicio no disponible", "info")
}

function showModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.classList.add("show")
  modal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.classList.remove("show")
  setTimeout(() => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }, 300)
}

function closeAllModals() {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.classList.remove("show")
    setTimeout(() => {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }, 300)
  })
}

function processTransfer(event) {
  event.preventDefault()
  const formData = new FormData(event.target)

  // Simulate processing
  showToast("Procesando transferencia...", "info")

  setTimeout(() => {
    closeModal("transferModal")
    showToast("Transferencia realizada exitosamente", "success")

    // Add new transaction
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split("T")[0],
      description: "Transferencia enviada",
      category: "Transferencias",
      amount: -Number.parseFloat(formData.get("amount") || 0),
      status: "completed",
      type: "expense",
    }

    transactions.unshift(newTransaction)
    filteredTransactions = [...transactions]
    renderTransactions()

    // Update balance
    refreshBalance()
  }, 2000)
}

function processPayment(event) {
  event.preventDefault()
  const formData = new FormData(event.target)

  showToast("Procesando pago...", "info")

  setTimeout(() => {
    closeModal("paymentModal")
    showToast("Pago realizado exitosamente", "success")

    const serviceTypes = {
      electricity: "Pago de luz",
      water: "Pago de agua",
      gas: "Pago de gas",
      internet: "Pago de internet",
      phone: "Pago de teléfono",
    }

    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split("T")[0],
      description: serviceTypes[formData.get("service")] || "Pago de servicio",
      category: "Servicios",
      amount: -Number.parseFloat(formData.get("amount") || 0),
      status: "completed",
      type: "expense",
    }

    transactions.unshift(newTransaction)
    filteredTransactions = [...transactions]
    renderTransactions()

    refreshBalance()
  }, 2000)
}

function handleLogout() {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    showToast("Cerrando sesión...", "info")

    setTimeout(() => {
      showToast("Sesión cerrada exitosamente", "success")
      // In a real app, redirect to login page
      // window.location.href = 'login.html';
    }, 1500)
  }
}

function showToast(message, type = "info") {
  const toast = document.getElementById("toast")
  const toastMessage = document.querySelector(".toast-message")
  const toastIcon = document.querySelector(".toast-icon")

  // Set message
  toastMessage.textContent = message

  // Set icon based on type
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }

  toastIcon.className = `toast-icon ${icons[type]}`

  // Set toast type
  toast.className = `toast ${type}`

  // Show toast
  toast.classList.add("show")

  // Auto hide after 4 seconds
  setTimeout(() => {
    hideToast()
  }, 4000)
}

function hideToast() {
  const toast = document.getElementById("toast")
  toast.classList.remove("show")
}

// Close toast when clicking close button
document.addEventListener("DOMContentLoaded", () => {
  const toastClose = document.querySelector(".toast-close")
  if (toastClose) {
    toastClose.addEventListener("click", hideToast)
  }
})

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance optimization for scroll events
let ticking = false

function updateScrollPosition() {
  const header = document.getElementById("header")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "var(--bg-primary)"
    header.style.backdropFilter = "none"
  }

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollPosition)
    ticking = true
  }
})

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading states for buttons
function addLoadingState(button, duration = 2000) {
  const originalText = button.innerHTML
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = originalText
    button.disabled = false
  }, duration)
}

// Error handling for charts
window.addEventListener("error", (e) => {
  if (e.message.includes("Chart")) {
    console.warn("Chart.js error handled gracefully")
    showToast("Error al cargar gráficos. Reintentando...", "warning")
  }
})

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Alt + T for theme toggle
  if (e.altKey && e.key === "t") {
    e.preventDefault()
    toggleTheme()
  }

  // Alt + R for refresh balance
  if (e.altKey && e.key === "r") {
    e.preventDefault()
    refreshBalance()
  }

  // Alt + S for search focus
  if (e.altKey && e.key === "s") {
    e.preventDefault()
    document.getElementById("searchTransactions").focus()
  }
})

// Add touch gestures for mobile
let touchStartX = 0
let touchEndX = 0

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next page
      if (currentPage < totalPages) {
        changePage(1)
      }
    } else {
      // Swipe right - previous page
      if (currentPage > 1) {
        changePage(-1)
      }
    }
  }
}

// Initialize service worker for offline functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Add real-time updates simulation
setInterval(() => {
  // Simulate real-time balance updates (in a real app, this would come from WebSocket)
  const shouldUpdate = Math.random() < 0.1 // 10% chance every 30 seconds

  if (shouldUpdate) {
    const balanceChange = (Math.random() - 0.5) * 1000 // Random change between -500 and +500
    const currentBalance = Number.parseFloat(document.getElementById("saldoTotal").textContent.replace(/,/g, ""))
    const newBalance = currentBalance + balanceChange

    animateNumber("saldoTotal", currentBalance, newBalance, 1000)

    if (balanceChange > 0) {
      showToast(`Nuevo ingreso: +$${formatCurrency(balanceChange)}`, "success")
    }
  }
}, 30000) // Check every 30 seconds
