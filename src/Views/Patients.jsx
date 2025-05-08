import React, { use, useEffect, useState } from "react";
import Sidebar from "./Component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  addpatient,
  getallPatient,
  deletepatinetById,
  getPatientDataById,
} from "../Store/Registration/RegistrationThunk";
import { Eye, Trash2, SquarePen, X } from "lucide-react";
function Patients() {
  const dispatch = useDispatch();
  const { Patient, getpatientID } = useSelector((state) => state.user);
  const [PatientsData, SetPatientsData] = useState([]);
  const [isopen, setisopen] = useState(false);
  useEffect(() => {
    SetPatientsData(Patient);
  }, [Patient]);
  // console.log(PatientsData);

  useEffect(() => {
    dispatch(getallPatient());
  }, [dispatch]);

  const [formData, setformData] = useState({
    pIN: "",
    patienttype: "",
    name: "",
    address: "",
    personal_ph_no: "",
    age: "",
    sex: "",
    dob: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(addpatient(formData)).unwrap();
      // console.log(response.data.data);
      setisopen(false);
      window.location.reload();
    } catch (err) {
      console.log("errreorrrrrrr");
    }
  };

  //Hnadle patient Delete
  const handleDelete = (id) => {
    dispatch(deletepatinetById(id));
    window.location.reload();
  };

  //get  patient BY id
  const [openforsingleData, setopenforsingleData] = useState(false);
  const [selecteddata, Setselecteddata] = useState([]);
  const handleview = (id) => {
    setopenforsingleData(!openforsingleData);
    dispatch(getPatientDataById(id));
  };
  useEffect(() => {
    Setselecteddata(getpatientID);
  }, [getpatientID]);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div>
          <div>Patients</div>
          <h1>localhost:8000/admin/getallpatient</h1>
        </div>
        <div className="text-end">
          <button
            onClick={() => setisopen(!isopen)}
            className="bg-blue-600 px-7 py-2 rounded-md mb-5 me-4"
          >
            Create +
          </button>
        </div>
        {isopen && (
          <div className="bg-slate-100 shadow-2xl rounded-md ms-10 top-20 right-[200px] absolute">
            <form
              onSubmit={handlesubmit}
              className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Patient IN:
                  </label>
                  <input
                    type="text"
                    name="pIN"
                    placeholder="Patient IN"
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.pIN}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Patient type:
                  </label>
                  <input
                    type="text"
                    name="patienttype"
                    placeholder="Patient type"
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.patienttype}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Address:
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    phone Number:
                  </label>
                  <input
                    type="text"
                    name="personal_ph_no"
                    placeholder="phone Number"
                    value={formData.personal_ph_no}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Gender:
                  </label>
                  <input
                    type="text"
                    name="sex"
                    list="genders"
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.sex}
                    onChange={handleChange}
                  />
                  <datalist id="genders">
                    <option value="Male" />
                    <option value="Female" />
                    <option value="Other" />
                  </datalist>
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Date Of Birth:
                  </label>
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">
                    Age:
                  </label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.age}
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
                  submit
                </button>
              </div>
            </form>
          </div>
        )}
        {openforsingleData && (
          <div className="bg-slate-100 shadow-2xl rounded-md ms-10 top-20 right-96 absolute px-20 py-7">
            {getpatientID.map((item) => {
              return (
                <div className="relative">
                  <div onClick={()=>setopenforsingleData(false)} className="absolute -top-3 -right-14 cursor-pointer bg-black text-white"> <X/></div>
                  <h1 className="my-3">
                    <b>PIN :</b>
                    {item.pIN}
                  </h1>
                  <h1 className="my-3">
                    <b>Patient Type:</b>
                    {item.patienttype}
                  </h1>
                  <h1 className="my-3">
                    <b>name :</b>
                    {item.name}
                  </h1>
                  <h1 className="my-3">
                    <b>address:</b>
                    {item.address}
                  </h1>
                  <h1 className="my-3">
                    <b>Phone Number:</b>
                    {item.personal_ph_no}
                  </h1>
                  <h1 className="my-3">
                    <b>Date of Birth:</b>
                    {item.dob}
                  </h1>
                  <h1 className="my-3">
                    <b>age:</b>
                    {item.age}
                  </h1>
                  <h1 className="my-3">
                    <b>Gender:</b>
                    {item.sex}
                  </h1>
                  <div className="text-center">
                      {" "}
                      <button
                        className=" mt-5 bg-blue-700 text-xl text-white rounded-md  px-3"
                        onClick={() => setopenforsingleData(false)}
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
              <th scope="col">pIN</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">phone number</th>
              <th scope="col">Gender</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {PatientsData.map((item, index) => {
              return (
                <tr>
                  <th>{item.pIN}</th>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.address}</td>
                  <td>{item.personal_ph_no}</td>
                  <td>{item.sex}</td>
                  <td>
                    <div className="flex justify-around">
                      <div
                        className="cursor-pointer text-blue-700"
                        onClick={() => handleview(item.pIN)}
                      >
                        <Eye />
                      </div>
                      <div
                        className="cursor-pointer text-green-600"
                        // onClick={() => handleUpdate(item)}
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
  );
}

export default Patients;
