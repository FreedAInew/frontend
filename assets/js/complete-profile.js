import { createCustomer } from "./customer.js"; // Asegúrate de que customer.js exporte createCustomer correctamente

// Establecer la fecha máxima permitida en el campo de fecha de nacimiento
function setMaxDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;
    
    document.getElementById("dateOfBirth").setAttribute("max", maxDate);
}

setMaxDate();  // Establece la fecha máxima cuando se carga la página

document.getElementById("completeProfileForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("No estás autenticado. Inicia sesión.");
        window.location.href = "login.html";
        return;
    }

    const fullName = document.getElementById("fullName").value.trim();
    const address = document.getElementById("address").value.trim();
    const dateOfBirth = document.getElementById("dateOfBirth").value;

    if (!fullName || !address || !dateOfBirth) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        await createCustomer(token, fullName, address, dateOfBirth);
        // Guarda el username (por ejemplo, usando el fullName) para que se muestre en el chat
        localStorage.setItem("username", fullName);
        alert("Perfil completado con éxito.");
        // Redirige al panel de chat
        window.location.href = "/chat";
    } catch (error) {
        console.error("Hubo un error al completar tu perfil:", error);
        alert("Hubo un error al completar tu perfil.");
    }
});
