import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:10000/users';

export const userDataApi = createApi({
    reducerPath: 'userDataApi',
    baseQuery: async (args, api, extraOptions) => {
        const token = api.getState().userData.token;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const result = await fetchBaseQuery({ baseUrl, headers })(args, api, extraOptions);
        return result;
    },
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        })
    })
});

export const { useLoginUserMutation, useGetSharedTripsQuery } = userDataApi;
