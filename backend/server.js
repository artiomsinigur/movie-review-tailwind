const express = require('express');
const { initializeTables } = require('./db/init');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

async function startServer() {
    try {
        // Initialize tables (now handles its own connection)
        await initializeTables();

        // Register movie routes
        app.use('/api', movieRoutes);

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
