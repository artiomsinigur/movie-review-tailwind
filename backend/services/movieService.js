const movieModel = require('../models/movieModel')

// Handles business rules. Notice there is no req, res, or SQL here.
exports.addMovie = async (data) => {
    // 1. Validations
    if (!data.title) {
        throw new Error("Movie title is required")
    }

    // 2. Check for duplicates, etc.
    const existingMovie = await movieModel.findByTitle(data.title)
    if (existingMovie) {
        throw new Error("Movie already exists with this title")
    }

    // 3. Format data (e.g., stringify arrays for SQLite shortcut)
    const formattedData = {
        ...data,
        genre: JSON.stringify(data.genre || "[]")
    }

    // 4. Pass to the Model layer to save (The Data Access Layer)
    const insertId = await movieModel.insertMovie(formattedData)

    return { id: insertId, ...data }
}

exports.getMovies = async () => {
    return await movieModel.getMovies()
}

exports.getMovie = async (id) => {
    if (isNaN(id)) {
        const customError = new Error("Provide a valid ID")
        customError.status = 400
        throw customError
    }

    const exists = await movieModel.existsById(id)
    if (!exists) {
        const customError = new Error(`Movie with ID ${id} not found`)
        customError.status = 404
        throw customError
    }
    
    return await movieModel.getMovieById(id)
}

exports.updateMovie = async (id, data) => {
    if (isNaN(id)) {
        const customError = new Error("Provide a valid ID")
        customError.status = 400
        throw customError
    }

    const exists = await movieModel.existsById(id)
    if (!exists) {
        const customError = new Error("Movie not found")
        customError.status = 404
        throw customError
    }

    const formattedData = {
        ...data,
        genre: JSON.stringify(data.genre || "[]")
    }

    const changes = await movieModel.updateMovieById(id, formattedData)
    if (changes === 0) {
        throw new Error("No changes made to the movie")
    }

    return await movieModel.getMovieById(id)
}

exports.deleteMovie = async (id) => {
    if (isNaN(id)) {
        const customError = new Error("Provide a valid ID")
        customError.status = 400
        throw customError
    }

    const exists = await movieModel.existsById(id)
    if (!exists) {
        const customError = new Error("Movie not found")
        customError.status = 404
        throw customError
    }

    const changes = await movieModel.deleteMovieById(id)
    return changes > 0
}