import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

interface Product {
    _id: string
    id: string
    title: string
    name: string
    wasPriceRange: number
    isPriceRange: number
    description: string
    coverImage: string
    images: string[]
    inStock: boolean
    slug: string
    rating: number
    ratingCount: number
}

interface ProductState {
    products: Product[]
    currentProduct: Product | null
    loading: boolean
    error: string | null
    totalPages: number
}

const initialState: ProductState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    totalPages: 1,
}


export const fetchProducts = createAsyncThunk<
    { products: Product[]; totalPages: number },
    number,
    { rejectValue: string }
>('products/fetchProducts', async (page = 1, thunkAPI) => {
    try {
        const response = await axios.get<{ products: Product[]; totalPages: number }>(
            `https://mern-ecommerce-backend-ten.vercel.app/api/products?page=${page}&limit=8`
        )
        return response.data
    } catch (err) {
        const error = err as AxiosError
        return thunkAPI.rejectWithValue(error.message)
    }
})


export const fetchProductBySlug = createAsyncThunk<
    Product | undefined,
    string,
    { rejectValue: string }
>(
    'products/fetchProductBySlug',
    async (slug, thunkAPI) => {
        try {
            const response = await axios.get<Product[]>(
                `https://mern-ecommerce-backend-ten.vercel.app/api/products/${slug}`
            );
            return response.data[0];
        } catch (err) {
            const error = err as AxiosError;
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ products: Product[]; totalPages: number }>) => {
                state.loading = false
                state.products = action.payload.products
                state.totalPages = action.payload.totalPages
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(fetchProductBySlug.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductBySlug.fulfilled, (state, action: PayloadAction<Product | undefined>) => {
                state.loading = false
                state.currentProduct = action.payload || null
            })
            .addCase(fetchProductBySlug.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

    },
})

export default productSlice.reducer