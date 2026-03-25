import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Movie, MoviesResponse, NewMovieRequest } from "../types";

// Fake api
export const fetchMovies = (amount: number) => {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 1000)
  );
};

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['Movie'],
    endpoints: (build) => ({
        getMovies: build.query<MoviesResponse, void>({
            query: () => ({
                url: 'movies',
                method: 'GET',
            }),
            providesTags: (result) => {
                const collections = { type: 'Movie' as const, id: 'LIST' as const }
                
                // 1 TAG: {type: 'Movie', id: 2}  ➡️  [ Matrix Data ]
                // 2 TAG: {type: 'Movie', id: 3}  ➡️  [ Interstellar Data ]
                // 3 TAG: {type: 'Movie', id: 'LIST'} ➡️ (Tracks the whole collection)
                return result 
                    ? [...result.data.map(({ id }) => ({ type: 'Movie' as const, id })), collections] 
                    : [collections]
            }
        }),
        addMovie: build.mutation<Movie, NewMovieRequest>({
            query: (body) => ({
                url: 'movies',
                method: 'POST',
                body: body
            }),
            invalidatesTags: [{ type: 'Movie', id: 'LIST' }],
        })
    }),
})

export const { useGetMoviesQuery, useAddMovieMutation } = movieApi