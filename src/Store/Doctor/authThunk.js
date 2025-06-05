import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APP_URL = import.meta.env.VITE_BACKEND_URL
// Register Doctor
export const registerDoctor = createAsyncThunk(
  "auth/registerDoctor",
  async (formData, thunkAPI) => {
    const adminToken = localStorage.getItem("currentUser");
    try {
      const response = await axios.post(
        `${APP_URL}/doctor/register`,
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
      const response =await axios.post(`${APP_URL}/doctor/login`,formData);
      return response.data
    }catch(err){
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
})

  //delete Consultant
  export const deleteconsultantById =createAsyncThunk("auth/deleteconsultantById",async(id,{thunkAPI})=>{
    try{
      const user=JSON.parse(localStorage.getItem("currentUser"));
      const token =user?.token;     
      const response =await axios.delete(`${APP_URL}/admin/deleteconsultant/${id}`,{
        headers:{
          Authorization:token
        }
      });
      return id;
     }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'deletation failed');

     }
  })