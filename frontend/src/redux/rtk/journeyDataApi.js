import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:10000/journeys';

export const journeyDataApi = createApi({
    reducerPath: 'journeyDataApi',
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
        getAllJourneys: builder.query({
            query: (trip_id) => ({
                url: `/all-journeys/${trip_id}`,
                method: 'GET',
            }),
            transformResponse: (response) => response,
        }),
        createJourney: builder.mutation({
            query: ({ trip_id, day_number, country, description }) => ({
                url: '/new-journey',
                method: 'POST',
                body: { trip_id, day_number, country, description },
            }),
        }),
        deleteJourney: builder.mutation({
            query: ({ journey_id, trip_id }) => ({
                url: '/delete-journey',
                method: 'DELETE',
                body: { journey_id, trip_id },
            }),
        }),
        editJourney: builder.mutation({
            query: ({ trip_id, journey_id, day_number, country, description }) => ({
                url: '/edit-journey',
                method: 'PATCH',
                body: { trip_id, journey_id, day_number, country, description },
            }),
        }),
    }),
});

export const {
    useGetAllJourneysQuery,
    useCreateJourneyMutation,
    useDeleteJourneyMutation,
    useEditJourneyMutation,
} = journeyDataApi;
