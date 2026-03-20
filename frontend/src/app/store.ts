import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../features/movies/movieSlice'

// Step 2: Configure the Store ===============//
export const store = configureStore({
    reducer: {
        movie: movieReducer,
        // Add other slices here as the app grows (e.g., auth: authReducer)
    }
})

// By exporting these types from your central store configuration,
// you avoid manually defining the state's shape in every
// component. If you later add a "user" slice to your store,   
// RootState will automatically include it, and TypeScript will   
// instantly know state.user exists across your whole app.

// Export types for use in the app
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
