const express = require("express");
const router = express.Router();

const { Album } = require("../model/album");
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");
const cargarArchivo = require("../middleware/file");

router.get("/lista", auth, async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);

  if (!usuario) return res.status(400).send("El usuario no existe");

  const album = await Album.find({ idUsuario: req.usuario._id });
  res.send(album);
});

router.post("/", auth, async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);

  if (!usuario) return res.status(401).send("El usuario no existe");

  const album = new Album({
    idUsuario: usuario._id,
    nombre: req.body.nombre,
    imagen: req.body.imagen,
  });

  const result = await album.save();
  res.status(200).send({ result });
});

router.post(
  "/cargarArchivo",
  cargarArchivo.single("imagen"),
  auth,
  async (req, res) => {
    const url = req.protocol + "://" + req.get("host");

    const usuario = Usuario.findById(req.usuario._id);

    if (!usuario) return res.status(401).send("El usuario no existe");

    let rutaImagen = null;
    if (req.file.filename) {
      rutaImagen = url + "/public/" + req.file.filename;
    } else {
      rutaImagen = null;
    }

    const album = new Album({
      idUsuario: usuario._id,
      nombre: req.body.nombre,
      imagen: rutaImagen,
    });
    const result = await album.save();
    res.status(200).send(result);
  }
);

router.put("/", auth, async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);

  if (!usuario) return res.status(401).send("El usuario no existe");

  const album = await Album.findByIdAndUpdate(
    req.body._id,
    {
      idUsuario: usuario._id,
      nombre: req.body.nombre,
      imagen: req.body.imagen,
    },
    {
      new: true,
    }
  );

  if (!album) return res.status(401).send("No hay album asignado");

  res.status(200).send(album);
});

router.delete("/:_id", auth, async (req, res) => {
  const usuario = await Usuario.findById(req.usuario._id);

  if (!usuario) return res.status(401).send("El usuario no existe");

  const album = await Album.findByIdAndDelete(req.params._id);

  if (!album) return res.status(401).send("No hay album asignado");

  res.status(200).send({ message: "Actividad eliminada" });
});

module.exports = router;
