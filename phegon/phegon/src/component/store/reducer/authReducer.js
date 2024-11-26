import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../service/ApiService";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk(
    "auth/login",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/auth/login", info);
            localStorage.setItem("token", data.token);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post("/auth/register", info);
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
                "/users/get-logged-in-profile-info",
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
                `/users/update/${userId}`,
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
    async (tokenId , { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await api.post(`/auth/google?token=${tokenId}`);
            localStorage.setItem("token", response.data.token);
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const returnUsername = (token) => {
    if (token) {
        const decodeToken = jwtDecode(token);
        return decodeToken.username;
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
        username: returnUsername(localStorage.getItem("token")),
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
            state.username = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loader = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loader = false;
                state.errorMessage = action.payload || "Đăng ký thất bại!";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loader = false;
                state.user = action.payload.user;
                state.successMessage = "Đăng ký thành công!";
            })
            .addCase(login.pending, (state) => {
                state.loader = true;
            })
            .addCase(login.rejected, (state, payload) => {
                state.loader = false;
                state.errorMessage = "Login Fail";
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                const username = returnUsername(payload.token);
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.userInfo = payload.user;
                state.username = username;
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
                state.successMessage = payload.message;
            })

            .addCase(googleLogin.pending, (state) => {
                state.loader = true;
                state.errorMessage = "lỗi";
            })
            .addCase(googleLogin.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.userInfo = payload.user;
                state.role = payload.role;
            })
            .addCase(googleLogin.rejected, (state, { payload }) => {
                state.loader = false;
                state.errorMessage = payload;
            });
    },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
