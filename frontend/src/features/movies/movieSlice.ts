import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MovieState } from './types'

// Step 1: Create a "Slice" ================//
// 1. Define the state shape
export const initialState: MovieState = {
    value: 0
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
    }
})

// 3. Export the auto-generated action creators
export const { increment, decrement, customIncrement } = movieSlice.actions
// 4. Export the reducer to be included in the store
export default movieSlice.reducer