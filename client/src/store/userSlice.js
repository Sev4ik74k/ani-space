import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/users";

export const fetchUserByUsername = createAsyncThunk(
    "user/fetchUser",
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${username}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Ошибка загрузки пользователя");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearUser: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserByUsername.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserByUsername.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
