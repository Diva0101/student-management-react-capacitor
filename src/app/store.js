import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/UserSlice';
import studentsReducer from '../slices/studentsSlice';

export default configureStore({
  reducer: {
    userInfo: userReducer,
    students: studentsReducer,
  },
});