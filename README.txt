# 🥤 Coca-Cola Web

---

## 🌐 Tecnologías Utilizadas

### 🧱 Frontend
* HTML
* CSS
* JavaScript

### 🖥️ Backend
* Node.js
* Express
* MongoDB + Mongoose
* APIs REST

---

## 🎯 Objetivo del Proyecto

Este proyecto tiene como objetivo desarrollar una plataforma web con las siguientes funcionalidades principales:

* Maquetación profesional y adaptable utilizando HTML y CSS.
* Implementación de interacciones dinámicas mediante JavaScript.
* Gestión de datos a través de una base de datos MongoDB con Mongoose.
* Desarrollo de una administración básica de productos y usuarios mediante APIs REST.

---

## 🚧 Estado del Proyecto

Actualmente, el proyecto se encuentra **en desarrollo**. Las siguientes funcionalidades están pendientes por orden de prioridad:

* **🗃️ Gestión de usuarios:** Implementación de registro, inicio de sesión y un sistema de compras. Se incluirá un panel de administración para la modificación de precios.
* **🛒 Sección de compra de productos:** Desarrollo de una interfaz para la visualización y selección de productos, integrando un simulador de procesamiento de pagos.
* **🏠 Funcionalidad del logo:** Configuración del logo principal para que redirija a la página de inicio (`index.html`), excepto cuando el usuario ya se encuentre en ella.
* **🏷️ Contenido de texto:** Creación e inclusión del contenido para las secciones `Marcas`, `Descubrir` e `Impacto`.
* **📜 Enlaces informativos:** Implementación de un pie de página con enlaces a las secciones `Sobre Nosotros` y `Legal`, incluyendo el texto correspondiente.

---

## 🗄️ Base de Datos

* **Usuario de MongoDB:** `dbUser`
* **Contraseña de MongoDB:** `gQCU8LUpmav2rUfe`
* **URL de Conexión:** `mongodb+srv://dbUser:gQCU8LUpmav2rUfe@cluster0.tuepu.mongodb.net/`

**Archivo `.env` (ubicado en `proyecto/backend/.env`):**

```env
PORT=5000
MONGO_URL=mongodb+srv://dbUser:gQCU8LUpmav2rUfe@cluster0.tuepu.mongodb.net/
BASE_URL=http://localhost:5000
