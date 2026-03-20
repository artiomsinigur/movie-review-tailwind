import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";

import { store } from "./store";
import Movie from '../features/movies/components/Movie';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* Step 3: Provide the store =============// */}
        <Provider store={store}>
            <h1>Hello world</h1>
            <Movie />
        </Provider>
    </StrictMode>,
);
