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
export  const LoginDoctor = createAsyncThunk("auth/LoginDoctor",async(formData,{rejectWithValue})=>{
    try{
      const response =await axios.post("http://localhost:8000/doctor/login",formData);
      return response.data
    }catch(err){
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
})

  //delete Consultant
  export const deleteconsultantById =createAsyncThunk("auth/deleteconsultantById",async(id,{rejectWithValue})=>{
    try{
      const user=JSON.parse(localStorage.getItem("currentUser"));
      const token =user?.token;     
      const response =await axios.delete(`http://localhost:8000/admin/deleteconsultant/${id}`,{
        headers:{
          Authorization:token
        }
      });
      return id;
     }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'deletation failed');

     }
  })