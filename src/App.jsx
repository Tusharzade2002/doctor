import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Views/Login'
import Home from './Views/Consultant'
import  Registration from './Views/Registration'
// import DoctorLogin from './Views/Doctor/DoctorLogin';
// import DoctorRegistration from './Views/Doctor/DoctorRegistration';
import Mainpage from './Views/Mainpage';
import NotFound from './Views/NotFound';
import Dashboard from './Views/Dashboard';
import Patient from './Views/Patient';
import Appointment from './Views/Appointment';
import PatientDetail from './Views/PatientDetail';
import Department from './Views/Department';
import Receptionlist from './Views/Receptionlist';
function App() {

  return (
    
    <BrowserRouter>
    <Routes>

    <Route path="/mainpage" element={<Mainpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Registration />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/patient" element={<Patient/>} />
      <Route path="/appointment" element={<Appointment/>} />
      <Route path="/consultant" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/patientdetail" element={<PatientDetail />} /> 
       <Route path="/department" element={<Department />} />
       <Route path="/receptionlist" element={<Receptionlist/>} />

      {/* <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctor/registration" element={<DoctorRegistration />} /> */}
    
    </Routes>
  </BrowserRouter>
 
  )
}

export default App
