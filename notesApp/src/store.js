import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/PasteSlice'
export default configureStore({
  reducer: {
    pastes: pasteReducer
  },
})