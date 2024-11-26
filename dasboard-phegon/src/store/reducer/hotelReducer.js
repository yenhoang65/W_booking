import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getHotelAll = createAsyncThunk(
    "hotel/getHotelAll",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get("/vendor/hotel/all", {
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

export const addHotel = createAsyncThunk(
    "hotel/addHotel",
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.post("/vendor/hotel/add", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchHotelById = createAsyncThunk(
    "hotel/fetchHotelById",
    async (hotelId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get(
                `/vendor/hotel/hotel-by-id/${hotelId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUpdateHotel = createAsyncThunk(
    "hotel/fetchUpdateHotel",
    async ({ hotelId, formData }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.put(
                `/vendor/hotel/update/${hotelId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteHotel = createAsyncThunk(
    "hotel/deleteHotel",
    async (hotelId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.delete(
                `/vendor/hotel/delete/${hotelId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

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
        builder
            .addCase(getHotelAll.fulfilled, (state, { payload }) => {
                state.hotels = payload.hotelList;
            })
            .addCase(addHotel.pending, (state) => {
                state.loader = true;
            })
            .addCase(addHotel.rejected, (state, payload) => {
                state.loader = false;
                state.errorMessage = payload.message;
            })
            .addCase(addHotel.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })

            .addCase(fetchHotelById.fulfilled, (state, { payload }) => {
                state.hotel = payload.hotel;
            })

            .addCase(fetchUpdateHotel.pending, (state) => {
                state.loader = true;
            })
            .addCase(fetchUpdateHotel.rejected, (state, payload) => {
                state.loader = false;
                state.errorMessage = payload.message;
            })
            .addCase(fetchUpdateHotel.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(deleteHotel.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            });
    },
});

export const { messageClear } = hotelReducer.actions;
export default hotelReducer.reducer;
