const mongoose = require("mongoose");

async function connectDB() {
    await mongoose
        .connect("mongodb://172.17.0.2:27017/dbmiddlewares")
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Não Foi possivel conectar ao Banco de dados " + err);
        });
}

module.exports = connectDB;
