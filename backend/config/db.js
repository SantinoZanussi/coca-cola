const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url = process.env.MONGO_URL || "mongodb+srv://dbUser:gQCU8LUpmav2rUfe@cluster0.tuepu.mongodb.net/";

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_url, {});
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
