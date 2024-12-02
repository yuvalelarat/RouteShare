import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    token: '',
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
        logoutUser: () => initialState
    }
});

export const {
    setUserFirstName,
    setUserLastName,
    setToken,
    logoutUser
} = userDataSlice.actions;

export default userDataSlice.reducer;
