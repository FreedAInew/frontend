document.addEventListener("DOMContentLoaded", () => {
  // Recupera el token y username desde localStorage
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  if (!token || !username) { // Redirige solo si falta alguno
    alert("Debes iniciar sesión");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeMessage").textContent = "Bienvenido, " + username;
  connectToChat(token, username);
});

let stompClient = null; // Definir stompClient globalmente

function connectToChat(token, username) {
  console.log("Conectando al chat...");

  let socket = new SockJS('https://websockets-1-dhxj.onrender.com/chat');
  stompClient = Stomp.over(socket); // Ahora stompClient es global
  stompClient.reconnect_delay = 0;
  let receivedMessageIds = new Set();

  stompClient.connect({ Authorization: `Bearer ${token}` }, function () {
      console.log("✅ Conectado al WebSocket");
      stompClient.subscribe('/topic/messages', function (message) {
          let messageId = message.headers['message-id'];
          if (receivedMessageIds.has(messageId)) return;
          receivedMessageIds.add(messageId);
          try {
              let data = JSON.parse(message.body);
              let chatDiv = document.getElementById("chat");
              let date = new Date(data.timestamp);
              let formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
              let formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
              chatDiv.innerHTML += `<p><strong>${data.sender}:</strong> ${data.content} <small style="color:gray;">(${formattedTime} - ${formattedDate})</small></p>`;
              chatDiv.scrollTop = chatDiv.scrollHeight;
          } catch (error) {
              console.error("❌ Error procesando mensaje:", error);
          }
      });
  }, function (error) {
      console.error("❌ Error de conexión:", error);
  });
}

function sendMessage() {
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  let messageInput = document.getElementById("messageInput");
  let message = messageInput.value.trim();
  
  if (!message) return; // Evita enviar mensajes vacíos

  if (!stompClient || !stompClient.connected) {
      console.error("❌ No se puede enviar el mensaje: WebSocket no conectado");
      return;
  }

  let chatMessage = { sender: username, content: message };
  stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
  messageInput.value = "";
}

// Manejar el cierre de sesión correctamente
document.getElementById("logoutButton").addEventListener("click", () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");

  if (stompClient) {
      stompClient.disconnect(() => {
          console.log("❌ Desconectado del WebSocket");
      });
  }

  window.location.href = "/login";
});









// autoChat.js - Conexión al chat cuando el login es automático
import { loginUser } from './loginUser.js';  // Importa la función loginUser

const username = "string";  // Usuario predeterminado para login
const password = "string";  // Contraseña predeterminada

// Verifica si ya existe un token o username en localStorage, si no los hay, intenta login automático
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");

    if (!token || !storedUsername) {
        console.log("🔑 Iniciando login automático...");
        const token = await loginUser(username, password);
        if (token) {
            localStorage.setItem("accessToken", token);
            localStorage.setItem("username", username);
            console.log("🔑 Login automático exitoso.");
        } else {
            console.error("❌ No se pudo realizar el login automático.");
            return;
        }
    }

    connectToChat(token, username);
});


function connectToChat(token, username) {
    console.log("Conectando al chat...");

    let socket = new SockJS('https://websockets-1-dhxj.onrender.com/chat');
    stompClient = Stomp.over(socket); // Ahora stompClient es global
    stompClient.reconnect_delay = 0;
    let receivedMessageIds = new Set();

    stompClient.connect({ Authorization: `Bearer ${token}` }, function () {
        console.log("✅ Conectado al WebSocket");
        stompClient.subscribe('/topic/messages', function (message) {
            let messageId = message.headers['message-id'];
            if (receivedMessageIds.has(messageId)) return;
            receivedMessageIds.add(messageId);
            try {
                let data = JSON.parse(message.body);
                let chatDiv = document.getElementById("chat");
                let date = new Date(data.timestamp);
                let formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                let formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
                chatDiv.innerHTML += `<p><strong>${data.sender}:</strong> ${data.content} <small style="color:gray;">(${formattedTime} - ${formattedDate})</small></p>`;
                chatDiv.scrollTop = chatDiv.scrollHeight;
            } catch (error) {
                console.error("❌ Error procesando mensaje:", error);
            }
        });
    }, function (error) {
        console.error("❌ Error de conexión:", error);
    });
}

function sendMessage() {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    let messageInput = document.getElementById("messageInput");
    let message = messageInput.value.trim();
  
    if (!message) return; // Evita enviar mensajes vacíos

    if (!stompClient || !stompClient.connected) {
        console.error("❌ No se puede enviar el mensaje: WebSocket no conectado");
        return;
    }

    let chatMessage = { sender: username, content: message };
    stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
    messageInput.value = "";
}

// Manejar el cierre de sesión correctamente
document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    if (stompClient) {
        stompClient.disconnect(() => {
            console.log("❌ Desconectado del WebSocket");
        });
    }

    window.location.href = "/login";
});
