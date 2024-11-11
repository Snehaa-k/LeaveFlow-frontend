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
import { HelpDesk } from './pages/HelpDesk/HelpDesk';
import ManagerLoginPage from './components/Manager/mangeLogin/Managerlogin';
import Userloginprotected from './pages/UserProtectedRoute';
import ProtectedRoute from './pages/UserHomeProtectedRoute';
import AdminprotectedRoute from './pages/AdminProtectedRoute';
import ErrorPage from './pages/error/ErrorPage';

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
                  <Userloginprotected>
                    <Navigate to="/login" />
                    </Userloginprotected>
                  
                }
              />
      <Route path="/:mode" element={<Home />} />
      <Route path="/dashbord" element={<ProtectedRoute><Dashbord/></ProtectedRoute>} />
      <Route path="/requests" element={<Request/>} />
      <Route path="/lists" element={<ProtectedRoute><LeaveList/></ProtectedRoute>} />
      <Route path="/verification" element={<OtpVerificationPage/>} />
      <Route path="/managerdash" element={<AdminprotectedRoute><DashbordManager/></AdminprotectedRoute>} />
      <Route path="/help" element={<HelpDesk/>} />
      <Route path="/mlog" element={<AdminprotectedRoute><ManagerLoginPage/></AdminprotectedRoute>} />
      <Route path="*" element={<ErrorPage/>} />



      

      
      </Routes>
      </Router>

      
      
       


      </div>
      
    </>
  )
}

export default App
