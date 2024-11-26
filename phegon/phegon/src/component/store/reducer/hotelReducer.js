import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/ApiService";

export const getHotelsAll = createAsyncThunk(
    "users/hotel/all",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            // const token = localStorage.getItem("token");
            const { data } = await api.get("/users/hotel/all");

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const hotelReducer = createSlice({
    name: "hotel",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        hotels: [],
        hotel: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getHotelsAll.fulfilled, (state, { payload }) => {
            state.hotels = payload.hotelList;
        });
        // .addCase(addRoom.pending, (state) => {
        //     state.loader = true;
        // })
        // .addCase(addRoom.rejected, (state, payload) => {
        //     state.loader = false;
        //     state.errorMessage = payload.message;
        // })
        // .addCase(addRoom.fulfilled, (state, { payload }) => {
        //     state.loader = false;
        //     state.successMessage = payload.message;
        // })

        // .addCase(roomById.fulfilled, (state, { payload }) => {
        //     state.room = payload.room;
        // })

        // .addCase(updateRoom.pending, (state) => {
        //     state.loader = true;
        // })
        // .addCase(updateRoom.rejected, (state, payload) => {
        //     state.loader = false;
        //     state.errorMessage = payload.message;
        // })
        // .addCase(updateRoom.fulfilled, (state, { payload }) => {
        //     state.loader = false;
        //     state.successMessage = payload.message;
        // })
        // .addCase(deleteRoom.fulfilled, (state, { payload }) => {
        //     state.successMessage = payload.message;
        // });
    },
});

export const { messageClear } = hotelReducer.actions;
export default hotelReducer.reducer;
