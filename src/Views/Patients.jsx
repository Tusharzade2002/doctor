import React, { use, useEffect, useState } from 'react'
import Sidebar from "./Component/Sidebar";
import { useDispatch,useSelector } from 'react-redux';
import { getallPatient } from '../Store/Registration/RegistrationThunk';
function Patients() {
  const dispatch =useDispatch();
  const {Patient}=useSelector((state)=>state.user);
  const [PatientsData,SetPatientsData]=useState([]);
  const [isopen,setisopen]=useState()
  useEffect(()=>{
    SetPatientsData(Patient)
  },[Patient])
console.log(PatientsData);

  useEffect(()=>{
    dispatch(getallPatient())
  },[dispatch])
  return (
    <div className="flex ">
      
    <Sidebar />
    <div className='flex flex-col w-full'>
    <div  >
      <div>Patients</div>
      <h1>localhost:8000/admin/getallpatient</h1>
    
    </div>
   <div className='text-end me-8 mb-2'><button className='bg-blue-600 px-10 text-xl py-1 rounded-md'>Create +</button></div>
    <table class="table table-bordered w-full">
            <thead>
              <tr>
                <th scope="col">cIN</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">phone number</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              {PatientsData.map((item, index) => {
                return (
                  <tr>
                    <th>{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.address}</td>
                    <td>{item.personal_ph_no}</td>
                    <td>{item.sex}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
    
  </div>
  </div>
  )
}

export default Patients