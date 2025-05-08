import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  getConsltantData,
  getallPatient,
  getallreception,
  registerReception,
  deleteconsultantById,
  getConsltantDataById,
  updateConsltantDataById,
  getReceptionById,
  deletereceptionById,
  updatereceptionBYid,
  getAllDepartment,
  RegisterDepartment,
  DeleteDepartment,
  GetDepartmentByID,
  updatedepartmentBYid,
  addpatient,
  deletepatinetById,
  getPatientDataById
} from "./RegistrationThunk";

const initialState = {
  user: null,
  data: null,
  consultantByid: [],
  ReceptionByid: [],
  DepartmentByid:[],
  consultant: [],
  Patient: [],
  getpatientID:[],
  Reception: [],
  Department: [],
  loading: false,
  error: null,
};

const RegistrationSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;

      localStorage.removeItem("users");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.user = action.payload);
      })
      .addCase(registerUser.rejected, (state) => {
        (state.status = "failed"), (state.error = action.error.message);
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getconsultant Data
      .addCase(getConsltantData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConsltantData.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.consultant = action.payload);
      })
      .addCase(getConsltantData.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })

      //getallpatients
      .addCase(getallPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallPatient.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.Patient = action.payload);
      })
      .addCase(getallPatient.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
//add patient
      .addCase(addpatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addpatient.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.user = action.payload);
      })
      .addCase(addpatient.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      //////////delete patient////////
      .addCase(deletepatinetById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletepatinetById.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (patient) => patient._id !== action.payload
        );
      })
      .addCase(deletepatinetById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      ///////////GET patient By ID//////////////
      .addCase(getPatientDataById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPatientDataById.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.getpatientID = action.payload);
      })
      .addCase(getPatientDataById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      //get all Reception
      .addCase(getallreception.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallreception.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.Reception = action.payload);
      })
      .addCase(getallreception.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })




      //Get consultant data by id
      .addCase(getConsltantDataById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConsltantDataById.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.consultantByid = action.payload);
      })
      .addCase(getConsltantDataById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      // create Reception
      .addCase(registerReception.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerReception.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.user = action.payload);
      })
      .addCase(registerReception.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      // upddate consultant data by id
      .addCase(updateConsltantDataById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateConsltantDataById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateConsltantDataById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //Delete Consultant
      .addCase(deleteconsultantById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteconsultantById.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (patient) => patient._id !== action.payload
        );
      })
      .addCase(deleteconsultantById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // get reception by id
      .addCase(getReceptionById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReceptionById.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.ReceptionByid = action.payload);
      })
      .addCase(getReceptionById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      //delete reception data by id
      .addCase(deletereceptionById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletereceptionById.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (patient) => patient._id !== action.payload
        );
      })
      .addCase(deletereceptionById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      .addCase(updatereceptionBYid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatereceptionBYid.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.user = action.payload);
      })
      .addCase(updatereceptionBYid.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
//getALLDepartment
      .addCase(getAllDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllDepartment.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.Department = action.payload);
      })
      .addCase(getAllDepartment.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })
//registerDepartment
      .addCase(RegisterDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RegisterDepartment.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.user = action.payload);
      })
      .addCase(RegisterDepartment.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })
//Delete Department
      .addCase(DeleteDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteDepartment.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (patient) => patient._id !== action.payload
        );      })
      .addCase(DeleteDepartment.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })
      // Get department BY ID
      .addCase(GetDepartmentByID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetDepartmentByID.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.DepartmentByid = action.payload);
      })
      .addCase(GetDepartmentByID.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

       // update Department BY ID
       .addCase(updatedepartmentBYid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatedepartmentBYid.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.DepartmentByid = action.payload);
      })
      .addCase(updatedepartmentBYid.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
  },
});
export const { setFilter } = RegistrationSlice.actions;
export default RegistrationSlice.reducer;
