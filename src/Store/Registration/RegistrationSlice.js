import { createSlice } from "@reduxjs/toolkit";
import { getLoginData } from "./RegistrationThunk";
import { stackTraceLimit } from "postcss/lib/css-syntax-error";
 
const initialData={
    login:{},
    status:"loading",
    error:null,
    filter:{}
};

const loginSlice=createSlice({
    name:"login",
    initialData,
    reducers:{
        setFilter:(state,action)=>{
                      state.filter ={...state.filter, ...action.payload};
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getLoginData.pending,(state)=>{
            state.status="loading"
        })
        .addCaseCase(getLoginData.fulfilled,(state,action)=>{
            state.status ="succeeded",
            state.login=action.payload;
        })
        .addCase(getLoginData.rejected,(state)=>{
            state.status="failed",
            state.error=action.error.message;
        })
    }
})
export const {setFilter}=productSlice.actions;
export default loginSlice.reducer;