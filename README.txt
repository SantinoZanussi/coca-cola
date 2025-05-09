# 🥤 Coca-Cola Web

---

## 🌐 Tecnologías utilizadas

### 🧱 Frontend
- HTML
- CSS
- JavaScript

### 🖥️ Backend
- Node.js
- Express
- MongoDB + Mongoose
- APIs REST

---

## 🎯 Objetivo del Proyecto

- Maquetación profesional con HTML y CSS.
- Lógica dinámica con JavaScript.
- Manejo de base de datos MongoDB usando Mongoose.
- Administración básica de productos y usuarios.

---

## 🚧 Estado del Proyecto

Actualmente en desarrollo. Faltantes por orden de prioridad:

- 🗃️ Base de datos con usuarios (registro, login y compras) + panel admin para editar precios.
- 🛒 Pestaña de compra de productos (con procesador de pagos *ficticio*).
- 🏠 Funcionalidad de logo principal: redirecciona a `index.html` (excepto desde el propio index).
- 🏷️ Pestañas de texto: `Marcas`, `Descubrir`, `Impacto`. [texto]
- 📜 Footer con enlaces informativos: `Sobre Nosotros` y `Legal`. [texto]

---

## 📁 Estructura del Proyecto

proyecto/
│
├── frontend/
│ ├── index.html
│ ├── estilos/
│ └── scripts/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env


---

## 🗄️ Base de Datos

- **Usuario MongoDB:**
dbUser | gQCU8LUpmav2rUfe

- **URL de conexión:**
mongodb+srv://dbUser:gQCU8LUpmav2rUfe@cluster0.tuepu.mongodb.net/


- **Archivo `.env`** (ubicado en `proyecto/backend/.env`):

```env
PORT=5000
MONGO_URL=mongodb+srv://dbUser:gQCU8LUpmav2rUfe@cluster0.tuepu.mongodb.net/
BASE_URL=http://localhost:5000
