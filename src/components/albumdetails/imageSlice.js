import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://pixora-backend-smoky.vercel.app/albums";
const BASE_URL_2 = "https://pixora-backend-smoky.vercel.app";

const getHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

//fetch all images
export const fetchAllImages = createAsyncThunk("images/fetchAllImages",
    async (albumId) => {
        const response = await axios.get(
            `${BASE_URL}/${albumId}/images`,
            {
                headers: getHeader()
            }
        );

        return response.data;
    }
);

//upload images
export const uploadImage = createAsyncThunk("images/uploadImages",
    async ({ albumId, formData }) => {
        const response = await axios.post(
            `${BASE_URL}/${albumId}/images`,
            formData,
            {
                headers: {
                    ...getHeader(),
                    "Content-Type": "multipart/form-data",
                }
            }
        )

        return response.data.image;
    }
);

//delete image
export const deleteImage = createAsyncThunk("images/deleteImage",

    async ({ albumId, imageId }) => {

        await axios.delete(

            `${BASE_URL}/${albumId}/images/${imageId}`,
            {
                headers: getHeader()
            }
        );

        return imageId;
    }
);

//fetch image by id
export const fetchImageById = createAsyncThunk("images/fetchImageById",
    async ({ albumId, imageId }) => {
        const response = await axios.get(
            `${BASE_URL}/${albumId}/images/${imageId}`,
            {
                headers: getHeader()
            }
        );

        console.log("API Response:", response.data);

        return response.data;
    }
);

//update image by id
export const updateImageById = createAsyncThunk("images/updateImageById",
    async ({ albumId, imageId, updatedData }) => {
        const response = await axios.post(
            `${BASE_URL}/${albumId}/images/${imageId}`,
            updatedData,
            {
                headers: getHeader()
            }
        );

        return response.data;
    }
);

//fetching all photos without album dependency
export const fetchAllMyPhotos = createAsyncThunk("images/fetchAllMyPhotos",
    async () => {
        const response = await axios.get(
            `${BASE_URL_2}/images`,
            {
                headers: getHeader()
            }
        );

        return response.data;
    }
);

//add comment
export const addComment = createAsyncThunk("images/addComment",
    async ({ albumId, imageId, comment }) => {
        const response = await axios.post(
            `${BASE_URL}/${albumId}/images/${imageId}/comments`,
            { comment },
            {
                headers: getHeader(),
            }
        );

        return response.data.image;
    }
);

//delete comment
export const deleteComment = createAsyncThunk("images/deleteComment",
    async ({ albumId, imageId, commentId }) => {
        const response = await axios.delete(
            `${BASE_URL}/${albumId}/images/${imageId}/comments/${commentId}`,
            {
                headers: getHeader(),
            }
        );

        return response.data;
    }
);

//fetch favourite images
export const fetchFavouriteImages = createAsyncThunk("images/fetchFavouriteImages",
    async () => {
        const response = await axios.get(
            `${BASE_URL_2}/images/favourites`,
            {
                headers: getHeader()
            }
        );

        return response.data;
    }
);

/* --------------------------------- IMAGE SLICE --------------------------------------------- */

export const imageSlice = createSlice({
    name: "images",

    initialState: {
        images: [],
        selectedImage: null,
        status: "idle",
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(fetchAllImages.fulfilled, (state, action) => {
            state.status = "success";
            state.images = action.payload;
        });

        builder.addCase(uploadImage.fulfilled, (state, action) => {
            state.images.push(action.payload);
        });

        builder.addCase(deleteImage.fulfilled, (state, action) => {
            state.images = state.images.filter(
                image => image._id !== action.payload
            );
        });

        builder.addCase(fetchImageById.fulfilled, (state, action) => {
            state.selectedImage = action.payload;
        });

        builder.addCase(updateImageById.fulfilled, (state, action) => {
            state.selectedImage = action.payload;
            const index = state.images.findIndex(img => img._id === action.payload._id);
            if (index !== -1) {
                state.images[index] = action.payload;
            };
        });

        //for comments
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.selectedImage = action.payload;
        });

        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.selectedImage = action.payload;
        });

        //for fetching all photos
        builder.addCase(fetchAllMyPhotos.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(fetchAllMyPhotos.fulfilled, (state, action) => {
            state.status = "success";
            state.images = action.payload;
        });

        builder.addCase(fetchAllMyPhotos.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });

        //for fetching favourite photos
        builder.addCase(fetchFavouriteImages.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(fetchFavouriteImages.fulfilled, (state, action) => {
            state.status = "success";
            state.images = action.payload;
        });

        builder.addCase(fetchFavouriteImages.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });
    }
});