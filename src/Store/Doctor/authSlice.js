import { createSlice } from "@reduxjs/toolkit";
import { registerDoctor ,LoginDoctor} from "./authThunk";


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

            .addCase(LoginDoctor.pending,(state)=>{
                    state.status="loading"
            })
            .addCase(LoginDoctor.fulfilled,(state,action)=>{
                state.status ="successded",
                state.data=action.payload;
            })
            .addCase(LoginDoctor,rejected,(state)=>{
                state.state="failed",
                state.error = action.payload;
            })
        }
    })
    export const {setFilter}=DoctorSlice.actions;
    export default DoctorSlice.reducer;