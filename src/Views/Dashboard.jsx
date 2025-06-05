import { Link } from 'react-router-dom'
import  Sidebar  from '../Views/Component/Sidebar'
import axios from 'axios'
import {  useEffect,useState } from 'react';

function Dashboard() {
  const [consultant, setConsultant] = useState(0);
  const [reception, setReception] = useState(0);
  const [department, setDepartment] = useState(0);
  const [patients, setPatients] = useState(0);
    const getconsultantlength =async () => {
      try{
      const response =await axios.get('http://localhost:8000/admin/getconsultantlength');
      // console.log(response.data.total);
      setConsultant(response.data.total);
    }catch(error){
      console.error(error);
    }
    }
    const getReceptionLength =async () => {
      try{
      const response =await axios.get('http://localhost:8000/admin/getreceptionistlength');
      // console.log(response.data.total);
         setReception(response.data.total);
    }catch(error){
      console.error(error);
    }
    }
    const getDepartmentLength =async () => {
      try{
      const response =await axios.get('http://localhost:8000/admin/getdepartmentlength');
      // console.log(response.data.total);
      setDepartment(response.data.total);
    }
    catch(error){
      console.error(error);
    }
  }
  const getPatientLength =async () => {
    try{
      const response =await axios.get('http://localhost:8000/admin/getpatientlength');
      // console.log(response.data.total);
      setPatients(response.data.total);
    }
    catch(error){

      console.error(error); 
    }
  }

    useEffect(() => {
    getconsultantlength();
    getReceptionLength();
    getDepartmentLength();
    getPatientLength();
    }, []);
  return (
    <div className='flex'>
         <Sidebar />
         
         <div >
                <div className='flex justify-center '>
                          <Link to="/consultant" className='bg-purple-500 flex flex-col justify-center items-center text-white text-2xl font-bold rounded-md min-w-56 h-52   m-3'> 
                            <p>{consultant}</p>
                            <p>Consultant</p>
                          </Link>
                           <Link to="/patients" className='bg-teal-500 flex flex-col justify-center items-center  text-white text-2xl font-bold rounded-md min-w-56 h-52   m-3'> 
                            <p>{patients}</p>
                            <p>Patients</p>
                          </Link>
                           <Link to="/reception"   className='bg-orange-500 flex flex-col justify-center items-center  text-white text-2xl font-bold rounded-md min-w-56 h-52  m-3'> 
                            <p>{reception}</p>
                            <p>Reception</p>
                          </Link>
                           <Link to="/department" className='bg-green-500 flex flex-col justify-center items-center  text-white text-2xl font-bold rounded-md min-w-56 h-52  m-3'> 
                            <p>{department}</p>
                            <p>Department</p>
                          </Link>
                 </div>
                <div>
                
                </div>
         </div>
    </div>
  )
}

export default Dashboard