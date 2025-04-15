const mongoose = require('mongoose');

const marcasSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
});

module.exports = marcasSchema;