import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api"; // Import axios instance

export const fetchDashboardData = createAsyncThunk(
    "dashboard/fetchDashboardData",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token"); // Lấy token từ localStorage
            const response = await api.get("/api/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`, // Truyền Bearer Token
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Có lỗi xảy ra khi gọi API"
            );
        }
    }
);

const dashboardReducer = createSlice({
    name: "dashboard",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default dashboardReducer.reducer;
