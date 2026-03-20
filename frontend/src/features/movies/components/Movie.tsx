import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { type AppDispatch, type RootState } from "../../../app/store";
import { increment, decrement, customIncrement } from "../movieSlice";

// Step 4: Consume in a Component ==============// 
export default function Movie() {
    // useSelector subscribes to ONLY this specific piece of state.
    // If `state.auth` updates, this component WILL NOT re-render.

    // Instead of useContext, use useSelector to read data
    const countMovie = useSelector((state: RootState) => state.movie.value)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            <h2>Movies: {countMovie}</h2>
            <button onClick={() => dispatch(increment())}>Add a movie</button>
            <button onClick={() => dispatch(decrement())}>Subtract a movie</button>
            <button onClick={() => dispatch(customIncrement(5))}>Add 5 movies</button>
        </div>
    )
} 