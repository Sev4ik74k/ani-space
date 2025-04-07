import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5000/admin";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.user?.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        makeAdmin: builder.mutation({
            query: (email) => ({
                url: "/make-admin",
                method: "PUT",
                body: { email },
            }),
        }),
        removeAdmin: builder.mutation({
            query: (email) => ({
                url: "/remove-admin",
                method: "PUT",
                body: { email },
            }),
        }),
    }),
});

export const { useMakeAdminMutation, useRemoveAdminMutation } = adminApi;
