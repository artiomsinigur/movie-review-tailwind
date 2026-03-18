const movieModelFactory = require('../models/movieModel');

/**
 * Initializes all necessary database tables.
 * @param {sqlite3.Database} db The database instance.
 * @returns {Promise<void>}
 */
const initializeTables = async (db) => {
    try {
        const movieModel = movieModelFactory(db); // Pass the db instance
        await movieModel.createTableMovies();
        console.log("All database tables initialized.");
    } catch (error) {
        console.error("Error initializing tables:", error.message);
        throw error;
    }
};

module.exports = { initializeTables };
