import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getConsltantData } from "../Store/Registration/RegistrationThunk";
import { registerDoctor } from "../Store/Doctor/authThunk";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import { Eye, SquarePen, Trash2, X } from "lucide-react";
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
        console.log("errrrrr");

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

  const handleDelete = (id) => {
    dispatch(deleteconsultantById(id));
    window.location.reload();
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
            <div className="bg-slate-100 shadow-2xl rounded-md ms-10 top-20 right-[200px] absolute">
              <div
                 className="cursor-pointer absolute right-4 top-4 bg-black text-white p-2 rounded-full"
                onClick={Createconslutent}
              >
                <X />
              </div>
              <form
                onSubmit={handlesubmit}
                className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* CIN */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      CIN:
                    </label>
                    <input
                      type="number"
                      name="cIN"
                      placeholder="CIN"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.cIN || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Username:
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.username || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Gender:
                    </label>
                    <input
                      type="text"
                      name="gender"
                      placeholder="Gender"
                      list="genders"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.gender || ""}
                      onChange={handleChange}
                    />
                    <datalist id="genders">
                      <option value="Male" />
                      <option value="Female" />
                      <option value="Other" />
                    </datalist>
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.dateOfBirth || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Specialty */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Specialty:
                    </label>
                    <input
                      type="text"
                      name="specialty"
                      placeholder="Specialty"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.specialty || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* License Number */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Medical License Number:
                    </label>
                    <input
                      type="text"
                      name="medicalLicenseNumber"
                      placeholder="License Number"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.medicalLicenseNumber || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Years of Experience:
                    </label>
                    <input
                      type="text"
                      name="yearsOfExperience"
                      placeholder="Years of Experience"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.yearsOfExperience || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Phone Number:
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.phoneNumber || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.password || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Specialization */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Specialization:
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      placeholder="Specialization"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.specialization || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Qualifications */}
                  <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                      Qualifications:
                    </label>
                    <input
                      type="text"
                      name="qualifications"
                      placeholder="Qualifications"
                      className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.qualifications || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center mt-8">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-1 rounded-md hover:bg-blue-700 transition"
                  >
                    {isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          )}
          {opendata && (
            <div className="bg-slate-100 shadow-2xl rounded-md ms-10 top-20 right-96 absolute px-28 py-7">
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
                        className=" mt-5 bg-blue-700 text-xl text-white rounded-md  px-3"
                        onClick={() => setopendata(!opendata)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })}
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
                          className="cursor-pointer text-red-700 "
                          onClick={() => handleDelete(item._id)}
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
  );
}

export default Home;
