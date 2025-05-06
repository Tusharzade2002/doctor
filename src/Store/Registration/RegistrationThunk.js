import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/register",
        formData
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/login",
        credential
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

//Get Consultant Data
export const getConsltantData = createAsyncThunk(
  "auth/getConsltantData",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      // console.log("token for getdata:",token);

      const response = await axios.get(
        "http://localhost:8000/admin/getallconsultant",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get data"
      );
    }
  }
);

//Get All Patients
export const getallPatient = createAsyncThunk(
  "auth/getallPatient",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      const response = await axios.get(
        "http://localhost:8000/admin/getallpatient",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("thunk data patient:", response.data.data);

      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get data"
      );
    }
  }
);

//GetAll Receptionlist
export const getallreception = createAsyncThunk(
  "auth/getallreception",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      const response = await axios.get(
        "http://localhost:8000/admin/allreceptionist",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response.data.data);

      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get data"
      );
    }
  }
);

//create reception list
export const registerReception = createAsyncThunk(
  "auth/registerReception",
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.post(
        "http://localhost:8000/admin/registerreceptionist",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);

      return response.data, data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

//delete Consultant
export const deleteconsultantById = createAsyncThunk(
  "auth/deleteconsultantById",
  async (id, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.delete(
        `http://localhost:8000/admin/deleteconsultant/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "deletation failed"
      );
    }
  }
);

//get consltant by id cid
export const getConsltantDataById = createAsyncThunk(
  "auth/getConsltantDataById",
  async (cIN, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.get(
        `http://localhost:8000/admin/consutantbyid/${cIN}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response.data.data);

      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "get data by id failed"
      );
    }
  }
);

// //update consltant by id cid
export const updateConsltantDataById = createAsyncThunk(
  "auth/updateConsltantDataById",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.patch(
        `http://localhost:8000/admin/updateconsultant/${id}`,
        updateData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "get data by id failed"
      );
    }
  }
);

//get reception By Id
export const getReceptionById = createAsyncThunk(
  "auth/getReceptionById",
  async (rID, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/receptionistbyid/${rID}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "get data by id failed"
      );
    }
  }
);
// deleete reception bu Id
export const deletereceptionById = createAsyncThunk(
  "auth/deletereceptionById",
  async (_id, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.delete(
        `http://localhost:8000/admin//deletereceptionist/${_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "failed to delete the data"
      );
    }
  }
);

//updatee reception by id
export const updatereceptionBYid = createAsyncThunk(
  "auth/updatereceptionBYid",
  async ({ id, updateData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(
        `http://localhost:8000/admin/updatereceptionist/${id}`,
        updateData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "update data failed "
      );
    }
  }
);

const user = JSON.parse(localStorage.getItem("currentUser"));
const token = user?.token;
// get Alldepartment data
export const getAllDepartment = createAsyncThunk(
  "auth/getAllDepartment",
  async (_, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/alldepartment",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "update data failed "
      );
    }
  }
);

//Register Department data
export const RegisterDepartment = createAsyncThunk(
  "auth/RegisterDepartment",
  async (formdata, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/createdepartment",formdata,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "update data failed "
      );
    }
  }
);

//Delete Department By Id
export const DeleteDepartment = createAsyncThunk("auth/DeleteDepartment",async(id,{rejectWithValue})=>{
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = user?.token;
   try{
         const response = await axios.delete(`http://localhost:8000/admin/deletedepartment/${id}`,{
          headers:{
            Authorization:token
          }
         })
         return id
   }catch(err){
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "deletation failed"
    );
   }
})
//Get Department By rid
export const GetDepartmentByID = createAsyncThunk("auth/GetDepartmentByID",async(dIN,{thunkAPI})=>{
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = user?.token;
   try{
         const response = await axios.get(`http://localhost:8000/admin/departmentbyid/${dIN}`,{
          headers:{
            Authorization:token
          }
         })
        //  console.log(response.data.data);
         return response.data.data
   }catch(err){
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || " failed to get the data"
    );
   }
  })