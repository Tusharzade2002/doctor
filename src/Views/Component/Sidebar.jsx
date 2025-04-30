import React from 'react'
import {Link} from 'react-router-dom'
import logo from "../../assets/images(1).png";
function Sidebar() {
     const handlelogout = () => {
        localStorage.removeItem("currentUser");
       
        setTimeout(() => {
          navigate("/login");
        }, [3000]);
      };
  return (
    <div className="bg-blue-400  w-[20%] h-[100%]">
        <div>
            <Link to="/home">
          <img
            src={logo}
            alt=""
            className="block m-auto h-10 my-3 rounded-sm"
          />
          </Link> 
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to="/dashboard">
            <button className="hover:bg-blue-300  rounded-xl text-2xl hover:shadow-2xl my-4">
             Dashboard
            </button>
          </Link>
          <Link to="/patient">
            <button className="hover:bg-blue-300 rounded-xl text-2xl hover:shadow-2xl my-4">
             Patients
            </button>
          </Link>
          <Link to="/doctor/registration">
           
            <button className="hover:bg-blue-300 rounded-xl text-2xl hover:shadow-2xl my-4">
              Receptionlist
            </button>
          </Link>
          <Link to="/appointment">
           
            <button className="hover:bg-blue-300  rounded-xl text-2xl hover:shadow-2xl my-4">
              Appointment
            </button>
          </Link>
          <Link to="/login">
            <button className="hover:bg-blue-300  rounded-xl text-2xl hover:shadow-2xl my-4">
              login
            </button>
          </Link>

          <Link to="*">
            <button className="hover:bg-blue-300  rounded-xl text-2xl hover:shadow-2xl my-4">
              404 not found
            </button>
          </Link>

          <Link to="/patientdetail">
            <button className="hover:bg-blue-300  rounded-xl text-2xl hover:shadow-2xl my-4">
              patient Details
            </button>
          </Link>
          <Link to="/department">
            <button className="hover:bg-blue-300  rounded-xl text-2xl hover:shadow-2xl my-4">
              Department
            </button>
          </Link>
          <button
            onClick={handlelogout}
            className="bg-red-500 rounded-sm px-7 py-2"
          >
            Logout
          </button>
        </div>
      </div>
  )
}

export default Sidebar