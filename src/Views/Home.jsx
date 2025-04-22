import React, { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import  logo from  "../assets/images(1).png"
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


  return(
    <div className='flex ' >
      <div className='bg-blue-400 p-0 w-[270px] h-[100vh]'>
        <div>
            <img src={logo} alt="" className='block m-auto w-[60%] my-10 rounded-sm' /> 
        </div>
        <div className='flex flex-col items-center justify-center'>
            <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Home </button>
            <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Admin </button>
            <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Doctor </button>
            <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'> Consulatant </button>
            <button className='hover:bg-blue-300 w-[90%] rounded-xl text-2xl hover:shadow-2xl my-5'>pesent</button>
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
      </div>
           
    </div> 
    )
}

export default Home