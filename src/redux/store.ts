// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/productSlice'
import blogReducer from './features/blogSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
      blogs: blogReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
