import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerDoctor } from "../../Store/Doctor/authThunk";  
import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
function DoctorRegistration() {
  const [formData, setFormData] = useState({
    cIN: "",
    name: "",
    gender: "",
    email:"",
    dateOfBirth: "",
    specialization: "",
    specialty:"",
    qualifications: "",
    medicalLicenseNumber: "",
    phoneNumber: "",
    yearsOfExperience: "",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(registerDoctor(formData)).unwrap();
      console.log("Registration successful:", response);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

 useEffect(()=>{
    setTimeout(() => {
      navigate("/doctor/login");
 })
},[handlesubmit])
toast.success("Registration Sucessfuly.... Login")
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <form
        onSubmit={handlesubmit}
        className="p-6 space-y-4 bg-white rounded shadow-md "
      >
        <h1 className="text-2xl font-semibold text-center">Doctor Registration</h1>
        <div className=" bg-white pt-0 p-5">
          <div className="m-3">
            <input
              type="text"
              name="cIN"
              placeholder="Consultant Number"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.cIN}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="name"
              placeholder="name"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="gender"
              placeholder="gender"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="dateOfBirth"
              placeholder="date of birth"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="specialization"
              placeholder="specialization"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.specialization}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="qualifications"
              placeholder="qualification"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.qualifications}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="medicalLicenseNumber"
              placeholder="medical linice number"
              className=" border-2 border-gray-300 rounded-md p-2"
              value={formData.medicalLicenseNumber}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="number"
              name="yearsOfExperience"
              placeholder="years of experience"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.yearsOfExperience}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="username"
              placeholder="username"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="password"
              name="password"
              placeholder="password"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.password} 
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="text"
              name="specialty"
              placeholder="specialty"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.specialty} 
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <input
              type="email"
              name="email"
              placeholder="email"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.email} 
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button className="bg-blue-600 w-full py-2  rounded-sm" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorRegistration;
