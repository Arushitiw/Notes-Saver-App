import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './reduc/PasteSlice'
export default configureStore({
  reducer: {
    paste: pasteReducer
  }
})