import React, { useState, useEffect } from "react";
import Sidebar from "./Component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getallreception } from "../Store/Registration/RegistrationThunk";
import {
  registerReception,
  getReceptionById,
  deletereceptionById,
  updatereceptionBYid,
} from "../Store/Registration/RegistrationThunk";
import { Eye, SquarePen, Trash2, X,Plus } from "lucide-react";

function Receptionlist() {
  const dispatch = useDispatch();
  const { Reception, status, error, ReceptionByid } = useSelector(
    (state) => state.user
  );
  const [Receptiondata, setReceptiondata] = useState([]);

  useEffect(() => {
    setReceptiondata(Reception);
  }, [Reception]);
  useEffect(() => {
    dispatch(getallreception());
  }, [dispatch]);

  const [create, setcreate] = useState(false);
  const Createconslutent = () => {
    setcreate(!create);
  };

  const [formdata, setformdata] = useState({
    dIN: "",
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    password: "",
  });
  const [isEditing, setisEditing] = useState(false);
  const [editingId, seteditingId] = useState(null);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(
          updatereceptionBYid({ id: editingId, updateData: formdata })
        ).unwrap();
        window.location.reload();
      } else {
        await dispatch(registerReception(formdata)).unwrap();
        window.location.reload()
      }
      setformdata({
        rID: "",
        name: "",
        username: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        password: "", // You may not want to prefill password
        _id: "",
      });
      setcreate(false);
      setisEditing(false);
      seteditingId(null);
      dispatch(getReceptionById());
    } catch (err) {
      console.log("errr");
    }
  };

  //Handle view
  const [Isopen, setIsopen] = useState(false);
  const [Receptionid, setReceptionid] = useState([]);
  const handleview = (rID) => {
    setIsopen(true);
    dispatch(getReceptionById(rID));
  };
  useEffect(() => {
    setReceptionid(ReceptionByid);
  }, [ReceptionByid]);

  //delete reception data by id
const [deleteopen,setdeleteopen]=useState(false);
const [deleteid,setdeleteid]=useState(null)
  const handledelte = (id) => {
     setdeleteopen(true)
     setdeleteid(id)
  };

  const confirmDelete=async()=>{
     try{
      dispatch(deletereceptionById(deleteid)).unwrap()
        setdeleteopen(false);
     }catch(err){
      console.log("error during deletion");
     }finally{
      setdeleteopen(false);
      setdeleteid(null)
      window.location.reload()
     }
  }
  // update reception data by id

  const handleupdate = (item) => {
    setformdata({
      rID: item.rID || "",
      name: item.name || "",
      username: item.username || "",
      email: item.email || "",
      phoneNumber: item.phoneNumber || "",
      gender: item.gender || "",
      dateOfBirth: item.dateOfBirth || "",
      password: "", // You may not want to prefill password
      _id: item._id,
    });
    setcreate(true);
    setisEditing(true);
    seteditingId(item._id || item.id);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full ">
        <div>Receptionlist</div>
        <h1>localhost:8000/admin/allreceptionist</h1>
        <h1>http://localhost:8000/admin/registerreceptionist</h1>
        {status === "loading" && <p>Loading posts...</p>}
        {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}


        <div className="text-end">
          <button
             onClick={Createconslutent}
            className=" bg-blue-600  px-7 py-2 rounded-md mb-5 text-lg items-center me-4 text-white"
          >
          <h1 className="flex"> Create<Plus className="ms-1"/></h1>

          </button>
        </div>
       
        {create && (
         <div className="shadow-2xl rounded-md bg-black inset-0 bg-opacity-50 z-50 fixed pt-28 p-48">
            <div className="bg-white p-5 rounded-2xl shadow-lg w-[450px] mx-auto">
            <form
              onSubmit={handlesubmit}
              className="relative bg-white p-6 w-full max-w-4xl mx-auto"
            >
              

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* RID */}
                <div>
                 
                  <input
                    type="text"
                    name="rID"
                    placeholder="RID"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formdata.rID}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                {/* Name */}
                <div>
                 
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formdata.name}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Username */}
                <div>
                 
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formdata.username}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Gender */}
                <div>
                  
                  <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    list="genders"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formdata.gender}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <datalist id="genders">
                    <option value="Male" />
                    <option value="Female" />
                    <option value="Other" />
                  </datalist>
                </div>

                {/* DOB */}
                <div>
                
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formdata.dateOfBirth}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Phone Number */}
                <div>
                  
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formdata.phoneNumber}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Email */}
                <div>
             
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formdata.email}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Password */}
                <div>
                  
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formdata.password}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                      <button
                        type="submit"
                        onClick={() => setcreate(false)}
                        className="bg-slate-700 mx-3 text-white px-10 py-2 rounded-lg hover:bg-slate-400 transition-shadow shadow-md"
                      >
                        Cancel
                      </button>
                  
                  
                      <button
                        type="submit"
                        className="bg-blue-600 mx-3 text-white px-10 py-2 rounded-lg hover:bg-blue-700 transition-shadow shadow-md"
                      >
                        {isEditing ? "Update" : "Create"}
                      </button>
                      </div>
           
            </form>
          </div>
          </div>
        )}
       
        {Isopen && (
          <div className="shadow-2xl rounded-md bg-black inset-0 bg-opacity-50 z-50 fixed pt-24">
            <div className="bg-white  rounded-2xl shadow-lg w-96 mx-auto p-6">
            {Object.entries(Receptionid).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
            <div className="text-center ">
              {" "}
              <button
                className="bg-blue-700 px-7 rounded-md py-1"
                onClick={() => setIsopen(false)}
              >
                Cancel
              </button>{" "}
            </div>
          </div>
          </div>
        )}
         {deleteopen && (
          <div className="shadow-2xl rounded-md bg-black inset-0 bg-opacity-50 z-50 fixed p-52 px-[600px]">
              <div className="bg-white  p-8 rounded-2xl shadow-lg w-64">
            <div className="text-center font-bold">
              {" "}
              Are you sure to delete?
            </div>
            <div className="flex  mt-7">
              <button
                onClick={() => setdeleteopen(false)}
                className="px-4 py-2 m-3 bg-gray-300 rounded hover:bg-gray-400"
              >
                CANCEL
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 m-3 bg-red-600 text-white rounded hover:bg-red-700"
              >
                OKAY
              </button>
            </div>
            </div>
          </div>
        )}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table class="table table-bordered w-full">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="px-4 py-2 border" scope="col">cIN</th>
                <th className="px-4 py-2 border" scope="col">Name</th>
                <th className="px-4 py-2 border" scope="col">Username</th>
                <th className="px-4 py-2 border" scope="col">Email</th>
                <th className="px-4 py-2 border" scope="col">Date Of Birth</th>
                <th className="px-4 py-2 border" scope="col">phone number</th>
                <th className="px-4 py-2 border" scope="col">Gender</th>
                <th className="px-4 py-2 border" scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Receptiondata.map((item, index) => {
                return (
                  <tr className="hover:bg-gray-100">
                    <th className="px-4 py-2 border">{item.rID}</th>
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">{item.username}</td>
                    <td className="px-4 py-2 border">{item.email}</td>
                    <td className="px-4 py-2 border">{item.dateOfBirth}</td>
                    <td className="px-4 py-2 border">{item.phoneNumber}</td>
                    <td className="px-4 py-2 border">{item.gender}</td>
                    <td>
                      <div className="flex justify-around">
                        <div
                          onClick={() => handleview(item.rID)}
                          className="text-blue-700 cursor-pointer"
                        >
                          <Eye />
                        </div>
                        <div className=" text-green-600 cursor-pointer">
                          <div onClick={() => handleupdate(item)}>
                            <SquarePen />
                          </div>
                        </div>
                        <div className="text-red-700 cursor-pointer">
                          <div onClick={() => handledelte(item._id)}>
                            <Trash2 />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Receptionlist;
