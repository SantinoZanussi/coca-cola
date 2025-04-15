const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const usuarioSchema = require('../Schemas/usuario');
const productoSchema = require('../Schemas/productos');
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Producto = mongoose.models.Producto || mongoose.model('Producto', productoSchema);
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || "secreto";

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

const verificarAdmin = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.user.userId);
        if (!usuario || !usuario.admin == true) {
            return res.status(403).json({ error: "Acceso denegado. Requiere permisos de administrador" });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Error en la autenticación" });
    }
}

router.get("/usuarios", verificarToken, verificarAdmin, async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, "-password"); // No manda la contraseña
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

router.put("/usuarios/:id", verificarToken, verificarAdmin, async (req, res) => {
    try {
        const { admin } = req.body;
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, { admin }, { new: true });

        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

        res.json({ mensaje: "Usuario actualizado", usuario });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
});

router.post("/productos", verificarToken, verificarAdmin, async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ error: "Error al agregar producto" });
    }
});

router.delete("/productos/:id", verificarToken, verificarAdmin, async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});

module.exports = router;