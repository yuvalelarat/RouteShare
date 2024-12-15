import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trips: [],
    sharedTrips: [],
    isLoading: false
};

const tripsDataSlice = createSlice({
    name: 'tripsData',
    initialState,
    reducers: {
        setTrips: (state, action) => {
            state.trips = action.payload;
        },
        setSharedTrips: (state, action) => {
            state.sharedTrips = action.payload;
        },
        logoutTrips: () => initialState
    }
});

export const { setTrips, setSharedTrips, logoutTrips } = tripsDataSlice.actions;

export default tripsDataSlice.reducer;
