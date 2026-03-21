import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MovieState } from './types'
import { fetchMovies } from './api/moviesApi'

// Step 1 async: Create an async thunk
// The first argument is the action type prefix ('movie/fetchMovies')
// RTK will automatically dispatch:
// - 'movie/fetchMovies/pending' when started
// - 'movie/fetchMovies/fulfilled' when successful
// - 'movie/fetchMovies/rejected' if it throws an error
export const incrementAsync = createAsyncThunk(
    'movie/fetchMovies',
    async (amount: number) => {
        const response = await fetchMovies(amount)
        // Whatever response return here becomes the `action.payload` in the fulfilled reducer
        return response.data
    }
)

// Step 1: Create a "Slice" ================//
// 1. Define the state shape
export const initialState: MovieState = {
    value: 0,
    status: 'idle'
}

// 2. Create the slice
export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        customIncrement: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    },
    // Step 2 async: Handle async actions
    // extraReducers is where you handle actions created outside of this slice 
    // (like createAsyncThunk above)
    extraReducers(builder) {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value += action.payload
            })
            .addCase(incrementAsync.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

// 3. Export the auto-generated action creators
export const { increment, decrement, customIncrement } = movieSlice.actions
// 4. Export the reducer to be included in the store
export default movieSlice.reducer