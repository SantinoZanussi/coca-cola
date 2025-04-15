require('dotenv').config();
const BASE_URL = process.env.BASE_URL;

async function cargarProductos() {
    try {
      const response = await fetch(`${BASE_URL}/api/productos`);
      if (!response.ok) {
        return { success: false, message: `Error al obtener productos: ${response.status}` };
      }
      const productos = await response.json();
      return { success: true, data: productos };
    } catch (error) {
      console.error("Error en cargarProductos:", error);
      return { success: false, message: "Error de red al cargar productos" };
    }
}

async function cargarMarcas() {
    try {
      const response = await fetch(`${BASE_URL}/api/marcas`);
      if (!response.ok) {
        return { success: false, message: `Error al obtener marcas: ${response.status}` };
      }
      const marcas = await response.json();
      return { success: true, data: marcas };
    } catch (error) {
      console.error("Error en cargarMarcas:", error);
      return { success: false, message: "Error de red al cargar marcas" };
    }
  }

module.exports = { cargarProductos, cargarMarcas };