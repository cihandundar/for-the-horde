// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './features/productSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productReducer,
    },
  })
}

// Redux store tipi
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
