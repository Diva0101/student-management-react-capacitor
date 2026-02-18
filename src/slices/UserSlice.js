import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users.push({ ...action.payload, id: Date.now() });
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
