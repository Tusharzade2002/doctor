import { createSlice } from "@reduxjs/toolkit";
import { registerUser , loginUser ,getConsltantData} from "./RegistrationThunk";
 
const initialState = {
    user: null,
    loading: false,
    error: null,
  };

const RegistrationSlice=createSlice({
    name:"registration",
    initialState,
    reducers: {
        logout: (state) => {
          state.user = null;
          state.error = null;
         
          localStorage.removeItem("users");
        }
        },
        extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.status="loading"
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.status ="succeeded",
            state.user=action.payload;
        })
        .addCase(registerUser.rejected,(state)=>{
            state.status="failed",
            state.error=action.error.message;
        })

        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload; 
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

          .addCase(getConsltantData.pending,(state)=>{
            state.status="loading"
          })
          .addCase(getConsltantData.fulfilled,(state,action)=>{
            state.status ="succeeded",
            state.user=action.payload;
          })
          .addCase(getConsltantData.rejected,(state)=>{
            state.status="failed",
            state.error=action.error.message;
          })
    }
})
export const {setFilter}=RegistrationSlice.actions;
export default RegistrationSlice.reducer;