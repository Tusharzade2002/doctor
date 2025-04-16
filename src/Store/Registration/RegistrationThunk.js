import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const  getLoginData =createAsyncThunk("login/fetch",async()=>{
    try{
        const response =await axios.post(`${process.env.BACKEND_URL}/admin/register`)
        console.log("response:",response.data);  
    }   
    catch(e){
        throw new Error(e.response || "errorrr");
    }
    
}) 