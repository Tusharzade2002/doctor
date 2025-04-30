import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import logo from "../assets/images(1).png";
import { useDispatch, useSelector } from "react-redux";
import { getConsltantData } from "../Store/Registration/RegistrationThunk";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "./Component/Sidebar";
function Home() {
  const [username, setUsername] = useState("");
  localStorage.getItem("currentUser");
  const user = localStorage.getItem("currentUser");
  console.log("user", user);
  const decode = jwtDecode(user);
  console.log("decode", decode.username);
  useEffect(() => {
    if (decode.username) {
      setUsername(decode.username);
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get consultant Data
  const { consultant, status, error } = useSelector((state) => state.user);
  const [consultantdata, setconsultantdata] = useState([]);

  useEffect(() => {
    setconsultantdata(consultant);
  }, [consultant]);
  console.log(consultantdata);
  useEffect(() => {
    dispatch(getConsltantData());
  }, [dispatch]);

 

  return (
    <div className="flex ">
       <Sidebar/>

      <div className="flex flex-col w-full">
      
        <div>
          <h1>Home</h1>
          <p>Welcome to the home page!</p>
          <p>Username: {username}</p>
        </div>
        <div>
          {status === "loading" && <p>Loading posts...</p>}
          {status === "failed" && (
            <p style={{ color: "red" }}>Error: {error}</p>
           )}
   
     <div>
      <button className="bg-blue-600 px-7 py-2 rounded-md">Create</button>
     </div>
     
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
           {consultantdata.map((item,index)=>{
            return ( <tr>
               <th >{item.cIN}</th>
               <td>{item.name}</td>
               <td>{item.username}</td>
               <td>{item.email}</td>
               <td>{item.phoneNumber}</td>
               <td>{item.gender}</td>
           </tr>)
           })
                     

            }
                   </tbody>
        </table>

        </div>
       
      </div>
      <Toaster />
    </div>
   
  );
}

export default Home;
