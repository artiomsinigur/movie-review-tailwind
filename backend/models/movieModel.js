import { connectDb } from '../db/database.js';

let db;
async function getDb() {
    if (!db) {
        db = await connectDb();
    }
    return db;
}

/**
 * Creates the 'movies' table if it doesn't already exist.
 */
export const createTableMovies = async () => {
    const database = await getDb();
    return new Promise((resolve, reject) => {
        database.run(
            `CREATE TABLE IF NOT EXISTS movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            rating TEXT,
            imdb REAL,
            duration INTEGER,
            release_date TEXT,
            director TEXT,
            music_composed_by TEXT,
            distributed_by TEXT,
            budget INTEGER,
            genre TEXT,
            trailer_url TEXT,
            poster_url TEXT,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
            (err) => {
                if (err) reject(err);
                else resolve();
            },
        );
    });
};

/**
 * Finds a movie by its title.
 */
export const findByTitle = async (title) => {
    const database = await getDb();
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM movies WHERE title = ?`;
        database.get(sql, [title], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row && row.genre) {
                    try { row.genre = JSON.parse(row.genre); } 
                    catch(e) { row.genre = []; }
                }
                resolve(row);
            }
        });
    });
};

/**
 * Inserts a new movie.
 */
export const insertMovie = async (movie) => {
    const database = await getDb();
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO movies (title, rating, imdb, duration, release_date, director, music_composed_by, distributed_by, budget, genre, trailer_url, poster_url, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            movie.title, movie.rating, movie.imdb, movie.duration,
            movie.release_date, movie.director, movie.music_composed_by, movie.distributed_by,
            movie.budget, movie.genre, movie.trailer_url, movie.poster_url, movie.description,
        ];

        database.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
};

/**
 * Retrieves all movies.
 */
export const getMovies = async () => {
    const database = await getDb();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM movies';
        database.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const formattedRows = rows.map((row) => {
                    if (row.genre) {
                        try { row.genre = JSON.parse(row.genre); } 
                        catch (e) { row.genre = []; }
                    }
                    return row;
                });
                resolve(formattedRows);
            }
        });
    });
};

/**
 * Retrieves a movie by its ID.
 */
export const getMovieById = async (id) => {
    const database = await getDb();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM movies WHERE id = ?';
        database.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row && row.genre) {
                    try { row.genre = JSON.parse(row.genre); } 
                    catch (e) { row.genre = []; }
                }
                resolve(row);
            }
        });
    });
};

/**
 * Checks if a movie exists by ID.
 */
export const existsById = async (id) => {
    const database = await getDb();
    return new Promise((resolve, reject) => {
        const sql = "SELECT 1 FROM movies WHERE id = ? LIMIT 1";
        database.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(!!row);
        });
    });
};

/**
 * Updates a movie by its ID.
 */
export const updateMovieById = async (id, movie) => {
    const database = await getDb();
    
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE movies 
            SET title = ?, rating = ?, imdb = ?, duration = ?, release_date = ?, 
                director = ?, music_composed_by = ?, distributed_by = ?, 
                budget = ?, genre = ?, trailer_url = ?, poster_url = ?, 
                description = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        const params = [
            movie.title, movie.rating, movie.imdb, movie.duration,
            movie.release_date, movie.director, movie.music_composed_by, movie.distributed_by,
            movie.budget, movie.genre, movie.trailer_url, movie.poster_url, movie.description,
            id
        ];

        database.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this.changes); // Returns number of rows affected
        });
    });
};

/**
 * Delete a movie by its ID.
 */
export const deleteMovieById = async (id) => {
    const database = await getDb();

    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM movies WHERE id = ?'
        database.run(sql, [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes); // Returns number of rows affected
        });
    });
};

export default {
    createTableMovies,
    findByTitle,
    insertMovie,
    getMovies,
    getMovieById,
    existsById,
    updateMovieById,
    deleteMovieById,
};
