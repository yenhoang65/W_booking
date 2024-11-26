import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../service/ApiService";

export const submitContactRequest = createAsyncThunk(
    "contact/submit",
    async (contactData) => {
        const response = await api.post("/users/contact", contactData);
        return response.data;
    }
);

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        loading: false,
        success: null,
        error: null,
    },
    reducers: {
        clearContactState: (state) => {
            state.success = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(submitContactRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload;
            })
            .addCase(submitContactRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearContactState } = contactSlice.actions;

export default contactSlice.reducer;
