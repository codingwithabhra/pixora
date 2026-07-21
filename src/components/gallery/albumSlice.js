import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://pixora-backend-self.vercel.app/albums";
const BASE_URL_2 = "https://pixora-backend-self.vercel.app";

const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

//fetch all albums
export const fetchAlbums = createAsyncThunk("albums/fetchAlbums",
    async () => {
        const response = await axios.get(BASE_URL,
            {
                headers: getHeaders()
            }
        );

        return response.data;
    });

//create albums
export const createAlbums = createAsyncThunk(
    "albums/createAlbum",
    async (newAlbum, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                BASE_URL,
                newAlbum,
                {
                    headers: getHeaders(),
                }
            );

            return response.data.album;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create album"
            );
        }
    }
);

//fetch album by id
export const fetchAlbumById = createAsyncThunk("albums/fetchAlbumById",
    async (id) => {
        const response = await axios.get(
            `${BASE_URL}/${id}`,
            {
                headers: getHeaders()
            }
        );

        return response.data;
    }
);

//update album
export const updateAlbumById = createAsyncThunk("albums/updateAlbumById",
    async ({ id, updatedData }) => {
        const response = await axios.post(
            `${BASE_URL}/${id}`,
            updatedData,
            {
                headers: getHeaders()
            }
        );

        return response.data.album;
    }
);

//delete album
export const deleteAlbumById = createAsyncThunk("albums/deleteAlbumById",
    async (id) => {
        const response = await axios.delete(
            `${BASE_URL}/${id}`,
            {
                headers: getHeaders()
            }
        );

        return id;
    }
);

//to Share Album
export const shareAlbum = createAsyncThunk("albums/shareAlbum",
    async ({ albumId, userIds }) => {
        const response = await axios.post(
            `${BASE_URL}/${albumId}/share`,
            {
                userIds
            },
            {
                headers: getHeaders()
            }
        );

        return {
            albumId,
            sharedUsers: response.data.sharedUsers
        };
    }
);

//fetch shared albums
export const fetchSharedAlbums = createAsyncThunk("albums/fetchSharedAlbums",
    async () => {
        const response = await axios.get(
            `${BASE_URL}/shared/albumlist`,
            {
                headers: getHeaders()
            }
        );

        return response.data;
    }
);

export const fetchUsers = createAsyncThunk("albums/fetchUsers",
    async () => {
        const response = await axios.get(
            `${BASE_URL_2}/auth/all-users`,
            {
                headers: getHeaders()
            }
        );

        return response.data;
    }
);

//fetch albums shared with me
export const fetchSharedWithMeAlbums = createAsyncThunk("albums/fetchSharedWithMeAlbums",
    async () => {
        const response = await axios.get(
            `${BASE_URL}/shared-with-me`,
            {
                headers: getHeaders()
            }
        );

        return response.data;
    }
);

/* --------------------------------- CREATING SLICE --------------------------------------------- */

export const albumSlice = createSlice({
    name: "albums",

    initialState: {
        albums: [],
        users: [],
        sharedAlbums: [],
        sharedWithMeAlbums: [],
        selectedAlbum: null,
        status: "idle",
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {

        //fetch albums
        builder.addCase(fetchAlbums.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(fetchAlbums.fulfilled, (state, action) => {
            state.status = "success";
            state.albums = action.payload;
        });

        builder.addCase(fetchAlbums.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });

        // Add Album
        builder.addCase(createAlbums.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });

        builder.addCase(createAlbums.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload;
        });

        // Fetch Album By Id
        builder.addCase(fetchAlbumById.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(fetchAlbumById.fulfilled, (state, action) => {
            state.status = "success";
            state.selectedAlbum = action.payload;
        });

        builder.addCase(fetchAlbumById.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });

        // Update Album
        builder.addCase(updateAlbumById.fulfilled, (state, action) => {

            const updatedAlbum = action.payload;
            const index = state.albums.findIndex(
                album => album._id === updatedAlbum._id
            );
            if (index !== -1) {
                state.albums[index] = updatedAlbum;
            }
            state.selectedAlbum = updatedAlbum;
        });

        // Delete Album
        builder.addCase(deleteAlbumById.fulfilled, (state, action) => {

            state.status = "success";
            state.albums = state.albums.filter(
                album => album._id !== action.payload
            );
            state.selectedAlbum = null;
        });

        // fetch shared albums
        builder.addCase(fetchSharedAlbums.fulfilled, (state, action) => {
            state.sharedAlbums = action.payload;
        });

        // share album
        builder.addCase(shareAlbum.fulfilled, (state, action) => {
            const album = state.albums.find(
                album => album._id === action.payload.albumId
            );
            if (album) {
                album.sharedUsers = action.payload.sharedUsers;
            }
        });

        //fetch user
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });

        //fetch album shared with me
        builder.addCase(fetchSharedWithMeAlbums.fulfilled, (state, action) => {
            state.sharedWithMeAlbums = action.payload;
        });
    },
});

export default albumSlice.reducer;