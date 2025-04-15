const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false, required: true },
    fechaRegistro: { type: Date, default: Date.now, required: true },
});

module.exports = usuarioSchema;
