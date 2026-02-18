import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [
    { id: '1', name: 'Alex Chen', email: 'alex@example.com', age: 20, course: 'Computer Science', grade: 'A' },
    { id: '2', name: 'Sam Wilson', email: 'sam@example.com', age: 22, course: 'Mathematics', grade: 'B+' },
  ],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push({
        ...action.payload,
        id: String(Date.now()),
      });
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
    updateStudent: (state, action) => {
      const idx = state.students.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) state.students[idx] = { ...state.students[idx], ...action.payload };
    },
  },
});

export const { addStudent, removeStudent, updateStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
