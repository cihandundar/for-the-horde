import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


interface Brand {
    _id: string
    name: string
    logoUrl: string
}

interface BrandState {
    brands: Brand[]
    loading: boolean
    error: string | null
}

const initialState: BrandState = {
    brands: [],
    loading: false,
    error: null
}


export const fetchBrand = createAsyncThunk<Brand[], void, { rejectValue: string }>(
    'api/brands/fetchBrand',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<{ brands: Brand[] }>('/api/brands');
            return response.data.brands;
        } catch (err) {
            const error = err as AxiosError;
            return thunkAPI.rejectWithValue(error.message || 'Bir hata oluştu');
        }
    }
);
const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrand.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBrand.fulfilled, (state, action: PayloadAction<Brand[]>) => {
                state.loading = false
                state.brands = action.payload
            })
            .addCase(fetchBrand.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
});

export default brandSlice.reducer;
