require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

// Función para decodificar el JWT y obtener los datos del payload
/*
function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
*/

async function renovarToken(refreshToken) {
    if (!refreshToken) {
      return { success: false, message: "No hay refresh token" };
    }
    try {
      const res = await fetch(`${BASE_URL}/api/usuarios/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken })
      });
      if (!res.ok) {
        throw new Error("No se pudo renovar el token");
      }
      const data = await res.json();
      return { success: true, token: data.accessToken };
    } catch (err) {
      console.error("Error al renovar token:", err);
      return { success: false, message: err.message };
    }
}

async function verificarSesion(token, refreshToken) {
    if (!token) {
      return { success: false, message: "No hay token de acceso" };
    }
    try {
      const res = await fetch(`${BASE_URL}/api/usuarios/perfil`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 403) {
        if(refreshToken) {
          // token expirado, se renueva
          const ren = await renovarToken(refreshToken);
          if (ren.success) {
            return { success: true, token: ren.token };
          }
          return { success: false, message: "Sesión expirada" };
        } else {
          return { success: false, message: "Token expirado y sin refreshToken" };
        }
      }
      if (!res.ok) {
        throw new Error("Sesión inválida");
      }
      const usuario = await res.json();
      return { success: true, admin: usuario.admin, data: usuario };
    } catch (err) {
      console.error("Error en verificarSesion:", err);
      return { success: false, message: err.message };
    }
}

async function cerrarSesion(refreshToken) {
    if (refreshToken) {
      try {
        await fetch(`${BASE_URL}/api/usuarios/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: refreshToken })
        });
      } catch (err) {
        console.error("Error al cerrar sesión en el servidor:", err);
      }
    }
    return { success: true };
}

module.exports = { cerrarSesion, verificarSesion, renovarToken };