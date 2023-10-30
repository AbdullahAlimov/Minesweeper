import { configureStore } from "@reduxjs/toolkit";
import { reducer as matrixContent } from "./slice/matrixContent.slice";

const store = configureStore({
  reducer: {
    matrixContent,
  },
});

export default store;