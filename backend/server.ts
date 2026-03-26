import express from 'express';
import cors from 'cors';
import { initializeTables } from './db/init.js';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', movieRoutes);

const startServer = async () => {
    try {
        await initializeTables();
        
        // Only listen when NOT running through Vite (or when in production)
        if (process.env.NODE_ENV === 'production' || !process.env.VITE) {
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }
    } catch (error: any) {
        console.error("Failed to start server:", error.message);
        if (!process.env.VITE) process.exit(1);
    }
};

startServer();

// Export for vite-plugin-node
export const viteNodeApp = app;
