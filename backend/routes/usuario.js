const express = require("express");
const router = express.Router();
// Modulos creados
const { Usuario } = require("../model/usuario");
// Ruta
router.post("/", async(req, res) => {
    let usuario = await Usuario.findOne({correo: req.body.correo});

    if(usuario) return res.status(400).send("El usuario ya esta registrado");

    usuario = new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        pass: req.body.pass,
    })
    const result = await usuario.save();
    const jwtToken = usuario.generateJWT();
    res.status(200).send({jwtToken})
});
// Exports
module.exports = router;
