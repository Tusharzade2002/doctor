import { createSlice } from "@reduxjs/toolkit";
import { registerUser , loginUser ,getConsltantData ,getallPatient,getallreception,registerReception ,deleteconsultantById} from "./RegistrationThunk";
 
const initialState = {
    user: null,
    consultant:[],
    Patient:[],
    Reception:[],
    loading: false,
    error: null,
  };

const RegistrationSlice=createSlice({
    name:"user",
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


          //getconsultant Data
          .addCase(getConsltantData.pending,(state)=>{
            state.status="loading"
          })
          .addCase(getConsltantData.fulfilled,(state,action)=>{
            state.status ="succeeded",
            state.consultant=action.payload;
          })
          .addCase(getConsltantData.rejected,(state,action)=>{
            state.status="failed",
            state.error=action.error.message;
          })

          //getallpatients
          .addCase(getallPatient.pending,(state)=>{
            state.status="loading"
          })
          .addCase(getallPatient.fulfilled,(state,action)=>{
            state.status="succeeded",
            state.Patient=action.payload;
          })
          .addCase(getallPatient.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error.message;
          })
//get all Reception
          .addCase(getallreception.pending,(state)=>{
            state.status="loading"
          })
          .addCase(getallreception.fulfilled,(state,action)=>{
            state.status="succeeded",
            state.Reception=action.payload;
          })
          .addCase(getallreception.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error.message;
          })
         
// create Reception
           .addCase(registerReception.pending,(state)=>{
            state.status="loading"
          })
          .addCase(registerReception.fulfilled,(state,action)=>{
            state.status="succeeded",
            state.user=action.payload;
          })
          .addCase(registerReception.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error.message;
          })

  //Delete Consultant
  
  .addCase(deleteconsultantById.fulfilled, (state, action) => {
    state.data = state.data.filter((patient) => patient._id !== action.payload);
  });

    }
})
export const {setFilter}=RegistrationSlice.actions;
export default RegistrationSlice.reducer;