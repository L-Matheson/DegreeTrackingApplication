import { configureStore } from '@reduxjs/toolkit'
import courseReducer from '../slices/courseSlice'

export default configureStore({
  reducer: {
    course: courseReducer,
    COSCourses: courseReducer
  },
})