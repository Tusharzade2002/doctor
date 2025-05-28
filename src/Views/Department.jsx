import React, { useEffect, useState } from "react";
import Sidebar from "./Component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { X, SquarePen, Eye, Trash2 ,Plus } from "lucide-react";
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
  const [deleteisopen,setdeleteisopen]=useState(false)
  const [deleteid,setdeleteid]=useState(null)
         
   const handleDelete=(id)=>{
    setdeleteisopen(true)
         setdeleteid(id)
   }
   const confirmdelete=async()=>{
         try{
               await dispatch(DeleteDepartment(deleteid)).unwrap()
         }catch(err){
           console.log("error during deletion");
             
         }finally{
            setdeleteisopen(false);
            setdeleteid(null);
            window.location.reload()
         }
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

        <div className="text-end">
          <button
            onClick={() => setIsopen(!Isopen)}
            className=" bg-blue-600  px-7 py-2 rounded-md mb-5 text-lg items-center me-4 text-white"
          >
          <h1 className="flex"> Create<Plus className="ms-1"/></h1>

          </button>
        </div>

       
        {Isopen && (
          <div className="shadow-2xl rounded-md bg-black inset-0 bg-opacity-50 z-50 fixed p-20 pt-36 ">
            <div className="bg-white p-5 rounded-2xl shadow-lg w-96 mx-auto">
              <h1 className="text-center text-xl font-bold">Department</h1>
              <div className="absolute top-0 -right-10 bg-black text-white cursor-pointer" onClick={()=>setIsopen(false)}>
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
                <button className="bg-green-700 text-white px-9 mt-2 text-xl py-1 rounded-lg">
                  Submit
                </button>{" "}
              </div>
            </div>
          </div>
        )}
        {
          viewdataopen && (
            <div className="shadow-2xl rounded-md bg-black inset-0 bg-opacity-50 z-50 fixed p-48">
            <div className="bg-white p-5 rounded-2xl shadow-lg w-96 mx-auto">
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
                  <div onClick={()=>setviewdataopen(false)} className="text-center m-5">   <button className="bg-blue-700 text-white rounded-md px-7 py-2">Cancel</button> </div>
                </div>
              )
                })
               }
            </div>
            </div>
          )
        }
        {
          deleteisopen && (
              <div className="shadow-2xl rounded-md bg-black inset-0 bg-opacity-50 z-50 fixed p-52 px-[600px]">
              <div className="bg-white  p-8 rounded-2xl shadow-lg w-64">
              <div className="text-center font-bold"> Are you sure to delete?</div>
            <div className="flex mt-7">
              <button onClick={()=>setdeleteisopen(false)} className="px-4 py-2 m-3 bg-gray-300 rounded hover:bg-gray-400" >Cancel</button>
              <button className="px-4 py-2 m-3 bg-red-600 text-white rounded hover:bg-red-700" onClick={confirmdelete}>Okay</button>
            </div>
            </div>
            </div>
          )
        }
          <div className="overflow-x-auto bg-white rounded shadow">
        <table class="table table-bordered w-full">
          <thead className="text-gray-700 bg-gray-100">
            <tr>
              <th className="px-4 py-2 border" scope="col">cIN</th>
              <th className="px-4 py-2 border" scope="col">Name</th>
              <th className="px-4 py-2 border" scope="col">Description</th>
              <th className="px-4 py-2 border" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Department.map((item, index) => {
              return (
                <tr className="hover:bg-gray-100">
                  <th className="px-4 py-2 border">{item.dIN}</th>
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.description}</td>

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

export default Department;
