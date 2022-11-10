import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './reducers/AuthSlice';

export default configureStore({
  reducer: {
    auth:AuthSlice
  }
})
