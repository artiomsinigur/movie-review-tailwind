import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type WatchlistResponse } from "../types";

const fetchFakeMovies = (amount?: number) => {
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: amount ?? 5 }), 1000)
    );
};

// RTK Query is Redux Toolkit's built-in data fetching and caching solution. 
// It operates in the same conceptual space as React Query, Apollo, or SWR. 
// With RTK Query, you stop writing reducers and thunks for API calls entirely.
// 1. Queries: For fetching data (GET).
// 2. Mutations: For altering data (POST, PUT, DELETE).
// 3. Tags: A genius caching system. You tag a query with 'Count'. 
    // When a mutation finishes, you tell it to invalidate the 'Count' tag. 
    // RTK Query will automatically refetch the query for you in the background.

export const watchlistApi = createApi({
    // The path in the redux store where the cache will live
    reducerPath: 'watchlistApi',

    // fetchBaseQuery is a lightweight wrapper around the native fetch API
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),

    // Tag types is for automated cache invalidation
    tagTypes: ['Watchlist'],

    endpoints: (builder) => ({
        // Fake api exemple
        getFakeWatchlist: builder.query<WatchlistResponse, number | void>({
            // 1. queryFn be used in place of query as an inline function 
            // that bypasses baseQuery completely for the endpoint.
            async queryFn(amount) {
                try {
                    const result = await fetchFakeMovies(amount ?? 5)
                    // 2. MUST return an object with a 'data' property
                    return { data: result }
                } catch (error) {
                    // 3. Or an object with a 'error' property
                    return { error: { status: 500, data: 'Fake API failed' } }
                }
            },
        }),
        // 1. QUERY: getWatchlist (Replaces the GET request)
        // <ReturnType, ArgumentType> (void means no arguments needed)
        getWatchlist: builder.query<WatchlistResponse, void>({
            query: () => 'watchlist', // Becomes GET /watchlist api

            // Determines which 'tag' is attached to the cached data returned by the query
            providesTags: ['Watchlist']
        }),

        // 2. MUTATION: addMovieToWatchlist (Replaces the POST request)
        // <ReturnType, ArgumentType>
        addMovieToWatchlist: builder.mutation<WatchlistResponse, number>({
            query: (amount) => ({
                url: 'watchlist',
                method: 'POST',
                body: { amount } // Automatically JSON stringified
            }),

            // THE MAGIC: When this mutation succeeds, invalidate the 'Watchlist' tag.
            // This forces the `getFakeWatchlist` query to automatically refetch!
            invalidatesTags: ['Watchlist']
        }),
    }),
})

// RTK Query AUTOMATICALLY generates React hooks based on your endpoint names!
export const { useGetWatchlistQuery, useAddMovieToWatchlistMutation, useGetFakeWatchlistQuery } = watchlistApi