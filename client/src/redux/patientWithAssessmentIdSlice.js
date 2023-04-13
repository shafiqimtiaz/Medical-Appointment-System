import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  myArray: [],
};

export const patientWithAssessmentIdSlice = createSlice({
  name: "getAssessmentId",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.myArray = [...state.myArray, action.payload];
      console.log("on adding an item");
      console.log(state.myArray);
    },
    removeItem: (state, action) => {
      state.myArray = current(state.myArray).filter((item) => {
        return item.patientId !== action.payload.id;
      });
    },
    resetItems: (state) => {
      state.myArray = [];
    },
  },
});

export const { addItem, removeItem, resetItems } =
  patientWithAssessmentIdSlice.actions;
export const currentPatientsWithAssessment = (state) =>
  state.getAssessmentId.myArray;

export default patientWithAssessmentIdSlice.reducer;
