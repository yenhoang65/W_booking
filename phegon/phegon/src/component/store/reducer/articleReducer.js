import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../service/ApiService"; // Import axios instance

// Async action để fetch articles
export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async () => {
        const response = await api.get("/admin/articles");
        return response.data; // API trả về danh sách articles
    }
);

// Tạo slice cho articles
const articleReducer = createSlice({
    name: "articles",
    initialState: {
        articles: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                console.log("Fetching articles... Pending");
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Articles fetched successfully:", action.payload);
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log("Error fetching articles:", action.error.message);
            });
    },
});

export default articleReducer.reducer;
