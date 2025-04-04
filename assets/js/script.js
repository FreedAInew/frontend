// 📌 Ir a la página de login
function irALogin() {
    window.location.href = "login.html";
}

// 🌙 Cambiar a modo oscuro kawaii
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Guarda el estado en localStorage para recordar la preferencia del usuario
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

// 🌓 Mantener el modo oscuro después de recargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
});
