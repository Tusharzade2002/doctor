import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Views/Login'
import Home from './Views/Home'
import  Registration from './Views/Registration'
import DoctorLogin from './Views/Doctor/DoctorLogin';
import DoctorRegistration from './Views/Doctor/DoctorRegistration';
import Mainpage from './Views/Mainpage';
import NotFound from './Views/NotFound';
import Dashboard from './Views/Dashboard';
import Patient from './Views/Patient';
function App() {

  return (
    
    <BrowserRouter>
    <Routes>

    <Route path="/mainpage" element={<Mainpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Registration />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/patient" element={<Patient/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctor/registration" element={<DoctorRegistration />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
 
  )
}

export default App
