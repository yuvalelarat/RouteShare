import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    token: '',
    trips: [],
    sharedTrips: [],
    isLoading: false
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserFirstName: (state, action) => {
            state.firstName = action.payload;
        },

        setUserLastName: (state, action) => {
            state.lastName = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },
        setTrips: (state, action) => {
            state.trips = action.payload;
        },
        setSharedTrips: (state, action) => {
            state.sharedTrips = action.payload;
        },
        logout: () => initialState
    }
});

export const {
    setUserFirstName,
    setUserLastName,
    setToken,
    setTrips,
    setSharedTrips,
    logout
} = userDataSlice.actions;

export default userDataSlice.reducer;
