import { loginUser } from "/assets/js/login.js";

export async function registerUser(username, password) {
    try {
        const response = await fetch("https://websockets-production-4d17.up.railway.app/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) throw new Error("Error en el registro");
        console.log("✅ Usuario registrado correctamente.");
    } catch (error) {
        console.error("❌ Error al registrar usuario:", error);
    }
}

document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    await registerUser(username, password);
    const token = await loginUser(username, password);
    if (token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", username);
        window.location.href = "/complete-profile";
    }
});
