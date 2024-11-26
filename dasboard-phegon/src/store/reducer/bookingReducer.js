import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getAllBooking = createAsyncThunk(
    "vendor/getAllBooking",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get("vendor/bookings/all", {
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

export const getBookingDetail = createAsyncThunk(
    "vendor/getBookingDetail",
    async (bookingId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get(`vendor/bookings/${bookingId}`, {
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

export const hotelReducer = createSlice({
    name: "booking",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        bookings: [],
        booking: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBooking.fulfilled, (state, { payload }) => {
                state.bookings = payload.bookingList;
            })
            .addCase(getBookingDetail.fulfilled, (state, { payload }) => {
                state.booking = payload.booking;
            });
        // .addCase(addHotel.pending, (state) => {
        //     state.loader = true;
        // })
        // .addCase(addHotel.rejected, (state, payload) => {
        //     state.loader = false;
        //     state.errorMessage = payload.message;
        // })
        // .addCase(addHotel.fulfilled, (state, { payload }) => {
        //     state.loader = false;
        //     state.successMessage = payload.message;
        // })

        // .addCase(fetchHotelById.fulfilled, (state, { payload }) => {
        //     state.hotel = payload.hotel;
        // })

        // .addCase(fetchUpdateHotel.pending, (state) => {
        //     state.loader = true;
        // })
        // .addCase(fetchUpdateHotel.rejected, (state, payload) => {
        //     state.loader = false;
        //     state.errorMessage = payload.message;
        // })
        // .addCase(fetchUpdateHotel.fulfilled, (state, { payload }) => {
        //     state.loader = false;
        //     state.successMessage = payload.message;
        // })
        // .addCase(deleteHotel.fulfilled, (state, { payload }) => {
        //     state.successMessage = payload.message;
        // });
    },
});

export const { messageClear } = hotelReducer.actions;
export default hotelReducer.reducer;
