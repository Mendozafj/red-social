var express = require('express');
var router = express.Router();
var postsController = require("../controllers/posts.c");

/* POST crear pubicaciones */
router.post('/', async (req, res) => {
  try {
    const result = await postsController.create(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    return res.status(201).send("Publicación creada");
  } catch (error) {
    res.status(500).send("Error al crear la publicación");
  }
});

/* GET mostrar pubicaciones. */
router.get('/', async (req, res) => {
  try {
    const posts = await postsController.show();
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(`Error al listar publicaciones: ${err}`);
  }
});

/* GET mostrar publicación por id */
router.get('/:id', async (req, res) => {
  try {
    const post = await postsController.showByID(req.params.id);
    if (!post[0]) {
      return res.status(404).send(`No se encontró la publicación con id: ${req.params.id}`);
    }
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(`Error al buscar publicación: ${err}`);
  }
});

/* PUT editar publicación */
router.put('/:id', async (req, res) => {
  try {
    const result = await postsController.update(req.params.id, req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(`Error al editar la publicación: ${err}`);
  }
});

/* DELETE eliminar publicación */
router.delete('/:id', async (req, res) => {
  try {
    const result = await postsController.delete(req.params.id);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    res.status(200).send("publicación eliminada")
  } catch (err) {
    res.status(500).send(`Error al eliminar la publicación: ${err}`);
  }
});

module.exports = router;