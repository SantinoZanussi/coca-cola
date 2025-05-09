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
```
coca-cola-main/
│
├── backend/
│ ├── config/
│ │    └── db.js
│ ├── js/
│ │    ├── admin-panel.js
│ │    ├── perfil.js
│ │    ├── productos_marcas.js
│ │    ├── script_backend.js
│ │    └── sesion.js
│ ├── routes/
│ │    ├── admin.js
│ │    ├── marcas.js
│ │    ├── productos.js
│ │    ├── usuarios.js
│ ├── Schemas/
│ │    ├── usuario.js
│ │    ├── marcas.js
│ │    ├── productos.js
│ ├── server.js
│ └── .env
├── node_modules/
└── public/
  ├── index.html
  ├── assets/
  ├── js/
  │    ├── nav.js
  │    ├── render.js
  │    ├── script_frontend.js
  ├── html/
  └── css/
```

---

## 🗄️ Base de Datos

- **Usuario de MongoDB:** `dbUser`
- **Contraseña de MongoDB:** `gQCU8LUpmav2rUfe`
- **URL de conexión:** `mongodb+srv://dbUser:gQCU8LUpmav2rUfe@cluster0.tuepu.mongodb.net/`
- **Puerto:** `5000` 
- **Archivo `.env`** (ubicado en `proyecto/backend/.env`):

---

## 👥 Creador

Este proyecto fue desarrollado por:

- 👨‍💻 **Santino Zanussi**

---
