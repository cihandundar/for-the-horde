
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/productSlice'
import blogReducer from './features/blogSlice'
import brandReducer from './features/brandSlice'
import customProductReducer from './features/customProductSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      blogs: blogReducer,
      brands: brandReducer,
      customproducts: customProductReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
