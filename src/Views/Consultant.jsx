import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getConsltantData } from "../Store/Registration/RegistrationThunk";
import { registerDoctor } from "../Store/Doctor/authThunk";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import { Eye, SquarePen, Trash2, X, Plus } from "lucide-react";
import {
  deleteconsultantById,
  getConsltantDataById,
  updateConsltantDataById,
} from "../Store/Registration/RegistrationThunk";

function Home() {
  const [username, setUsername] = useState("");
  //get consultant data by id
  const { consultant, status, error, consultantByid, data } = useSelector(
    (state) => state.user
  );
  const [opendata, setopendata] = useState(false);
  const [selectedItem, Setselecteddata] = useState([]);
  const [editData, setEditData] = useState([]);
  const [selectedid, setSelectedId] = useState(null);
  const [consultantDatabyId, setconsultantdataById] = useState([]);
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

  const [consultantdata, setconsultantdata] = useState([]);

  useEffect(() => {
    setconsultantdata(consultant);
    if (consultantByid) {
      setconsultantdataById(consultantByid);
    }
  }, [consultant, consultantByid]);

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
      if (isEditing) {
        await dispatch(
          updateConsltantDataById({ id: editingId, updateData: formData })
        ).unwrap();
        setcreate(false);
        window.location.reload();
      } else {
        await dispatch(registerDoctor(formData)).unwrap();
        setFormData({
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
        setcreate(!create), setisEditing(false);
        seteditingId(null);
        dispatch(getConsltantData());
      }
    } catch (err) {
      console.log("error:", err);
    }
  };
  // useEffect(()=>{
  //   const consultantadded=()=>{
  //     setcreate(false);
  //   }
  // })
  const [isopenDelete, SetisopenDelete] = useState(false);
  const [deleteid, setdeleteid] = useState(null);
  const handleDelete = (id) => {
    setdeleteid(id);
    SetisopenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteconsultantById(deleteid)).unwrap();
      // dispatch(getConsltantData)
    } catch (err) {
      console.error("Error during deletion:", err);
    } finally {
      SetisopenDelete(false);
      setdeleteid(null);
      window.location.reload();
    }
  };

  // view consultant data by ID

  const handleview = (cIN) => {
    setopendata(!opendata);
    dispatch(getConsltantDataById(cIN));
  };
  useEffect(() => {
    Setselecteddata(consultantByid);
  }, [consultantByid]);

  // console.log(consultantByid);

  // update consultant data
  const [isEditing, setisEditing] = useState(false);
  const [editingId, seteditingId] = useState(null);
  const handleUpdate = (item) => {
    setFormData({
      cIN: item.cIN || "",
      name: item.name || "",
      gender: item.gender || "",
      email: item.email || "",
      dateOfBirth: item.dateOfBirth || "",
      specialty: item.specialty || "",
      qualifications: item.qualifications || "",
      medicalLicenseNumber: item.medicalLicenseNumber || "",
      phoneNumber: item.phoneNumber || "",
      yearsOfExperience: item.yearsOfExperience || "",
      username: item.username || "",
      password: "",
    });
    setcreate(true);
    setisEditing(true);
    seteditingId(item._id || item.id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex relative w-full">
      <Sidebar className="w-[20%] "/>

      <div className="flex flex-col ms-3 w-[80%]">
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
              className=" bg-blue-600  px-7 py-2 rounded-md mb-5 text-lg items-center me-4 text-white"
            >
              <h1 className="flex">
                {" "}
                Create
                <Plus className="ms-1" />
              </h1>
            </button>
          </div>

          {create && (
            <div className=" shadow-2xl rounded-md bg-black inset-0 bg-opacity-50 z-50 fixed p-10">
              <form
                onSubmit={handlesubmit}
                className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto "
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CIN */}
                  <input
                    type="number"
                    name="cIN"
                    placeholder="CIN"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.cIN || ""}
                    onChange={handleChange}
                  />

                  {/* Username */}
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.username || ""}
                    onChange={handleChange}
                  />

                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />

                  {/* Gender */}
                  <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    list="genders"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.gender || ""}
                    onChange={handleChange}
                  />
                  <datalist id="genders">
                    <option value="Male" />
                    <option value="Female" />
                    <option value="Other" />
                  </datalist>

                  {/* DOB */}
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.dateOfBirth || ""}
                    onChange={handleChange}
                  />

                  {/* Specialty */}
                  <input
                    type="text"
                    name="specialty"
                    placeholder="Specialty"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.specialty || ""}
                    onChange={handleChange}
                  />

                  {/* License Number */}
                  <input
                    type="text"
                    name="medicalLicenseNumber"
                    placeholder="Medical License Number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.medicalLicenseNumber || ""}
                    onChange={handleChange}
                  />

                  {/* Experience */}
                  <input
                    type="text"
                    name="yearsOfExperience"
                    placeholder="Years of Experience"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.yearsOfExperience || ""}
                    onChange={handleChange}
                  />

                  {/* Phone */}
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.phoneNumber || ""}
                    onChange={handleChange}
                  />

                  {/* Password */}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.password || ""}
                    onChange={handleChange}
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />

                  {/* Qualifications */}
                  <input
                    type="text"
                    name="qualifications"
                    placeholder="Qualifications"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;"
                    value={formData.qualifications || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="text-end mt-4">
                  <button
                    type="submit"
                    onClick={Createconslutent}
                    className="bg-slate-700 mx-3 text-white px-10 py-2 rounded-lg hover:bg-slate-900 transition-shadow shadow-md"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-green-700 mx-3 text-white px-10 py-2 rounded-lg hover:bg-green-900 transition-shadow shadow-md"
                  >
                    {isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          )}
          {opendata && (
            <div className="shadow-2xl rounded-md bg-black inset-0 bg-opacity-50 z-50 fixed p-10">
              <div className="bg-white p-5 rounded-2xl shadow-lg max-w-lg mx-auto">
                {selectedItem.map((item) => {
                  return (
                    <div>
                      <h1 className="text-xl m-2">
                        <b>CIN:</b>
                        {item.cIN}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>Name:</b>
                        {item.name}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>Username:</b>
                        {item.username}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>Gender:</b>
                        {item.gender}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>Date Of Birth:</b>
                        {item.dateOfBirth}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>Phone Number:</b>
                        {item.phoneNumber}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>Qualifications:</b>
                        {item.qualifications}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>Specialty:</b>
                        {item.specialty}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>medicalLicenseNumber:</b>
                        {item.medicalLicenseNumber}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>medicalLicenseNumber:</b>
                        {item.medicalLicenseNumber}
                      </h1>
                      <h1 className="text-xl m-2">
                        <b>Years Of Experience:</b>
                        {item.yearsOfExperience}
                      </h1>
                      <div className="text-center">
                        {" "}
                        <button
                          className=" mt-5 bg-slate-700 hover:bg-slate-900 text-xl text-white rounded-md py-2 px-7"
                          onClick={() => setopendata(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {isopenDelete && (
            <div className="shadow-2xl rounded-md bg-black inset-0 bg-opacity-50 z-50 fixed p-52 px-[600px]">
              <div className="bg-white  p-8 rounded-2xl shadow-lg w-64">
                <div className="text-center font-bold">
                  Are you sure to delete?
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => SetisopenDelete(false)}
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
            <table class="w-full text-sm text-left table-auto">
              <thead className="text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border" scope="col">
                    cIN
                  </th>
                  <th className="px-4 py-2 border" scope="col">
                    Name
                  </th>
                  <th className="px-4 py-2 border" scope="col">
                    Username
                  </th>
                  <th className="px-4 py-2 border" scope="col">
                    Email
                  </th>
                  <th className="px-4 py-2 border" scope="col">
                    phone number
                  </th>
                  <th className="px-4 py-2 border" scope="col">
                    Gender
                  </th>
                  <th className="px-4 py-2 border" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {consultantdata.map((item, index) => {
                  return (
                    <tr className="hover:bg-gray-100">
                      <th className="px-4 py-2 border">{item.cIN}</th>
                      <td className="px-4 py-2 border">{item.name}</td>
                      <td className="px-4 py-2 border">{item.username}</td>
                      <td className="px-4 py-2 border">{item.email}</td>
                      <td className="px-4 py-2 border">{item.phoneNumber}</td>
                      <td className="px-4 py-2 border">{item.gender}</td>
                      <td>
                        <div className="flex justify-around">
                          <div
                            className="cursor-pointer text-blue-700"
                            onClick={() => handleview(item.cIN)}
                          >
                            <Eye />
                          </div>
                          <div
                            className="cursor-pointer text-green-600"
                            onClick={() => handleUpdate(item)}
                          >
                            <SquarePen />
                          </div>
                          <div
                            className="cursor-pointer text-red-700"
                            onClick={() => handleDelete(item._id || item.id)}
                            // onClick={()=>SetisopenDelete(true)}
                          >
                            <Trash2 />
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
    </div>
  );
}

export default Home;
