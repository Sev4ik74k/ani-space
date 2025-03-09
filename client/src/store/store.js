import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import reviewReducer from "./reviewSlice";
import userReducer from "./userSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        reviews: reviewReducer,
        user: userReducer,
    },
});
