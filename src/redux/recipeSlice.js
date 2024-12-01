import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: [],
  reducers: {
    allrecipes: (state, action) => { 
      return action.payload; 
    },
    
  },
});

export const { allrecipes } = recipeSlice.actions;
export default recipeSlice.reducer; 
