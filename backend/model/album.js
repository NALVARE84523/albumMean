const mongoose = require("mongoose");
// Esquema
const esquemaAlbum = new mongoose.Schema({
  idUsuario: String,
  nombre: String,
  imagen: String,
  fecha: {
    type: Date,
    default: Date.now,
  },
});
// Exports
const Album = mongoose.model("album", esquemaAlbum);
module.exports.Album = Album;
