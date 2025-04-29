import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../Store/Registration/RegistrationThunk";
import toast ,{Toaster}from "react-hot-toast";
const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    address: "",
    phonenumber: "",
    hIN: "",
  });

  const validateForm = () => {
    const newErrors = {};
    const { hIN, name, username, email, password, phoneNumber, address } =
      formData;

    if (!hIN) newErrors.hIN = "hIN is required";
    if (!name) newErrors.name = "Name is required";
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);

    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error:", error);
    }
  };
   
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, [3000]);
   
  }, [handlesubmit]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
   

      <form onSubmit={handlesubmit} className="p-6 space-y-4 bg-white rounded shadow-md ">
        <h1 className="text-2xl font-semibold text-center ">Registration</h1>
        <div className=" bg-white pt-0 p-5">
          <div className="m-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
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
              name="username"
              placeholder="Username"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
         
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
         
            <input
              type="number"
              name="phonenumber"
              placeholder="Phone Number"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.phonenumber}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            
            <input
              type="text"
              name="hIN"
              placeholder="Health Insurance Number"
              className="border-2 border-gray-300 rounded-md p-2"
              value={formData.hIN}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              className=" border-2 border-gray-300 rounded-md p-2"
              value={formData.password}
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
      <Toaster/>
    </div>
  );
};

export default Registration;
