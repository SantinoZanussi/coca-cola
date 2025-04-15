export async function navegar(pagina, extra = {}) {
    try {
        const res = await fetch("/api/navegar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pagina, extra })
        });
        return await res.json();
    } catch (error) {
        console.error("Error en navegar:", error);
        return { success: false, message: "Error de red o servidor" };
    }
}

export function mostrarError(msg) {
    const container = document.getElementById("error-msg");
    if (container) {
        container.textContent = msg;
        container.style.display = "block";
    }
}