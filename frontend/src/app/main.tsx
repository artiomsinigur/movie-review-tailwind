import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";

import { store } from "./store";
import HomePage from '../pages/HomePage';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* Step 3: Provide the store =============// */}
        <Provider store={store}>
            <HomePage />
        </Provider>
    </StrictMode>,
);
