import { Link } from 'react-router-dom'
import  Sidebar  from '../Views/Component/Sidebar'

function Dashboard() {
  return (
    <div className='flex'>
         <Sidebar/>
         <div >
                <div className='flex justify-center '>
                          <Link to="/consultant" className='bg-purple-500 flex flex-col justify-center items-center text-white text-2xl font-bold rounded-md min-w-56 h-52   m-3'> 
                            <p>40</p>
                            <p>Consultant</p>
                          </Link>
                           <Link to="/patients" className='bg-teal-500 flex flex-col justify-center items-center  text-white text-2xl font-bold rounded-md min-w-56 h-52   m-3'> 
                            <p>40</p>
                            <p>Patients</p>
                          </Link>
                           <Link to="/reception"   className='bg-orange-500 flex flex-col justify-center items-center  text-white text-2xl font-bold rounded-md min-w-56 h-52  m-3'> 
                            <p>40</p>
                            <p>Reception</p>
                          </Link>
                           <Link to="/department" className='bg-green-500 flex flex-col justify-center items-center  text-white text-2xl font-bold rounded-md min-w-56 h-52  m-3'> 
                            <p>40</p>
                            <p>Department</p>
                          </Link>
                 </div>
                <div>
                  <div>
                  </div>
                  <div>

                  </div>
                </div>
         </div>
    </div>
  )
}

export default Dashboard