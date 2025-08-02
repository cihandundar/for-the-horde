import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    coverImage?: string; // API ürünleri için
    description?: string;
    slug?: string;
    source?: "api" | "mongo"; // Ürün kaynağını belirtmek için
}

interface FavoriteState {
    favorites: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: FavoriteState = {
    favorites: [],
    loading: false,
    error: null,
};

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.favorites.find(product => product.id === action.payload.id);
            if (!existingProduct) {
                state.favorites.push(action.payload);
                toast.success(`${action.payload.name} added to favorites`);
            } else {
                toast.info(`${action.payload.name} is already in favorites`);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            const removed = state.favorites.find(product => product.id === action.payload);
            state.favorites = state.favorites.filter(product => product.id !== action.payload);
            if (removed) {
                toast.error(`${removed.name} removed from favorites`);
            }
        },
        toggleFavorite: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.favorites.find(product => product.id === action.payload.id);
            if (existingProduct) {
                state.favorites = state.favorites.filter(product => product.id !== action.payload.id);
                toast.error(`${action.payload.name} removed from favorites`);
            } else {
                state.favorites.push(action.payload);
                toast.success(`${action.payload.name} added to favorites`);
            }
        },
        clearFavorites: (state) => {
            state.favorites = [];
            toast.info("All favorites have been cleared");
        },
        setFavorites: (state, action: PayloadAction<Product[]>) => {
            state.favorites = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    setFavorites,
    setLoading,
    setError,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
