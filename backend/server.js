const express = require('express');
const { connectDb } = require('./db/database');
const { initializeTables } = require('./db/init');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Global variable for db instance
let db;

async function startServer() {
    try {
        // Connect to the database
        db = await connectDb();

        // Initialize tables
        await initializeTables(db);

        // Register movie routes
        app.use('/', movieRoutes);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

startServer();
