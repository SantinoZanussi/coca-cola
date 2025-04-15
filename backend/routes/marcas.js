const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const marcasSchema = require('../Schemas/marcas');
const Marca = mongoose.model('Marca', marcasSchema);

router.get("/", async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        console.error("Error al obtener marcas:", error);
        res.status(500).json({ error: "Error al obtener las marcas" });
    }
});

module.exports = router;
