import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import authReducer from "./authSlice";
import { adminApi } from "./adminApi";
import { reviewApi } from "./reviewApi";
import { animeApi } from "./animeApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [animeApi.reducerPath]: animeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, adminApi.middleware, reviewApi.middleware, reviewApi.middleware, animeApi.middleware,),
});
