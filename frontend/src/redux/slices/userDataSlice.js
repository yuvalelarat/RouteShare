import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    token: '',
    email: '',
    isLoading: false,
    loginTime: null,
    logoutTime: null,
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
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setLoginTime: (state, action) => {
            state.loginTime = action.payload;
        },
        setLogoutTime: (state, action) => {
            state.logoutTime = action.payload;
        },
        logoutUser: (state) => {
            state.firstName = '';
            state.lastName = '';
            state.token = '';
            state.email = '';
            state.isLoading = false;
            state.logoutTime = new Date().toISOString();
        },
    },
});

export const {
    setUserFirstName,
    setUserLastName,
    setToken,
    setEmail,
    setLoginTime,
    setLogoutTime,
    logoutUser,
} = userDataSlice.actions;

export default userDataSlice.reducer;
