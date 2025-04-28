import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import  logo from  "../assets/images(1).png"
import {useDispatch, useSelector } from 'react-redux';
import { getConsltantData} from  '../Store/Registration/RegistrationThunk';
import { Link } from 'react-router-dom';
function Home() {
 const [username,setUsername] = useState("")
  localStorage.getItem("currentUser")
  const user = localStorage.getItem("currentUser")
 console.log("user",user);
 const decode = jwtDecode(user);
  console.log("decode",decode.username);
  useEffect(() => {
    if(decode.username) {
      setUsername(decode.username)
  }},[])
   
  

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  console.log(data);


  useEffect(() => {
    dispatch(getConsltantData());
  }, [dispatch]);



  return(
    <div className='flex ' >
      <div className='bg-blue-400 p-0 w-[270px] h-[100vh]'>
        
        <div>
            <img src={logo} alt="" className='block m-auto w-[60%] my-10 rounded-sm' /> 
        </div>
        <div className='flex flex-col items-center justify-center'>
            <Link to="/home"><button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Home </button></Link>
           <Link > <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Admin </button> </Link>
           <Link to="/doctor/registration"> <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Doctor </button></Link>
           <Link to=""> <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Respeanlist </button></Link>
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
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
           <p>Username: {username}</p>
           </div>
           <div>
     
    </div>
           
      </div>
           
    </div> 
    )
}

export default Home