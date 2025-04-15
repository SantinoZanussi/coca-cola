const { verificarSesion } = require("./sesion.js");
const { configurarIconoPerfil, cargarDatosPerfil, iniciarSesion, registrarse } = require("./perfil.js");
const { cargarMarcas, cargarProductos } = require("./productos_marcas.js");
const { } = require("./admin-panel.js");

async function ejecutarFunciones (paginaActual, payload = {}) {
    console.log(`🔹 Backend ejecutando lógica para: ${paginaActual}`);
    const { token, refreshToken, email, password, name } = payload;
    
    if (paginaActual === "/login") {
        const estaAutenticado = await verificarSesion(token, refreshToken);
        if (estaAutenticado.success) return { success: false, action: "REDIRECT" , to: "/perfil" };
        return await iniciarSesion(email, password);
    } else if (paginaActual === "/registro") {
        const estaAutenticado = await verificarSesion(token, refreshToken);
        if (estaAutenticado.success) return { success: false, action: "REDIRECT" , to: "/perfil" };
        return await registrarse(name, email, password);
    } else if (paginaActual === "/perfil") {
        const estaAutenticado = await verificarSesion(token, refreshToken);
        if (!estaAutenticado.success) return { success: false, action: "REDIRECT" , to: "/login" };

        const perfil = await cargarDatosPerfil(token);
        if (perfil.message) return { success: false, action: "REFRESH_TOKEN" , newToken: perfil.newToken };

        return perfil;
    } else if (paginaActual === "/admin") {
        const estaAutenticado = await verificarSesion(token, refreshToken);
        if (!estaAutenticado.success) return { success: false, action: "REDIRECT" , to: "/login" };
        // funciones para admin
    } else if (paginaActual === "/"  || paginaActual === "/index.html") {
        const estaAutenticado = await verificarSesion(token, refreshToken);
        
        const productos = await cargarProductos();
        const marcas = await cargarMarcas();
        await configurarIconoPerfil(token);
        
        if (!productos.success) return productos;
        if (!marcas.success) return marcas;

        return { success: true, action: "RENDER_HOME", data: { productos: productos.data, marcas: marcas.data, isAuthenticated: estaAutenticado.success } };
    } else {
        console.log("Otra página cargada:", paginaActual);
        const estaAutenticado = await verificarSesion(token, refreshToken);
        if (!estaAutenticado.success) return { success: false, action: "REDIRECT" , to: "/login" };
        await configurarIconoPerfil(token);

        return { success: estaAutenticado.success, action: estaAutenticado.action ? "NO_OP" : "REDIRECT", to: estaAutenticado.success ? null : "/login", message: estaAutenticado.message };
    }
}

module.exports = { ejecutarFunciones };