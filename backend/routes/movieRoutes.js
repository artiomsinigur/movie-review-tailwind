const express = require('express');
const movieController = require('../controllers/movieController')
const router = express.Router()

// Route only knows about the endpoint and the controller method
router.get('/movies', movieController.getMovies)
router.post('/movies', movieController.createMovie)
router.get('/movies/:id', movieController.getMovieById)
router.put('/movies/:id', movieController.updateMovieById)
router.delete('/movies/:id', movieController.deleteMovieById)

module.exports = router
