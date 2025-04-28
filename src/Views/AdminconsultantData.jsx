import React, { useEffect, useState } from 'react'
import logo from '../assets/images(1).png'
import {Link} from 'react-router-dom'
import { useDispatch ,useSelector} from 'react-redux'
import {getConsltantData} from '../Store/Registration/RegistrationThunk'
function AdminconsultantData() {

     const dispatch = useDispatch();
     const {consultant,status,error} =useSelector((state)=>state.user)
     const [consultantdata,setconsultantdata] =useState([])

     useEffect(()=>{
        setconsultantdata(consultant)
     },[consultant])
     console.log(consultantdata);
     
  //get
  useEffect(() => {
    dispatch(getConsltantData()); 
  }, [dispatch]);
  return (
    <div className='flex ' >
    <div className='bg-blue-400 p-0 w-[270px] h-[100vh]'>
      
      <div>
          <img src={logo} alt="" className='block m-auto w-[60%] my-10 rounded-sm' /> 
      </div>
      <div className='flex flex-col items-center justify-center'>
          <Link to="/home"><button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Home </button></Link>
         <Link > <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Admin </button> </Link>
         <Link to="/doctor/registration"> <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Doctor </button></Link>
         <Link> <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Consulatant </button></Link>
         <Link> <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'>pesent</button></Link>
       </div>
    </div>

    <div className='flex flex-col w-full'>

       <nav className='bg-black text-white w-[100%]'>
          <ul className='flex justify-around  p-2'>
              <li className='m-3'>Home</li>
              <li className='m-3'>About</li>
              <li className='m-3'>Contact</li>
              <li className='m-3'>Logout</li>
          </ul>
       </nav>
       <div>
          <h1>All Consultant Data</h1>
        
           <div className='flex '>
                      <p>Ramu</p>
                      <p>Ramu</p>
                      <p>Ramu</p>
                      <p>Ramu</p>
           </div>


       </div>
    </div>
    {status === "loading" && <p>Loading posts...</p>}
    {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}
         
  </div> 
  )
}

export default AdminconsultantData