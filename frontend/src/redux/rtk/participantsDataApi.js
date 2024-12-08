import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:10000/participants';

export const participantsDataApi = createApi({
    reducerPath: 'participantsDataApi',
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
        getParticipants: builder.query({
            query: (trip_id) => ({
                url: `/all-participants/${trip_id}`,
                method: 'GET',
            }),
            transformResponse: (response) => response,
        }),
    }),
});

export const { useLazyGetParticipantsQuery } = participantsDataApi;
