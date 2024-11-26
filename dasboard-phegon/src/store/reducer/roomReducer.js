import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getRoomAll = createAsyncThunk(
    "room/getRoomAll",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get("/vendor/rooms/all", {
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

export const addRoom = createAsyncThunk(
    "room/addRoom",
    async (formData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.post("/vendor/rooms/add", formData, {
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

export const roomById = createAsyncThunk(
    "room/roomById",
    async (roomId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get(
                `/vendor/rooms/room-by-id/${roomId}`,
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

export const updateRoom = createAsyncThunk(
    "room/updateRoom",
    async ({ roomId, formData }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.put(
                `/vendor/rooms/update/${roomId}`,
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

export const deleteRoom = createAsyncThunk(
    "room/deleteRoom",
    async (roomId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.delete(
                `/vendor/rooms/delete/${roomId}`,
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

export const roomReducer = createSlice({
    name: "room",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        rooms: [],
        room: "",
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoomAll.fulfilled, (state, { payload }) => {
                state.rooms = payload.roomList;
            })
            .addCase(addRoom.pending, (state) => {
                state.loader = true;
            })
            .addCase(addRoom.rejected, (state, payload) => {
                state.loader = false;
                state.errorMessage = payload.message;
            })
            .addCase(addRoom.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })

            .addCase(roomById.fulfilled, (state, { payload }) => {
                state.room = payload.room;
            })

            .addCase(updateRoom.pending, (state) => {
                state.loader = true;
            })
            .addCase(updateRoom.rejected, (state, payload) => {
                state.loader = false;
                state.errorMessage = payload.message;
            })
            .addCase(updateRoom.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
            })
            .addCase(deleteRoom.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            });
    },
});

export const { messageClear } = roomReducer.actions;
export default roomReducer.reducer;
