const movieModel = require('../models/movieModel');

/**
 * Initializes all necessary database tables.
 * @returns {Promise<void>}
 */
const initializeTables = async () => {
    try {
        await movieModel.createTableMovies();
        console.log("All database tables initialized.");
    } catch (error) {
        console.error("Error initializing tables:", error.message);
        throw error;
    }
};

module.exports = { initializeTables };
