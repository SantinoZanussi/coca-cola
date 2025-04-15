const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const usuarioSchema = require('../Schemas/usuario');
const Usuario = mongoose.model('Usuario', usuarioSchema);
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || "secreto";
const refreshTokens = new Set();

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ error: "No autorizado" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido" });
    }
};

router.post("/registro", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(401).json({ error: "El usuario ya existe" });
        }

        const contraseña = await bcrypt.hash(password, 10);

        const newUsuario = await Usuario({
            nombre: name,
            email: email,
            password: contraseña,
            admin: false,
            fechaRegistro: Date.now(),
        });

        await newUsuario.save();

        // crear tokens
        const accessToken = jwt.sign(
            { userId: newUsuario._id, admin: newUsuario.admin },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        
        const refreshToken = jwt.sign(
            { userId: newUsuario._id },
            SECRET_KEY,
            { expiresIn: "30d" }
        );

        refreshTokens.add(refreshToken);

        res.json({ accessToken, refreshToken });

        console.log("Usuario registrado");
    } catch (error) {
        console.error("Error en register:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }
        
        const passwordIsValid = await bcrypt.compare(password, usuario.password);
        if (!passwordIsValid) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // crear tokens
        const accessToken = jwt.sign(
            { userId: usuario._id, admin: usuario.admin },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        
        const refreshToken = jwt.sign(
            { userId: usuario._id },
            SECRET_KEY,
            { expiresIn: "30d" }
        );

        refreshTokens.add(refreshToken);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.post("/logout", (req, res) => {
    const { token } = req.body;
    refreshTokens.delete(token);
    res.status(204).send();
});

router.post("/token", (req, res) => {
    const { token } = req.body;
    //! (!token || !refreshTokens.has(token)) | va devolver false pq el registro Set(); se borra al reinciar el servidor.
    //! Necesita funcionar almacenando refreshTokens en la base de datos
    if (!token) {
        return res.status(403).json({ error: "Token inválido" });
    }

    try {
        const datos = jwt.verify(token, SECRET_KEY);
        const accessToken = jwt.sign(
            { userId: datos.userId },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ accessToken });
    } catch (error) {
        console.error("Error al renovar token:", error);
        res.status(403).json({ error: "Token inválido" });
    }
});

router.get("/perfil", verificarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.userId).select('-password');
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        console.error("Error al obtener perfil:", error);
        res.status(500).json({ error: "Error al obtener el perfil" });
    }
});

module.exports = router;