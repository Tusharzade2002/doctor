import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register Doctor
export const registerDoctor = createAsyncThunk(
  "auth/registerDoctor",
  async (formData, thunkAPI) => {
    const adminToken = localStorage.getItem("currentUser");
    try {
      const response = await axios.post(
        "http://localhost:8000/doctor/register",
        formData,
        {
            headers:{
                Authorization: `Bearer ${adminToken}`,
            }
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Login Doctor
export  const LoginDoctor = createAsyncThunk("auth/LoginDoctor",async(formData,thunkAPI)=>{
    try{
      const response =await axios.post("http://localhost:8000/doctor/login",formData);
      return response.data
    }catch(err){
      err.response?.data?.message || "Login Failed"
    }
})