import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:10000/activities';

export const activityDataApi = createApi({
    reducerPath: 'activityDataApi',
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
        getActivities: builder.query({
            query: (journey_id) => ({
                url: `/all-activities/${journey_id}`,
                method: 'GET',
            }),
            transformResponse: (response) => response,
        }),
        getActivitiesByTripId: builder.query({
            query: (trip_id) => ({
                url: `/all-activities-trip-id/${trip_id}`,
                method: 'GET',
            }),
            transformResponse: (response) => response,
        }),
        createActivity: builder.mutation({
            query: ({
                journey_id,
                activity_name,
                location,
                activity_type,
                cost,
                paid_by,
                payment_method,
                description,
            }) => ({
                url: `/new-activity/${journey_id}`,
                method: 'POST',
                body: { activity_name, location, activity_type, cost, paid_by, payment_method, description },
            }),
        }),
        deleteActivity: builder.mutation({
            query: ({ activity_id, journey_id }) => ({
                url: `/delete-activity/${activity_id}`,
                method: 'DELETE',
                body: { journey_id },
            }),
        }),
    }),
});

export const {
    useGetActivitiesQuery,
    useLazyGetActivitiesQuery,
    useGetActivitiesByTripIdQuery,
    useLazyGetActivitiesByTripIdQuery,
    useCreateActivityMutation,
    useDeleteActivityMutation,
} = activityDataApi;
