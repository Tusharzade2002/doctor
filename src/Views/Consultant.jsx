import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getConsltantData } from "../Store/Registration/RegistrationThunk";
import { registerDoctor } from "../Store/Doctor/authThunk";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import {deleteconsultantById} from '../Store/Registration/RegistrationThunk'
function Home() {
  const [username, setUsername] = useState("");
  localStorage.getItem("currentUser");
  const user = localStorage.getItem("currentUser");
  // console.log("user", user);
  const decode = jwtDecode(user);
  // console.log("decode", decode.username);
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
  useEffect(() => {
    dispatch(getConsltantData());
  }, [dispatch]);

  const [create, setcreate] = useState(false);
  const Createconslutent = () => {
    setcreate(!create);
  };

  const [formData, setFormData] = useState({
    cIN: "",
    name: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    specialization: "",
    specialty: "",
    qualifications: "",
    medicalLicenseNumber: "",
    phoneNumber: "",
    yearsOfExperience: "",
    username: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(registerDoctor(formData)).unwrap();
      console.log("doctor new data:", response);
      setcreate(false);
      window.location.reload();
    } catch (err) {
      console.log("error:", err);
    }
  };
  // useEffect(()=>{
  //   const consultantadded=()=>{
  //     setcreate(false);
  //   }
  // })

  const handleDelete = (id) => {
    
      dispatch(deleteconsultantById(id));
    window.location.reload()
  };
  return (
    <div className="flex relative">
      <Sidebar />

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

          <div className="text-end">
            <button
              onClick={Createconslutent}
              className="bg-blue-600 px-7 py-2 rounded-md mb-5 me-4"
            >
              Create +
            </button>
          </div>
          {create && (
            <div className="bg-slate-100 shadow-2xl rounded-md ms-10 absolute ">
              <form onSubmit={handlesubmit}>
                <div className="flex flex-wrap">
                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">CIN:</div>
                    <input
                      type="number"
                      name="cIN"
                      placeholder="CIN"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.cIN}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">Username:</div>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex m-5 items-center">
                    <div className="me-3">Name:</div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">Gender:</div>
                    <input
                      type="text"
                      name="gender"
                      placeholder="Gender"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      list="genders"
                    />
                    <datalist id="genders">
                      <option value="Male"></option>
                      <option value="Female"></option>
                      <option value="Other"></option>
                    </datalist>
                  </div>
                  <div className="flex m-5 mx-4 items-center">
                    <div className="me-3 text-lg">DOB:</div>
                    <input
                      type="date"
                      name="dateOfBirth"
                      placeholder="DOB"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex mx-4 m-5 items-center">
                    <div className="me-3 text-lg">Specialty:</div>
                    <input
                      type="text"
                      placeholder="Specialty"
                      name="specialty"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.specialty}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">Medical License Number:</div>
                    <input
                      type="text"
                      name="medicalLicenseNumber"
                      placeholder="Medical License Number"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.medicalLicenseNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">years Of Experience:</div>
                    <input
                      type="text"
                      name="yearsOfExperience"
                      placeholder="years Of Experience"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.yearsOfExperience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">Phone Number:</div>
                    <input
                      type="number"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">Password:</div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">email:</div>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">Specialization:</div>
                    <input
                      type="text"
                      placeholder="specialization"
                      name="specialization"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.specialization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex m-5 items-center">
                    <div className="me-3 text-lg">Qualifications:</div>
                    <input
                      type="text"
                      name="qualifications"
                      placeholder="qualifications"
                      className="border w-52 px-3 py-1 rounded-md"
                      value={formData.qualifications}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="block text-center my-4">
                  {" "}
                  <button
                    type="submit"
                    className=" bg-blue-600 px-7 py-2 rounded-md"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          )}

          <table class="table table-bordered w-full">
            <thead>
              <tr>
                <th scope="col">cIN</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">phone number</th>
                <th scope="col">Gender</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {consultantdata.map((item, index) => {
                return (
                  <tr>
                    <th>{item.cIN}</th>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.gender}</td>
                    <td>
                      {" "}
                      <div className="flex">
                        <Eye /> <SquarePen />
                       <div onClick={()=>handleDelete(item._id)}> <Trash2/></div>
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

export default Home;
