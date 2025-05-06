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
import { Eye, SquarePen, Trash2, X } from "lucide-react";

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
    rID: "",
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(
          updatereceptionBYid({ id: editingId, updateData: formdata })
        ).unwrap();
        setcreate(false);
        window.location.reload();
      } else {
        await dispatch(registerReception(formdata)).unwrap();
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

  const handledelte = (id) => {
    dispatch(deletereceptionById(id));
    window.location.reload();
  };
  // update reception data by id
  const [isEditing, setisEditing] = useState(false);
  const [editingId, seteditingId] = useState(null);
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
            className="bg-blue-600 px-7 py-2 rounded-md mb-5 me-4"
          >
            Create +
          </button>
        </div>
        {create && (
          <div className="bg-slate-100 shadow-2xl rounded-md ms-10  absolute top-24 right-32 ">
            <form
              onSubmit={handlesubmit}
              className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto"
            >
              {/* Close Button */}
              <div
                onClick={() => setcreate(false)}
                className="cursor-pointer absolute right-4 top-4 bg-black text-white p-2 rounded-full"
              >
                <X />
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* RID */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    RID
                  </label>
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
                  <label className="block text-gray-700 font-semibold mb-1">
                    Name
                  </label>
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
                  <label className="block text-gray-700 font-semibold mb-1">
                    Username
                  </label>
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
                  <label className="block text-gray-700 font-semibold mb-1">
                    Gender
                  </label>
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
                  <label className="block text-gray-700 font-semibold mb-1">
                    Date of Birth
                  </label>
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
                  <label className="block text-gray-700 font-semibold mb-1">
                    Phone Number
                  </label>
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
                  <label className="block text-gray-700 font-semibold mb-1">
                    Email
                  </label>
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
                  <label className="block text-gray-700 font-semibold mb-1">
                    Password
                  </label>
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

              {/* Submit Button */}
              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-md shadow-md transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
        {/* {updateformopen && (
          <div className="bg-slate-100 shadow-2xl rounded-md ms-10 w-[350px] absolute top-10 right-44 ">
            <form onSubmit={updatehandlesubmit}>
              <div onClick={()=>setupdateformopen(false)} className="cursor-pointer absolute right-4 top-4 bg-black text-white" > <X/></div>
              <div className="flex flex-wrap">
                <div className="flex m-3 items-center">
                  <div className="me-3">Name:</div>
                  <input
                    type="text"
                    name="rID"
                    placeholder="RID"
                    className="border w-52 px-3 py-1 rounded-md"
                    value={formdata.rID}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex m-3 items-center">
                  <div className="me-3">Name:</div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="border w-52 px-3 py-1 rounded-md"
                    value={formdata.name}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex m-3 items-center">
                  <div className="me-3 text-lg">Username:</div>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    className="border w-52 px-3 py-1 rounded-md"
                    value={formdata.username}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex m-3 items-center">
                  <div className="me-3 text-lg">Gender:</div>
                  <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    className="border w-52 px-3 py-1 rounded-md"
                    value={formdata.gender}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
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
                <div className="flex m-3 mx-4 items-center">
                  <div className="me-3 text-lg">DOB:</div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="DOB"
                    className="border w-52 px-3 py-1 rounded-md"
                    value={formdata.dateOfBirth}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex m-3 items-center">
                  <div className="me-3 text-lg">Phone Number:</div>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="phoneNumber"
                    className="border w-52 px-3 py-1 rounded-md"
                    value={formdata.phoneNumber}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex m-3 items-center">
                  <div className="me-3 text-lg">email:</div>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="border w-52 px-3 py-1 rounded-md"
                    value={formdata.email}
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex m-3 items-center">
                  <div className="me-3 text-lg">Password:</div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border w-52 px-3 py-1 rounded-md"
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
        )} */}
        {Isopen && (
          <div className="bg-slate-100 shadow-2xl rounded-md ms-10 w-[450px] absolute top-30 right-96 p-10 mx-12 ">
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
        )}
        <div>
          <table class="table table-bordered w-full">
            <thead>
              <tr>
                <th scope="col">cIN</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Date Of Birth</th>
                <th scope="col">phone number</th>
                <th scope="col">Gender</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Receptiondata.map((item, index) => {
                return (
                  <tr>
                    <th>{item.rID}</th>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.gender}</td>
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
