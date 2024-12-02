import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:10000/trips';

export const tripsDataApi = createApi({
    reducerPath: 'tripsDataApi',
    baseQuery: async (args, api, extraOptions) => {
        const token = api.getState().userData.token;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const result = await fetchBaseQuery({ baseUrl, headers })(args, api, extraOptions);
        return result;
    },
    endpoints: (builder) => ({
        getMyTrips: builder.query({
            query: () => ({
                url: '/my-trips',
                method: 'GET'
            }),
            transformResponse: (response) => response.trips // Extract trips from the response
        }),
        getSharedTrips: builder.query({
            query: () => ({
                url: '/shared-trips',
                method: 'GET'
            }),
            transformResponse: (response) => response.trips // Extract trips from the response
        })
    })

});

export const { useGetMyTripsQuery, useGetSharedTripsQuery } = tripsDataApi;
