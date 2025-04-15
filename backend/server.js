const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const { ejecutarFunciones } = require("./js/script_backend");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//* Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

//* API ROUTES
const productosRoutes = require('./routes/productos');
const marcasRoutes = require('./routes/marcas');
const usuariosRoutes = require('./routes/usuarios');
const adminRoutes = require('./routes/admin');

app.use('/api/productos', productosRoutes);
app.use('/api/marcas', marcasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/admin', adminRoutes);
app.post("/api/navegar", async (req, res) => {
    // frontend enviará { pagina: "/perfil", extra: { ... } }
    const { pagina, extra } = req.body;
    try {
      const resultado = await ejecutarFunciones(pagina, extra);
      res.json(resultado);
    } catch (err) {
      console.error("Error en /api/navegar:", err);
      res.status(500).json({ success: false, message: "Error interno" });
    }
});

//* Rutas camufladas

app.get("/perfil", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'perfil.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'header', 'iniciar_sesion.html'));
});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'header', 'registrarse.html'));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'admin.html'));
});

app.get("/marcas", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'header', 'marcas.html'));
});

app.get("/comprar", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'comprar.html'));
});

app.get("/social", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'header', 'social.html'));
});

app.get("/sostenibilidad", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'header', 'sostenibilidad.html'));
});

app.get("/desarrollador", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'desarrollador.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//! Error 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public', './html/err/404.html'));
});

//! Middleware para manejar 404 en rutas API
app.all('/api/*', (req, res) => {
    res.status(404).json({ error: "Ruta API no encontrada" });
});

//* Iniciar servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Error al conectar a la base de datos:", err);
});