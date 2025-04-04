// Exporta la función loginUser para reutilización en otros módulos.
export async function loginUser(username, password) {
    try {
        const response = await fetch("https://error-production-f565.up.railway.app/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) throw new Error("Error en el inicio de sesión");
        const data = await response.json();
        //console.log("🔑 Token recibido:", data.accessToken);
        return data.accessToken;
    } catch (error) {
        console.error("❌ Error al iniciar sesión:", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const registerRedirect = document.getElementById("registerRedirect");
    
    // Verifica que los botones existan
    if (loginButton) {
        loginButton.addEventListener("click", async () => {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            const token = await loginUser(username, password);
            if (token) {
                // Guarda el token y username en localStorage
                localStorage.setItem("accessToken", token);
                localStorage.setItem("username", username);
                // Redirige al panel de chat
                window.location.href = "chat.html";
            } else {
                alert("Error al iniciar sesión. Verifica tus credenciales.");
            }
        });
    }
    
    if (registerRedirect) {
        registerRedirect.addEventListener("click", () => {
            window.location.href = "register.html";
        });
    }
});







import { PasswordToggle } from './password-toggle.js';

// Inicializar para cada campo de contraseña
document.querySelectorAll('.password-container').forEach(container => {
    new PasswordToggle(container);
});