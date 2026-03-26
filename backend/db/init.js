import { createTableMovies } from '../models/movieModel.js';

/**
 * Initializes all necessary database tables.
 * @returns {Promise<void>}
 */
export const initializeTables = async () => {
    try {
        await createTableMovies();
        console.log("All database tables initialized.");
    } catch (error) {
        console.error("Error initializing tables:", error.message);
        throw error;
    }
};

// If this file is run directly (e.g., node db/init.js)
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('db/init.js')) {
    initializeTables().catch(err => {
        console.error(err);
        process.exit(1);
    });
}
