import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userDataSlice from './slices/userDataSlice.js';
import { userDataApi } from './rtk/userDataApi.js';

const persistConfig = {
    key: 'userData',
    storage
};

const persistedUserDataReducer = persistReducer(persistConfig, userDataSlice);

const store = configureStore({
    reducer: {
        userData: persistedUserDataReducer,
        [userDataApi.reducerPath]: userDataApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userDataApi.middleware)
});

const persistor = persistStore(store);

export { store, persistor };
