import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 const APP_URL = import.meta.env.VITE_BACKEND_URL
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
  
    try {
      const response = await axios.post(
        `${APP_URL}/admin/register`,
        formData
      );
      const state = thunkAPI.getState();
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
        `${APP_URL}/admin/login`,
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
  async ( _, { rejectWithValue }) => {
    try { 
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      // console.log("token for getdata:",token);

      const response = await axios.get(
        `${APP_URL}/admin/getallconsultant`,
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
        `${APP_URL}/admin/getallpatient`,
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
//add  Patients
export const addpatient = createAsyncThunk(
  "auth/addpatient",
  async (formData, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.post(
        `${APP_URL}/admin/savepatient`,
        formData,{
          headers:{
            Authorization:token
          }
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "app patient failed"
      );
    }
  }
);
//delete Patients
export const deletepatinetById = createAsyncThunk(
  "auth/deletepatinetById",
  async (id, { thunkAPI }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.delete(
        `${APP_URL}/admin//deletepatient/${id}`,
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
// Get patient BY Id
export const getPatientDataById = createAsyncThunk(
  "auth/getPatientDataById",
  async (pIN, { thunkAPI }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.get(
        `${APP_URL}/admin//getbypin/${pIN}`,
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
        err.response?.data?.message || "get data by id failed"
      );
    }
  }
);

//UPdATe patient 
export const updatePatientDataById = createAsyncThunk(
  "auth/updatePatientDataById",
  async ({ id, updateData }, { thunkAPI }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.patch(
        `${APP_URL}/admin/updatepatient/${id}`,
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
//GetAll Receptionlist
export const getallreception = createAsyncThunk(
  "auth/getallreception",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      const response = await axios.get(
        `${APP_URL}/admin/allreceptionist`,
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
  async (formData, { thunkAPI }) => {
    const state = thunkAPI.getState();
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.post(
        `${APP_URL}/admin/registerreceptionist`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("formdata:",formData);
      
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
  async (id, {  thunkAPI }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.delete(
        `${APP_URL}/admin/deleteconsultant/${id}`,
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
  async (cIN, { thunkAPI }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.get(
        `${APP_URL}/admin/consutantbyid/${cIN}`,
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
  async ({ id, updateData }, { thunkAPI }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.patch(
        `${APP_URL}/admin/updateconsultant/${id}`,
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
  async (rID, { thunkAPI }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(
        `${APP_URL}/admin/receptionistbyid/${rID}`,
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
  async (_id, { thunkAPI }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.delete(
        `${APP_URL}/admin//deletereceptionist/${_id}`,
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
  async ({ id, updateData }, { thunkAPI }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(
        `${APP_URL}/admin/updatereceptionist/${id}`,
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


// get Alldepartment data
export const getAllDepartment = createAsyncThunk(
  "auth/getAllDepartment",
  async (_, { thunkAPI }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(
        `${APP_URL}/admin/alldepartment`,
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
  async (formdata, { thunkAPI }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.post(
        `${APP_URL}/admin/createdepartment`,
        formdata,
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

//Delete Department By Id
export const DeleteDepartment = createAsyncThunk(
  "auth/DeleteDepartment",
  async (id, { thunkAPI }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.delete(
        `${APP_URL}/admin/deletedepartment/${id}`,
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
//Get Department By din
export const GetDepartmentByID = createAsyncThunk(
  "auth/GetDepartmentByID",
  async (dIN, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(
        `${APP_URL}/admin/departmentbyid/${dIN}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      //  console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || " failed to get the data"
      );
    }
  }
);

//update department by id
export const updatedepartmentBYid = createAsyncThunk(
  "auth/updatedepartmentBYid",
  async ({ id, updateData }, { thunkAPI }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(
        `${APP_URL}/admin/updatedepartment/${id}`,
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