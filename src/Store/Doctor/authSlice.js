import { createSlice } from "@reduxjs/toolkit";
import { registerDoctor ,LoginDoctor} from "./authThunk";


const initialState = {
    data:null,
    loading: false,
    error: null,
}
 
 const DoctorSlice=createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
          state.user = action.payload;  
        },
      },
        extraReducers:(builder)=>{
            builder.addCase(registerDoctor.pending,(state)=>{
                state.status="loading"
            })
            .addCase(registerDoctor.fulfilled,(state,action)=>{
                state.status ="succeeded",
                state.data=action.payload;
            })
            .addCase(registerDoctor.rejected,(state,action)=>{
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
            .addCase(LoginDoctor.rejected, (state, action) => {  
                state.status = 'failed';
                state.error = action.error.message;
              })
        }
    })
    export const {setFilter}=DoctorSlice.actions;
    export default DoctorSlice.reducer;