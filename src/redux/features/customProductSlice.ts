import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

interface CustomProduct {
    _id: string
    id: string
    name: string
    category: string
    categoryId: string
    sku: string
    price: string
    currency: string
    stock: number
    description: string
    features: string[]
    images: string[]
    ratings: string[]
    createdAt: string
}

interface CustomProductState {
    customproducts: CustomProduct[]
    selectedProduct: CustomProduct | null
    loading: boolean
    error: string | null
}

const initialState: CustomProductState = {
    customproducts: [],
    selectedProduct: null,
    loading: false,
    error: null
}



export const fetchCustomProducts = createAsyncThunk<CustomProduct[], void, { rejectValue: string }>(
    'api/products/fetchCustomProducts',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<{ customproducts: CustomProduct[] }>('/api/products');
            return response.data.customproducts;
        } catch (err) {
            const error = err as AxiosError;
            return thunkAPI.rejectWithValue(error.message || 'Bir hata oluştu');
        }
    }
);

export const fetchCustomProductById = createAsyncThunk<
    CustomProduct,
    string,
    { rejectValue: string }
>(
    'api/products/fetchCustomProductById',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get<{ product: CustomProduct }>(`/api/products/${id}`);
            return response.data.product;
        } catch (err) {
            const error = err as AxiosError;
            return thunkAPI.rejectWithValue(error.message || 'Bir hata oluştu');
        }
    }
);


const customProductSlice = createSlice({
    name: 'customproducts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCustomProducts.fulfilled, (state, action: PayloadAction<CustomProduct[]>) => {
                state.loading = false
                state.customproducts = action.payload
            })
            .addCase(fetchCustomProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(fetchCustomProductById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCustomProductById.fulfilled, (state, action: PayloadAction<CustomProduct>) => {
                state.loading = false
                state.selectedProduct = action.payload
            })
            .addCase(fetchCustomProductById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

    },
});

export default customProductSlice.reducer;