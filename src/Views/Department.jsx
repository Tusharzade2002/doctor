import React, { useEffect, useState } from "react";
import Sidebar from "./Component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { X, SquarePen, Eye, Trash2 } from "lucide-react";
import { getAllDepartment ,RegisterDepartment,DeleteDepartment,GetDepartmentByID, updatedepartmentBYid} from "../Store/Registration/RegistrationThunk";
function Department() {
  const [Isopen, setIsopen] = useState(false);
  const [isEditing,setisEditing]=useState(false);
  const [editingId,seteditingId]=useState(null);
  const dispatch = useDispatch();
  const { Department ,DepartmentByid} = useSelector((state) => state.user);
  // get All Department
  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);
  // console.log(Department);

  // register Department

  const [formdata, setformdata] = useState({
    dIN: "",
    name: "",
    description: "",
  });

  const handlesubmit = async(e) => {
    e.preventDefault()
   
  try{
    if(isEditing){

    await dispatch(updatedepartmentBYid({id:editingId,updateData :formdata})).unwrap()
    setIsopen(false)
    window.location.reload();
    }else {
      await dispatch(RegisterDepartment(formdata)).unwrap()
         setformdata({
          dIN:"",
          name:"",
          description:""
         });
         setIsopen(!viewdataopen),setisEditing(false);
         seteditingId(null);
         dispatch(getAllDepartment())
    }
    

  }catch(err){
       console.log("error to post department");
  }
  };

  // delete Department
   const handleDelete=(id)=>{
           dispatch(DeleteDepartment(id));
           window.location.reload()
   }

// GET deparment by id
const  [viewdataopen,setviewdataopen]=useState(false)
const [getdatabyrid,setgetdatabyrid]=useState([])
   const handleview=(dIN)=>{
          setviewdataopen(!viewdataopen)    
          dispatch(GetDepartmentByID(dIN))  
   };
   useEffect(()=>{
    setgetdatabyrid(DepartmentByid)
   },[DepartmentByid])

  //  console.log(DepartmentByid);
   
  //update Department byId
  
     const handleUpdate=(item)=>{
         setformdata({
          dIN:item.dIN || "",
          name:item.name || "",
          description:item.description || ""
         })
         setIsopen(true)
         setisEditing(true)
         seteditingId(item._id)
        //  seteditingId(item._id == item._id)
     }
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full relative">
        <div>Department</div>
        <h1>http://localhost:8000/admin/alldepartment</h1>
        <h1>http://localhost:8000/admin/createdepartment</h1>

        <div onClick={() => setIsopen(!Isopen)} className="text-end me-6 mb-2">
          <button className="bg-blue-700 px-8 py-2 rounded-lg">Create +</button>
        </div>
        {Isopen && (
          <div className="bg-white absolute top-28 right-56 shadow-lg ">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 my-5 mx-16 relative">
              <h1 className="text-center text-xl font-bold">Department</h1>
              <div className="absolute top-0 -right-10 bg-black text-white">
                <X />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  dIN
                </label>
                <input
                  type="text"
                  name="dIN"
                  placeholder="dIN"
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formdata.dIN}
                  onChange={(e) =>
                    setformdata({
                      ...formdata,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
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
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formdata.description}
                  onChange={(e) =>
                    setformdata({
                      ...formdata,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              <div onClick={handlesubmit} className="text-center">
                <button className="bg-blue-600 px-9 text-xl py-1 rounded-lg">
                  Submit
                </button>{" "}
              </div>
            </div>
          </div>
        )}
        {
          viewdataopen && (
            <div className="bg-white absolute top-28 right-56 shadow-lg px-10 py-3">
               {
                getdatabyrid.map((item)=>{
              return(
                <div>
                 <h1 className="text-xl m-2">
                      <b>DIN:</b>
                      {item.dIN}
                    </h1>
                    <h1 className="text-xl m-2">
                      <b>Name:</b>
                      {item.name}
                    </h1>
                    <h1 className="text-xl m-2">
                      <b>Desription:</b>
                      {item.description}
                    </h1>
                  <div onClick={()=>setviewdataopen(false)} className="text-center m-5">   <button className="bg-blue-500 px-5 py-1">Cancel</button> </div>
                </div>
              )
                })
               }
            </div>
          )
        }
        <table class="table table-bordered w-full">
          <thead>
            <tr>
              <th scope="col">cIN</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Department.map((item, index) => {
              return (
                <tr>
                  <th>{item.dIN}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>

                  <td>
                    <div className="flex justify-around">
                      <div
                        className="cursor-pointer text-blue-700"
                        onClick={() => handleview(item.dIN)}
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
  );
}

export default Department;
