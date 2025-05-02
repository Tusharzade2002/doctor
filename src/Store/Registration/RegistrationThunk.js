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

    const user = JSON.parse(localStorage.getItem('currentUser'));  
        const token = user?.token;

        

//Get Consultant Data
   export  const getConsltantData = createAsyncThunk("auth/getConsltantData",async (_,{rejectWithValue})=>{
      try{
        // const user = JSON.parse(localStorage.getItem('currentUser'));  
        // const token = user?.token;

      console.log("token for getdata:",token);
      
        const response = await axios.get("http://localhost:8000/admin/getallconsultant", {
          headers: {
            Authorization : token
          }
        });
        return response.data.data;
      }catch(err){
        return rejectWithValue(err.response?.data?.message || 'Failed to get data');
      }
    })


//Get All Patients
    export const getallPatient = createAsyncThunk("auth/getallPatient",async(_,{rejectWithValue})=>{
      try{
        // const user =JSON.parse(localStorage.getItem('currentUser'));
        // const token =user?.token;
        
        const response =await axios.get("http://localhost:8000/admin/allreceptionist",{
                    headers:{
                      Authorization:token
                    }
        });
        console.log(response.data.data);
        
        return response.data.data
      }catch(err){
               return rejectWithValue(err.response?.data?.message || "Failed to get data")
      }
    })

    //GetAll Receptionlist
    export const getallreception=createAsyncThunk("auth/getallreception",async(_,{rejectWithValue})=>{
      try{
        const response =await axios.get("localhost:8000/admin/allreceptionist",{
               headers:{
                Authorization:token
               }
        })
      }catch(err){
        return rejectWithValue(err.response?.data?.message || "Failed to get data")
      }
    })