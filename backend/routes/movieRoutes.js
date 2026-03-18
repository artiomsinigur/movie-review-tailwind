const express = require('express');
const movieController = require('../controllers/movieController')
const router = express.Router()

// Route only knows about the endpoint and the controller method
router.post('/new', movieController.createMovie)
router.get('/movies', movieController.getMovies)

module.exports = router