import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const  registerUser =createAsyncThunk("auth/registerUser",async(formData,thunkAPI)=>{
    try {
        const response = await axios.post('http://localhost:8000/admin/register', formData);
        return response.data;
      } catch (err) {
       
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
      }

}) 
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credential ,{rejectWithValue})=>{
    try{
      const response =await axios.post("http://localhost:8000/admin/login",credential);
      return response.data;
    }catch(err){
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    } 
  }
    )
   export  const getConsltantData = createAsyncThunk("auth/getConsltantData",async (id,thunkAPI)=>{
      try{
        const response =await axios.get("http://localhost:8000/admin/getallconsultant");
        return response.data;
      }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
      }
    })