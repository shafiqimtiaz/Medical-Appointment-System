import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    myArray: [],
};


export const counserlorSlice = createSlice({
    name: "counserlor",
    initialState,
    reducers: { 

        addToArray: (state, action) => {
            state.myArray = [...state.myArray, action.payload];
          },
        removeFromArray: (state, action) => {
            state.myArray = current(state.myArray).filter((item) => {
                return item.id !== action.payload.id;
            })
        },
        resetArray: (state) => {
            state.myArray = [];
        },
     }
})

export const { addToArray, removeFromArray, resetArray } = counserlorSlice.actions;
export const getCurrentPatients = (state) => state.counserlor.myArray;

export default counserlorSlice.reducer;