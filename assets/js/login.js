// Exporta la función loginUser para reutilización en otros módulos.
export async function loginUser(username, password) {
    try {
        const response = await fetch("https://mi-app-java-latest.onrender.com/auth/login", {
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
                window.location.href = "/chat";
            } else {
                alert("Error al iniciar sesión. Verifica tus credenciales.");
            }
        });
    }
    
    if (registerRedirect) {
        registerRedirect.addEventListener("click", () => {
            window.location.href = "/register";
        });
    }
});



import { PasswordToggle } from './password-toggle.js';

// Inicializar para cada campo de contraseña
document.querySelectorAll('.password-container').forEach(container => {
    new PasswordToggle(container);
});



// autoLogin.js - Lógica de login automático cada 60 segundos
function autoLogin() {

     // Verificar si el usuario ya está logueado
     if (localStorage.getItem("accessToken")) {
        console.log("🔑 Ya estás logueado. No se realizará login automático.");
        return;
    }


    const username = "string";  // Usuario predeterminado para login
    const password = "string";  // Contraseña predeterminada

    setInterval(async () => {
        const token = await loginUser(username, password);
        if (token) {
            // Guarda el token y username en localStorage
            localStorage.setItem("accessToken", token);
            localStorage.setItem("username", username);
            console.log("🔑 Login automático exitoso. Token recibido.");
            window.location.href = "/chat";  // Redirigir al chat
        } else {
            console.error("❌ No se pudo realizar el login automático.");
        }
    }, 300000); // 60 segundos
}

// Llamada para iniciar el login automático
autoLogin();
