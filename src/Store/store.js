import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from "./Registration/RegistrationSlice";
import loginSlice from './Doctor/authSlice'

const store = configureStore({
  reducer: {
   
    user : RegistrationSlice,
    auth : loginSlice
  },  
});

export default store;