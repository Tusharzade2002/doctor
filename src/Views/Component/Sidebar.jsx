import React from 'react'
import {Link} from "react-router-dom"
import { LayoutDashboard, Menu } from "lucide-react"; 
function Sidebar() {
   const handlelogout = () => {
    localStorage.removeItem("currentUser");

    setTimeout(() => {
      navigate("/login");
    }, [3000]);
  };
  return (
    <div className=' bg-black  text-white h-[100vh]'>
        <div className='flex flex-col'>
           <h1 className='m-9 text-2xl font-bold inline'>Doctor App</h1>
          <div className='flex flex-col justify-center items-start ms-8'>
           <Link className='flex my-4 text-xl' to="/dashboard"><LayoutDashboard className='me-3'/>  DashBoard</Link>
           <Link className='flex my-4 text-xl' to="/consultant" ><LayoutDashboard className='me-3'/> Consultant</Link>
           <Link className='flex my-4 text-xl' to="/patient"> <LayoutDashboard className='me-3'/> Patient</Link>
           <Link className='flex my-4 text-xl' to="/receptionlist"><LayoutDashboard className='me-3'/> Receptionlist</Link>
           <Link className='flex my-4 text-xl' to="/department"><LayoutDashboard className='me-3'/> Department</Link>
              <button
              onClick={handlelogout}
              className="bg-red-500 rounded-sm px-7 py-2 mt-5"
            >
              Logout
            </button>

            
           
           </div>
        </div>
    </div>
  )
}

export default Sidebar