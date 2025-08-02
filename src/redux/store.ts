
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/productSlice'
import blogReducer from './features/blogSlice'
import brandReducer from './features/brandSlice'
import customProductReducer from './features/customProductSlice'
import cartReducer from './features/cardSlice'
import favoriteReducer from './features/favoriteSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      blogs: blogReducer,
      brands: brandReducer,
      customproducts: customProductReducer,
      cart: cartReducer,
      favorites: favoriteReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
