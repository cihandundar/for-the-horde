import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


interface Blog {
    _id: string
    id: string
    title: string
    content: string
    author: string
    createdAt: Date
    imageUrl: string
    tags: string[]
}

interface BlogState {
    blogs: Blog[]
    loading: boolean
    error: string | null
}

const initialState: BlogState = {
    blogs: [],
    loading: false,
    error: null
}


export const fetchBlogs = createAsyncThunk<Blog[], void, { rejectValue: string }>(
    'api/blogs/fetchBlogs',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<{ blogs: Blog[] }>('/api/blogs');
            return response.data.blogs;
        } catch (err) {
            const error = err as AxiosError;
            return thunkAPI.rejectWithValue(error.message || 'Bir hata oluştu');
        }
    }
);
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
                state.loading = false
                state.blogs = action.payload
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
});

export default blogSlice.reducer;
