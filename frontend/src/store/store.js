import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './resultsSlice';

const store = configureStore({
    reducer: {
        results: resultsReducer,
    },
});

export default store;