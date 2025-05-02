import  Sidebar  from '../Views/Component/Sidebar'
import React from 'react'

function Dashboard() {
  return (
    <div className='flex'>
         <Sidebar/>
         <div>
               <h1>Dashboard</h1>
         </div>
    </div>
  )
}

export default Dashboard