import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from "./Registration/RegistrationSlice";


const store = configureStore({
  reducer: {
   
    auth : RegistrationSlice,
  },
});

export default store;