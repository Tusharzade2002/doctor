import { createSlice } from "@reduxjs/toolkit";
import { registerDoctor, loginDoctor } from "./authThunk";


const initialState = {
    data:null,
    loading: false,
    error: null,
}
 
 const DoctorSlice=createSlice({
    name:"docotor",
    initialState,
    reducers: {
        logout: (state) => {
          state.data = null;
          state.error = null;
          localStorage.removeItem("doctor");
        }
        },
        extraReducers:(builder)=>{
            builder.addCase(registerDoctor.pending,(state)=>{
                state.status="loading"
            })
            .addCase(registerDoctor.fulfilled,(state,action)=>{
                state.status ="succeeded",
                state.data=action.payload;
            })
            .addCase(registerDoctor.rejected,(state)=>{
                state.status="failed",
                state.error=action.error.message;
            })
        }
    })