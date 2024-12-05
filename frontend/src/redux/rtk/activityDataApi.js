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
    }),
});

export const { useLazyGetActivitiesQuery } = activityDataApi;
