import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userDataSlice from './slices/userDataSlice.js';
import { userDataApi } from './rtk/userDataApi.js';
import tripsDataSlice from './slices/tripsDataSlice.js';
import { tripsDataApi } from './rtk/tripsDataApi.js';
import { journeyDataApi } from './rtk/journeyDataApi.js';
import { activityDataApi } from './rtk/activityDataApi.js';
import { participantsDataApi } from './rtk/participantsDataApi.js';

const persistConfig = {
    key: 'userData',
    storage,
};

const persistedUserDataReducer = persistReducer(persistConfig, userDataSlice);

const store = configureStore({
    reducer: {
        userData: persistedUserDataReducer,
        tripsData: tripsDataSlice,
        [userDataApi.reducerPath]: userDataApi.reducer,
        [tripsDataApi.reducerPath]: tripsDataApi.reducer,
        [journeyDataApi.reducerPath]: journeyDataApi.reducer,
        [activityDataApi.reducerPath]: activityDataApi.reducer,
        [participantsDataApi.reducerPath]: participantsDataApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(
            userDataApi.middleware,
            tripsDataApi.middleware,
            journeyDataApi.middleware,
            activityDataApi.middleware,
            participantsDataApi.middleware,
        ),
});

const persistor = persistStore(store);

export { store, persistor };
