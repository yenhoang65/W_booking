import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk(
    "auth/login",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            // {
            //     withCredentials: true,
            // }
            const { data } = await api.post("/auth/login", info);
            localStorage.setItem("token", data.token);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getMyInfo = createAsyncThunk(
    "auth/getMyInfo",
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await api.get(
                "/admin/get-logged-in-profile-info",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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

export const updateInfo = createAsyncThunk(
    "auth/updateInfo",
    async (
        { userId, formData, token },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.put(
                `/admin/update/${userId}`,
                formData,
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

export const updateInfoVendor = createAsyncThunk(
    "auth/updateInfoVendor",
    async (
        { userId, formData, token },
        { rejectWithValue, fulfillWithValue }
    ) => {
        try {
            const { data } = await api.put(
                `/vendor/update/${userId}`,
                formData,
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

export const googleLogin = createAsyncThunk(
    "auth/google",
    async ({ tokenId }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await api.post("/auth/google", {
                tokenId,
            });
            localStorage.setItem("token", response.data.token);
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const returnRole = (token) => {
    if (token) {
        const decodeToken = jwtDecode(token);
        const expireTime = new Date(decodeToken.exp * 1000);
        if (new Date() > expireTime) {
            localStorage.removeItem("token");
            return "";
        } else {
            return decodeToken.role;
        }
    } else {
        return "";
    }
};

export const authReducer = createSlice({
    name: "auth",
    initialState: {
        successMessage: "",
        errorMessage: "",
        loader: false,
        userInfo: "",
        role: returnRole(localStorage.getItem("token")),
        token: localStorage.getItem("token"),
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
        user_reset: (state) => {
            state.userInfo = "";
            state.token = "";
            state.role = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loader = true;
            })
            .addCase(login.rejected, (state) => {
                state.loader = false;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.userInfo = payload.user;
                state.role = payload.role;
            })
            .addCase(getMyInfo.fulfilled, (state, { payload }) => {
                state.userInfo = payload.user;
            })
            .addCase(updateInfo.pending, (state) => {
                state.loader = true;
            })
            .addCase(updateInfo.rejected, (state) => {
                state.loader = false;
            })
            .addCase(updateInfo.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.statusCode;
            })
            .addCase(updateInfoVendor.pending, (state) => {
                state.loader = true;
            })
            .addCase(updateInfoVendor.rejected, (state) => {
                state.loader = false;
            })
            .addCase(updateInfoVendor.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.statusCode;
            });
    },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
