import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5000";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        fetchUserByUsername: builder.query({
            query: (username) => `/users/${username}`,
        }),
    }),
});

export const { useFetchUserByUsernameQuery } = userApi;
