import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userDataSlice from './slices/userDataSlice.js';
import { userDataApi } from './rtk/userDataApi.js';
import tripsDataSlice from './slices/tripsDataSlice.js';
import { tripsDataApi } from './rtk/tripsDataApi.js';

const persistConfig = {
    key: 'userData',
    storage
};

const persistedUserDataReducer = persistReducer(persistConfig, userDataSlice);

const store = configureStore({
    reducer: {
        userData: persistedUserDataReducer,
        tripsData: tripsDataSlice,
        [userDataApi.reducerPath]: userDataApi.reducer,
        [tripsDataApi.reducerPath]: tripsDataApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        }).concat(userDataApi.middleware, tripsDataApi.middleware)
});

const persistor = persistStore(store);

export { store, persistor };
