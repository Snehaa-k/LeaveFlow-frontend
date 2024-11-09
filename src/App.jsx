import { useState } from 'react'
import './App.css'
import Home from './pages/Hompage/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Dashbord } from './pages/Dashbord/Dashbord';
import { LeaveList } from './pages/ListPage/LeaveList';
import Request from './pages/Manager/Requests/Request';
import OtpVerificationPage from './pages/Otpverification/Otpverification';
import DashbordManager from './pages/Manager/DashboardManager/DashbordManager';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  

  return (
    <>
      <div>
      <ToastContainer position="top-right" /> 
      <Router>
      <Routes>
      <Route
           path="/"
                element={
                  
                    <Navigate to="/login" />
                  
                }
              />
      <Route path="/:mode" element={<Home />} />
      <Route path="/dashbord" element={<Dashbord/>} />
      <Route path="/requests" element={<Request/>} />
      <Route path="/lists" element={<LeaveList/>} />
      <Route path="/verification" element={<OtpVerificationPage/>} />
      <Route path="/managerdash" element={<DashbordManager/>} />



      

      
      </Routes>
      </Router>

      
      
       


      </div>
      
    </>
  )
}

export default App
