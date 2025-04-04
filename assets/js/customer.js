// customer.js
export async function createCustomer(token, fullName, address, dateOfBirth) {
    try {
        const response = await fetch("https://websockets-production-4d17.up.railway.app/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ fullName, address, dateOfBirth })
        });
        if (!response.ok) throw new Error("Error al crear el cliente");
        const data = await response.json();
        console.log("✅ Customer creado:", data);
        return data;
    } catch (error) {
        console.error("❌ Error al crear Customer:", error);
        throw error;
    }
}
