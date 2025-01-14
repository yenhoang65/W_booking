import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/ApiService";

export const getRoomAll = createAsyncThunk(
    "users/rooms/getRoomAll",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            // const token = localStorage.getItem("token");
            const { data } = await api.get("/users/rooms/all");

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getRoomTop5 = createAsyncThunk(
    "users/rooms/top5-most-booked",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            // const token = localStorage.getItem("token");
            const { data } = await api.get("/users/rooms/top5-most-booked");

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getRoomById = createAsyncThunk(
    "users/rooms/getRoomById",
    async (roomId, { rejectWithValue, fulfillWithValue }) => {
        try {
            // const token = localStorage.getItem("token");
            const { data } = await api.get(`/users/rooms/room-by-id/${roomId}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const roomReducer = createSlice({
    name: "room",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        rooms: [],
        topRooms: [],
        room: "",
        selectedRoomId: null, // Lưu roomId của phòng được chọn
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        setSelectedRoomId: (state, action) => {
            state.selectedRoomId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoomAll.fulfilled, (state, { payload }) => {
                state.rooms = payload.roomList;
            })
            .addCase(getRoomById.fulfilled, (state, { payload }) => {
                state.room = payload.room;
            })
            .addCase(getRoomTop5.fulfilled, (state, { payload }) => {
                state.topRooms = payload.roomList; // Lưu top 5 phòng
            });
    },
});

export const { messageClear, setSelectedRoomId } = roomReducer.actions;
export default roomReducer.reducer;
