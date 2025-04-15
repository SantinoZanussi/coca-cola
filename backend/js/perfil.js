require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const { cerrarSesion, renovarToken } = require("./sesion.js");

async function configurarIconoPerfil(token) {
    if (!token) {
      return { success: false, message: "No autenticado" };
    }
    const perfil = await cargarDatosPerfil(token);
    if (!perfil.success) {
      return { success: false, message: perfil.message };
    }
    return { success: true, profilePicUrl: perfil.data.avatarUrl };
}

async function cargarDatosPerfil(token) {
    if (!token) {
      return { success: false, message: "No hay token de acceso" };
    }
  
    try {
      let res = await fetch(`${BASE_URL}/api/usuarios/perfil`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (res.status === 403) {
        const ren = await renovarToken(token);
        if (ren.success) {
          return { success: false, message: "TOKEN_REFRESHED", newToken: ren.token };
        }
        return { success: false, message: "Sesión expirada" };
      }
  
      if (!res.ok) {
        const err = await res.json();
        return { success: false, message: err.error || "Error al obtener perfil" };
      }
  
      const data = await res.json();
      return { success: true, data };
    } catch (err) {
      console.error("Error en cargarDatosPerfil:", err);
      return { success: false, message: "Error de red" };
    }
}

async function iniciarSesion(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/api/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || "Error al iniciar sesión" };
      }
      return { success: true, token: data.accessToken, refreshToken: data.refreshToken };
    } catch (err) {
      console.error("Error en iniciarSesion:", err);
      return { success: false, message: "Error de red" };
    }
}

async function registrarse(name, email, password) {
    try {
      const res = await fetch(`${BASE_URL}/api/usuarios/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || "Error al registrarse" };
      }
      return { success: true };
    } catch (err) {
      console.error("Error en registrarse:", err);
      return { success: false, message: "Error de red" };
    }
  }

module.exports = { configurarIconoPerfil, cargarDatosPerfil, iniciarSesion, registrarse };