import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Views/Login'
import Home from './Views/Home'
import  Registration from './Views/Registration'
import DoctorLogin from './Views/Doctor/DoctorLogin';
import DoctorRegistration from './Views/Doctor/DoctorRegistration';
import AdminconsultantData from './Views/AdminconsultantData';
function App() {

  return (
    <div className=' -mx-9 -my-8'>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Registration />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctor/registration" element={<DoctorRegistration />} />
      <Route path="/admin/consultantdata" element={<AdminconsultantData/>} />


    </Routes>
  </BrowserRouter>
  </div>
  )
}

export default App
