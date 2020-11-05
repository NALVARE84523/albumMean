const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// Esquema
const esquemaUsuario = new mongoose.Schema({
    nombre: String,
    correo: String,
    pass: String,
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
});
// JWT
esquemaUsuario.methods.generateJWT = function () {
    return jwt.sign({
        _id: this._id,
        nombre: this.nombre,
        correo: this.correo,
    }, "clave")
}
// Exports
const Usuario = mongoose.model("usuario", esquemaUsuario);
module.exports.Usuario = Usuario;
module.exports.esquemaUsuario = esquemaUsuario;