// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
  newRequests: [],
  ongoingRequests:[]
};

const requestDataSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    
    
    setNewRequests: (state, action) => {
      state.newRequests = action.payload;
    },
    setOngoingRequests: (state, action) => {
        state.ongoingRequests = action.payload;
      },
  
  },
});

export const { setNewRequests,setOngoingRequests} = requestDataSlice.actions;
export default requestDataSlice.reducer;
