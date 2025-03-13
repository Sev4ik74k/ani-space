import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const animeApi = createApi({
    reducerPath: "animeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    endpoints: (builder) => ({
        getAnimeList: builder.query({
            query: () => "/anime",
        }),
        getOngoingAnime: builder.query({
            query: () => "/anime/ongoings",
        }),
        rateAnime: builder.mutation({
            query: ({ slug, rating }) => ({
                url: `/anime/${slug}/rate`,
                method: "POST",
                body: { rating },
            }),
        }),
    }),
});

export const { useGetAnimeListQuery, useGetOngoingAnimeQuery, useRateAnimeMutation } = animeApi;
