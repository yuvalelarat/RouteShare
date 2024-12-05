import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:10000/';

export const tripsDataApi = createApi({
    reducerPath: 'tripsDataApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userData.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMyTrips: builder.query({
            query: () => ({
                url: 'trips/my-trips',
                method: 'GET',
            }),
            transformResponse: (response) => response.trips,
        }),
        getSharedTrips: builder.query({
            query: () => ({
                url: 'trips/shared-trips',
                method: 'GET',
            }),
            transformResponse: (response) => response.trips,
        }),
        getTrip: builder.query({
            query: (trip_id) => ({
                url: `trips/get-trip/${trip_id}`,
                method: 'GET',
            }),
            transformResponse: (response) => response,
        }),
        getAllJourneys: builder.query({
            query: (trip_id) => ({
                url: `/journeys/all-journeys/${trip_id}`,
                method: 'GET',
            }),
            transformResponse: (response) => response,
        }),
        createJourney: builder.mutation({
            query: ({ trip_id, day_number, country, description }) => ({
                url: '/journeys/new-journey',
                method: 'POST',
                body: { trip_id, day_number, country, description },
            }),
        }),
        deleteJourney: builder.mutation({
            query: ({ journey_id, trip_id }) => ({
                url: '/journeys/delete-journey',
                method: 'DELETE',
                body: { journey_id, trip_id },
            }),
        }),
    }),
});

export const {
    useGetMyTripsQuery,
    useGetSharedTripsQuery,
    useLazyGetTripQuery,
    useGetAllJourneysQuery,
    useCreateJourneyMutation,
    useDeleteJourneyMutation,
} = tripsDataApi;
