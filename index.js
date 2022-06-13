const express = require("express");
const connectDB = require("./connectMongoDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./Models");
app.use(express.json());

connectDB();

function checkid(req, res, next) {
    const id = req.headers;
    if (!id) {
        return res.status(401).json({ acesso: "Não autorizado." });
    }
    try {
    } catch (error) {
        res.status(400).json({ msg: "token invalido" });
    }
}

app.get("/usr/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).exec((err, user) => {
        if (!user) {
            res.status(422).json({
                msg: "Nada encontrado com o ID informado.",
            });
        } else {
            res.status(200).json(user);
        }
    });
});

app.post("/usr", async (req, res) => {
    const { name, email } = req.body;
    if (!name) {
        return res.status(422).json({ msg: "O nome é obrigatório" });
    }
    if (!email) {
        return res.status(422).json({ msg: "O e-mail é obrigatório" });
    }
    // verificando se existem usuarios com o email enviado
    const userExist = await User.findOne({ email: email });
    console.log(email);
    console.log(userExist);
    if (userExist) {
        return res.status(422).json({ msg: "utilize outro email" });
    }
    const user = new User({ name, email });

    try {
        await user.save();

        return res.status(201).json({ msg: "Dados salvos ok" });
    } catch (error) {
        return res.status(422).json({ msg: "Dados não foram salvos", err });
    }
});

app.put("/update/:id", (req, res) => {
    const usr = req.body;
    const user = await User.findById(req.params.id)
});

app.delete("/usr/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = await User.findByIdAndDelete(id);
    if (user) {
        try {
            User.findByIdAndRemove(user);
            return res.status(200).json({ msg: "User deleted" });
        } catch (error) {
            return res
                .status(422)
                .json({ msg: "dados não foram deletados" + err });
        }
    } else {
        return res.status(422).json({ msg: "Usuario não encontrado." });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("🚀 Nodejs is running.");
});
