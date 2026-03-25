import React from "react";
import { useAddMovieMutation } from "../api/moviesApi";
import type { NewMovieRequest } from "../types";

const movieData: NewMovieRequest = {
    title: "Inception",
    rating: "PG-13",
    imdb: 8.8,
    duration: 148,
    release_date: "2010-07-16",
    director: "Christopher Nolan",
    music_composed_by: "Hans Zimmer",
    distributed_by: "Warner Bros. Pictures",
    budget: 160000000,
    genre: ["Action", "Sci-Fi", "Adventure"],
    trailer_url: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    poster_url: "https://image.tmdb.org/t/p/original/qmDpS9ZCCmTvZu36qCbmvSNDmC6.jpg",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
}

export const NewMovie = () => {
    // 1. Initialize the mutation hook.
    // It returns a tuple: [triggerFunction, { isLoading, isError, data, etc. }]
    const [addMovie, { isLoading, isError, error }] = useAddMovieMutation();

    const handleAddMovie = async () => {
        try {
            // 2. Call the trigger function with the movie data.
            // .unwrap() allows you to handle the result or error directly in the component.
            await addMovie(movieData).unwrap();
            alert("Movie added successfully!");
        } catch (err) {
            console.error("Failed to add movie:", err);
        }
    }

    return (
        <div className="p-4 border rounded shadow-md bg-white">
            <h3 className="text-lg font-bold mb-2">Add New Movie</h3>
            <div className="mb-4">
                <p><strong>Title:</strong> {movieData.title}</p>
                <p><strong>Director:</strong> {movieData.director}</p>
            </div>
            
            <button 
                onClick={handleAddMovie}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {isLoading ? "Adding..." : "Add Inception"}
            </button>

            {isError && (
                <p className="text-red-500 mt-2">
                    Error: {JSON.stringify(error)}
                </p>
            )}
        </div>
    );
}
