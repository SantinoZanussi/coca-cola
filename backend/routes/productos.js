const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productoSchema = require('../Schemas/marcas');
const Producto = mongoose.models.Producto || mongoose.model('Producto', productoSchema);

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

router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos." });
    }
});

router.post('/', verificarToken, async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto." });
    }
});

module.exports = router;
