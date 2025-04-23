import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { LoginDoctor } from '../../Store/Doctor/authThunk';
import toast from 'react-hot-toast';
function DoctorLogin() {
 const dispatch =useDispatch();
   const [formData,SetformData]=useState({
          username:"",
          password:""
   })
      const handlesubmit = async (e)=>{
            e.preventDefault();

             try{
                const  DoctorUser =await dispatch(LoginDoctor({username,password})).unwrap();
                localStorage.setItem("Doctoruser",JSON.stringify(DoctorUser));
                 SetformData("");
                 toast.success("Doctor Login Successfully...")
               
             }catch(err){
                toast.error(err.messsge)
             }
      }
   return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handlesubmit} className="p-6 space-y-4 bg-white rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold text-center">Doctor Login</h2>

        {/* {(error || message) && (
          <p className="text-sm text-center text-red-500">
            {error || message}
          </p>
        )} */}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
        value={formData.username}
    onChange={SetformData(...formData,[e.target.name]=e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
         value={formData.password}
         onChange={SetformData(...formData,[e.target.name]=e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="text-sm text-center">
          Don't have an account?{' '}
         
        </p>
      </form>
    
    </div>
  )
}

export default DoctorLogin