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
        addParticipant: builder.mutation({
            query: ({ trip_id, email, role }) => ({
                url: `/add-participant`,
                method: 'POST',
                body: { trip_id, email, role },
            }),
            transformResponse: (response) => response,
        }),
        removeParticipant: builder.mutation({
            query: ({ trip_id, email }) => ({
                url: `/remove-participant`,
                method: 'DELETE',
                body: { trip_id, email },
            }),
            transformResponse: (response) => response,
        }),
        editParticipantRole: builder.mutation({
            query: ({ trip_id, email, new_role }) => ({
                url: `/edit-participant-role`,
                method: 'PATCH',
                body: { trip_id, email, new_role },
            }),
            transformResponse: (response) => response,
        }),
    }),
});

export const {
    useLazyGetParticipantsQuery,
    useAddParticipantMutation,
    useRemoveParticipantMutation,
    useEditParticipantRoleMutation,
} = participantsDataApi;
