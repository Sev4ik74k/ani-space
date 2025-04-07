import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5000/reviews";

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        fetchReviews: builder.query({
            query: () => "/",
        }),
    }),
});

export const { useFetchReviewsQuery } = reviewApi;
