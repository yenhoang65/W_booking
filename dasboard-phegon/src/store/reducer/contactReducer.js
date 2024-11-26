import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getAllContactRequests = createAsyncThunk(
    "admin/getAllContactRequests",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get("/users/requests", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const contactReducer = createSlice({
    name: "contactRequests",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        contactRequests: [],
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllContactRequests.pending, (state) => {
                state.loader = true;
            })
            .addCase(getAllContactRequests.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.contactRequests = payload; // Gán dữ liệu yêu cầu liên hệ
            })
            .addCase(getAllContactRequests.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.message; // Gán thông báo lỗi
            });
    },
});

export const { messageClear } = contactReducer.actions;
export default contactReducer.reducer;
