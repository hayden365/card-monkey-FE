import { createSlice } from "@reduxjs/toolkit";
import setTokenApi from "../api/monkeySetToken";

export interface SignUpState {
  userId: string;
  password: string;
  name: string;
  benefit: Array<string>;
}

const initialState: SignUpState = {
  userId: "",
  password: "",
  name: "",
  benefit: [],
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    fillName(state, action) {
      let content = action.payload;
      state.name = content;
    },
    fillId(state, action) {
      let content = action.payload;
      state.userId = content;
    },
    fillPassword(state, action) {
      let content = action.payload;
      state.password = content;
    },
    selectBenefit(state, action) {
      let content = action.payload;
      state.benefit = content;
    },
    submitForm(state) {
      if (state.userId && state.password && state.name && state.benefit) {
        const res = setTokenApi.signUp(state);
        console.log("res", res);
      } else {
        console.log("회원가입을 처음부터 진행해 주세요!");
      }
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fillName,
  fillId,
  fillPassword,
  selectBenefit,
  submitForm,
  resetForm,
} = signUpSlice.actions;

export default signUpSlice.reducer;
