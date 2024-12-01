import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './slices/userDataSlice.js';
import { userDataApi } from './rtk/userDataApi.js';

const store = configureStore({
    reducer: {
        userData: userDataSlice,
        [userDataApi.reducerPath]: userDataApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userDataApi.middleware)
});

export default store;
