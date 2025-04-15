import { navegar, mostrarError } from "./nav.js";
import { renderPerfil, renderPerfilError, renderMarcas, renderProductos } from "./render.js";

document.addEventListener("DOMContentLoaded", async () => {
    const paginaActual = window.location.pathname;
    console.log(`🔸 Frontend ejecutando lógica para: ${paginaActual}`);

    if (paginaActual === "/login" || paginaActual.includes("iniciar_sesion.html")) {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        const formLogin = document.getElementById("formLogin");

        if (token) {
            const estaAutenticado = await navegar("/perfil", { token, refreshToken });
            if (estaAutenticado.success && estaAutenticado.data) {
                return window.location.href = "/perfil";
            }
        }

        if (formLogin) {
            formLogin.addEventListener("submit", async (e) => {
                e.preventDefault();
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;

                const res = await navegar("/login", { email, password });

                if (res.success) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("refreshToken", res.refreshToken);
                    window.location.href = "/perfil";
                } else {
                    mostrarError("Credenciales inválidas");
                }
            });
        }
        return;
    } else if (paginaActual === "/registro" || paginaActual.includes("registrarse.html")) {
        const formRegistro = document.getElementById("formRegistro");

        if (formRegistro) {
            formRegistro.addEventListener("submit", async (e) => {
                e.preventDefault();
                const name = document.getElementById("nombre").value;
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;

                const res = await navegar("/registro", { name, email, password });

                if (res.success) {
                    alert("Registro exitoso. Inicia sesión.");
                    window.location.href = "/login";
                } else {
                    mostrarError(res.message || "Error al registrarse");
                }
            });
        }
        return;
    } else if (paginaActual === "/perfil" || paginaActual.includes("perfil.html")) {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        const container = document.getElementById("profile-container");
        if (container) {
            container.innerHTML = '<div class="loading">Cargando datos del perfil…</div>';
        }

        const res = await navegar("/perfil", { token, refreshToken });

        if (!res.success && res.action === "REFRESH_TOKEN" && res.newToken) {
            token = res.newToken;
            localStorage.setItem("token", token);
            return window.location.reload();    
        }
        if (!res.success) {
            if (res.action === "REDIRECT" && res.to) {
                return window.location.href = res.to;
            }
            return renderPerfilError(res.message);
        }

        renderPerfil(res.data);
        return;
    } else {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await navegar(paginaActual, { token, refreshToken });

        if (!res.success) {
            if (res.action === "REDIRECT") {
                window.location.href = res.to;
            } else {
                mostrarError(res.message || "Ocurrio un error inesperado.");
            }
            return;
        }

        if (res.action === "REFRESH_TOKEN" && res.newToken) {
            localStorage.setItem("token", res.newToken);
            console.log("🔁 Token renovado automáticamente");
        }

       
        if (res.action === "RENDER_HOME") {
            if (res.data.productos) renderProductos(res.data.productos);
            if (res.data.marcas) renderMarcas(res.data.marcas);
        }
    }
});