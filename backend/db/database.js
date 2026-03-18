const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * Establishes a connection to the SQLite database.
 * @returns {Promise<sqlite3.Database>} A promise that resolves with the database instance.
 */
const connectDb = () => {
    return new Promise((resolve, reject) => {
        const dbPath = path.join(__dirname, 'database.db');
        const db = new sqlite3.Database(dbPath, (err) => {
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

module.exports = { connectDb };
