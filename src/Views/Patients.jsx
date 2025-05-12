import React, { use, useEffect, useState } from "react";
import Sidebar from "./Component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  addpatient,
  getallPatient,
  deletepatinetById,
  getPatientDataById,
  updatePatientDataById,
} from "../Store/Registration/RegistrationThunk";
import { Eye, Trash2, SquarePen, X, Plus } from "lucide-react";
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
    dob: "",
    age: "",
    sex: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(
          updatePatientDataById({ id: editingId, updateData: formData })
        ).unwrap();
        setopenforsingleData(false);
        window.location.reload();
      } else {
        await dispatch(addpatient(formData)).unwrap();
        // console.log(response.data.data);
        window.location.reload();
        setformData({
          pIN: "",
          patienttype: "",
          name: "",
          personal_ph_no: "",
          dob: "",
          age: "",
          sex: "",
        });
        // setopenforsingleData(!openforsingleData);
        setisopen(!isopen);
        setisEditing(false), editingId(null), dispatch(getallPatient());
        window.location.reload();
      }
    } catch (err) {
      console.log("errreorrrrrrr");
    }
  };

  //Hnadle patient Delete
  const [deleteopen, setdeleteopen] = useState(false);
  const [deleteid, setdeleteid] = useState(null);
  const handleDelete = (id) => {
    setdeleteopen(true);
    setdeleteid(id);
  };
   const confirmDelete=async()=>{
            try{
                await dispatch(deletepatinetById(deleteid)).unwrap()
                setdeleteopen(true)
            }catch(err){
                console.log("ereor during deletion");
            }finally{
                 setdeleteopen(false)
                 setdeleteid(null)
                 window.location.reload();
            }
   }


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

  // Handle  update
  const [isEditing, setisEditing] = useState(false);
  const [editingId, seteditingId] = useState(null);
  const handleUpdate = (item) => {
    setisopen(true);
    setisEditing(true);
    seteditingId(item._id || item.id);
    setformData({
      pIN: item.pIN || "",
      patienttype: item.patienttype || "",
      name: item.name || "",
      address: item.address || "",
      personal_ph_no: item.personal_ph_no || "",
      age: item.age || "",
      sex: item.sex || "",
      dob: item.dob || "",
    });
  };

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
            className=" bg-blue-600  px-7 py-2 rounded-md mb-5 text-lg items-center me-4 text-white"
          >
            <h1 className="flex">
              {" "}
              Create
              <Plus className="ms-1" />
            </h1>
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
                  <input
                    type="text"
                    name="pIN"
                    placeholder="Patient IN"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.pIN}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="patienttype"
                    placeholder="Patient type"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.patienttype}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="personal_ph_no"
                    placeholder="phone Number"
                    value={formData.personal_ph_no}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="sex"
                    list="genders"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-end mt-3">
                <button
                  type="submit"
                  onClick={() => setisopen(false)}
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
        )}
        {openforsingleData && (
          <div className="bg-slate-100 shadow-2xl rounded-md ms-10 top-20 right-96 absolute px-20 py-7">
            {getpatientID.map((item) => {
              return (
                <div className="relative">
                  <div
                    onClick={() => setopenforsingleData(false)}
                    className="absolute -top-3 -right-14 cursor-pointer bg-black text-white"
                  >
                    {" "}
                    <X />
                  </div>
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
        {deleteopen && (
          <div className="bg-slate-100 shadow-2xl rounded-md ms-10 top-56 right-[500px] absolute p-10">
            <div className="text-center font-bold">
              {" "}
              Are you sure to delete?
            </div>
            <div className="flex  mt-7">
              <button
                onClick={() => setShowDeleteDialog(false)}
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
        )}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table class="table table-bordered w-full">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="px-4 py-2 border" scope="col">
                  pIN
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
              {PatientsData.map((item, index) => {
                return (
                  <tr className="hover:bg-gray-50">
                    <th className="px-4 py-2 border">{item.pIN}</th>
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">{item.age}</td>
                    <td className="px-4 py-2 border">{item.address}</td>
                    <td className="px-4 py-2 border">{item.personal_ph_no}</td>
                    <td className="px-4 py-2 border">{item.sex}</td>
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
                          onClick={() => handleUpdate(item)}
                        >
                          <SquarePen />
                        </div>
                        <div
                          className="cursor-pointer text-red-700 "
                          onClick={() => handleDelete(item._id || item.id)}
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

export default Patients;
