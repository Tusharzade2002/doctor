import React ,{useState}from 'react'
import { useDispatch } from 'react-redux';
import { registerDoctor } from '../../Store/Doctor/authThunk';
function DoctorRegistration() {
  const [formData, setFormData] =useState({
    cIN: "",
    name: "",
    gender:"",
    dateofBirth:"",
    specialization:"",
    qualification:"",
    medicalLicenseNumber:"",
    phoneNumber:"",
    yearsOfExperience:"",
    username:"",
    password:"",
  })
  const dispatch = useDispatch();
  const handlesubmit = async(e) => {
    e.preventDefault();
     try{
      const  response = await  dispatch(registerDoctor(formData)).unwrap();
      console.log("Registration successful:", response);
     }catch(error){
      console.error("Error:", error);
     }
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <form onSubmit={handlesubmit}  className="p-6 space-y-4 bg-white rounded shadow-md ">
        <h1 className="text-2xl font-semibold text-center">Registration</h1>
        <div className=" bg-white pt-0 p-5">
          <div className="m-3">
            <input
              type="text"
              name="name"
              placeholder="Consultant Number"
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="username"
              placeholder="name"
              className="border-2 border-gray-300 rounded-md p-2"
             
            />
          </div>
          <div className="m-3">
         
            <input
              type="text"
              name="email"
              placeholder="gender"
              className="border-2 border-gray-300 rounded-md p-2"
             
            />
          </div>
          <div className="m-3">
         
            <input
              type="number"
              name="phonenumber"
              placeholder="date of birth"
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="address"
              placeholder="specialization"
              className="border-2 border-gray-300 rounded-md p-2"  
            />
          </div>
          <div className="m-3">
            
            <input
              type="text"
              name="hIN"
              placeholder="qualification"
              className="border-2 border-gray-300 rounded-md p-2"
             
            />
          </div>
          <div className="m-3">
            
            <input
              type="text"
              name="password"
              placeholder="medical linice number"
              className=" border-2 border-gray-300 rounded-md p-2"
             
            />
          </div>

          <div className="m-3">
            
            <input
              type="text"
              name="hIN"
              placeholder="Phone Number"
              className="border-2 border-gray-300 rounded-md p-2"
             
            />
          </div>
          <div className="m-3">
            
            <input
              type="number"
              name="hIN"
              placeholder="years of experience"
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="hIN"
              placeholder="username"
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="m-3">
            <input
              type="password"
              name="hIN"
              placeholder="password"
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </div>
        
          <button className="bg-blue-600 w-full py-2  rounded-sm" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default DoctorRegistration