import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../service/ApiService";

export const sendEmail = createAsyncThunk(
    "email/sendEmail",
    async (emailData, { rejectWithValue }) => {
        try {
            const response = await api.post("/user/send-email", emailData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const emailSlice = createSlice({
    name: "email",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendEmail.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(sendEmail.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || "Lỗi không xác định";
            });
    },
});

export default emailSlice.reducer;
