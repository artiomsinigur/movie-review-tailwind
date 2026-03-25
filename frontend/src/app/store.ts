import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../features/movies/movieSlice'
import { movieApi } from '../features/movies/api/moviesApi'
import { watchlistApi } from '../features/watchlist/api/watchlistApi'

// Step 2: Configure the Store ===============//
export const store = configureStore({
    reducer: {
        movie: movieReducer,
        // Add other slices here as the app grows (e.g., auth: authReducer)

        // Our server state cache
        [movieApi.reducerPath]: movieApi.reducer,
        [watchlistApi.reducerPath]: watchlistApi.reducer,
    },
    // Adding the API middleware enables caching, invalidation, polling, and other features
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(movieApi.middleware)
            .concat(watchlistApi.middleware),
})

// By exporting these types from your central store configuration,
// you avoid manually defining the state's shape in every
// component. If you later add a "user" slice to your store,   
// RootState will automatically include it, and TypeScript will   
// instantly know state.user exists across your whole app.

// Export types for use in the app
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
