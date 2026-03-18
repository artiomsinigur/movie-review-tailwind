/**
 * Factory function to create a movie model with a given database instance.
 * @param {sqlite3.Database} db The database instance.
 * @returns {object} The movie model with data access methods.
 */
module.exports = (db) => {

    /**
     * Creates the 'movies' table if it doesn't already exist.
     * @returns {Promise<void>}
     */
    const createTableMovies = () => {
        return new Promise((resolve, reject) => {
            db.run(`CREATE TABLE IF NOT EXISTS movies (
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
            )`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    };

    /**
     * Finds a movie by its title.
     * @param {string} title The title of the movie to find.
     * @returns {Promise<object|undefined>} A promise that resolves with the movie row if found, otherwise undefined.
     */
    const findByTitle = (title) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM movies WHERE title = ?`;
            db.get(sql, [title], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    };

    /**
     * Inserts a new movie into the database.
     * @param {object} movie The movie object to insert.
     * @returns {Promise<number>} A promise that resolves with the ID of the newly inserted movie.
     */
    const insert = (movie) => {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO movies (title, rating, imdb, duration, release_date, director, music_composed_by, distributed_by, budget, genre, trailer_url, poster_url, description)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const params = [
                movie.title, movie.rating, movie.imdb, movie.duration,
                movie.release_date, movie.director, movie.music_composed_by, movie.distributed_by,
                movie.budget, movie.genre, movie.trailer_url, movie.poster_url, movie.description
            ];

            db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    };

    /**
     * Retrieves all movies from the database.
     * @returns {Promise<Array<object>>} A promise that resolves with an array of movie objects.
     */
    const getMovies = async () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM movies"
            db.all(sql, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        })
    }

    return {
        createTableMovies,
        findByTitle,
        insert,
        getMovies
    };
};