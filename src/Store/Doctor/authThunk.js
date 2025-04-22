import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerDoctor = createAsyncThunk("auth/registerDoctor",async(formData, thunkAPI) => {
    try{
        const response = await axios.post('http://localhost:8000/doctor/register', formData);
        return response.data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');

    }
})