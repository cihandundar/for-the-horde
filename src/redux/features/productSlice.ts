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
    loading: boolean
    error: string | null
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
}


export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<{ products: Product[] }>(
                'https://mern-ecommerce-backend-ten.vercel.app/api/products'
            )
            return response.data.products
        } catch (err) {
            const error = err as AxiosError
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

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
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default productSlice.reducer