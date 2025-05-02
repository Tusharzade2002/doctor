import React, { useEffect, useState } from "react";
import Sidebar from "./Component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {getallPatient} from '../Store/Registration/RegistrationThunk'


function Patient() {
  const dispatch = useDispatch();
  const { Patient, status, error } = useSelector((state) =>state.user);
  const [PatientData, SetPatientData] = useState([]);


  useEffect(() => {
    SetPatientData(Patient);
  }, [Patient]);
  
console.log(PatientData);

  useEffect(() => {
    dispatch(getallPatient());
  }, [dispatch]);
  
  
  return (
    <div className="flex ">
     <Sidebar/>
      <div className="w-full">
        <h1 className="text-center">Patient Deatils</h1>
        <h1>localhost:8000/admin/getallpatient</h1>
        <div>
          <table class="table table-bordered w-full">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Date Of Birth</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" && <p>Loading posts..</p>}
              {status === "failed" && (
                <p style={{ color: "red" }}>Error:{error}</p>
              )}
              {PatientData.map((item, index) => {
                return (
                  <tr>
                    <th>{index+1}</th>
                    <th>{item.name}</th>
                    <th>{item.username}</th>
                    <th>{item.email}</th>
                    <th>{item.gender}</th>
                    <th>{item.dateOfBirth}</th>
                 
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Patient;
