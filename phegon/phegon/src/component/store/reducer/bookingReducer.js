import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/ApiService";

export const booking_room = createAsyncThunk(
    "booking/booking_room",
    async (
        { roomId, userId, hotelId, bookingRequest },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            // const token = localStorage.getItem("token");
            const { data } = await api.post(
                `/users/bookings/book-room/${roomId}/${userId}/${hotelId}`,
                bookingRequest,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const bookingReducer = createSlice({
    name: "booking",
    initialState: {
        booking: null,
        loading: false,
        errorMessage: null,
        successMessage: false,
    },
    reducers: {
        resetBookingState: (state) => {
            state.successMessage = false;
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(booking_room.pending, (state) => {
                state.loading = true;
            })
            .addCase(booking_room.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(booking_room.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload.message;
            });
    },
});

export const payment = createAsyncThunk(
    "payment/payment-vnpay",
    async (formData , { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await api.post(`/payment/payment-vnpay`,formData);
            console.log(response.data);
            localStorage.setItem("urlPayment", response.data);
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const { resetBookingState } = bookingReducer.actions;
export default bookingReducer.reducer;
