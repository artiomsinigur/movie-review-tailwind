import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Establishes a connection to the SQLite database.
 * @returns {Promise<sqlite3.Database>} A promise that resolves with the database instance.
 */
export const connectDb = () => {
    return new Promise((resolve, reject) => {
        const dbPath = join(__dirname, 'database.db');
        const db = new (sqlite3.verbose().Database)(dbPath, (err) => {
            if (err) {
                console.error("Error connecting to database:", err.message);
                reject(err);
            } else {
                console.log("Connected to SQLite database at", dbPath);
                resolve(db);
            }
        });
    });
};
