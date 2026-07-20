import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://pixora-backend-smoky.vercel.app";

export const fetchProfile = createAsyncThunk("profile/fetchProfile",

    async () => {

        const response = await axios.get(
            `${BASE_URL}/auth/myprofile`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        console.log("Profile API Response:", response.data);
        return response.data;

    }
);


export const profileSlice = createSlice({

    name: "profile",

    initialState: {
        user: null,
        stats: null,
        status: "idle",
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(fetchProfile.fulfilled, (state, action) => {

            state.user = action.payload.user;
            state.stats = action.payload.stats;
            state.status = "success";
        });
    },
});

export default profileSlice.reducer;