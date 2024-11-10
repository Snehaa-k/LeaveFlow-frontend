import React, { useState } from 'react';
import { Calendar, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../Apiservice/Apiserverce';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

const ManagerLoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const HandleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/login/`, {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        console.log(response, "yaa");
        if (response.data.admin) {
          localStorage.setItem('accessTokenAdmin', response.data.access);
          navigate('/managerdash', { state: { email: formData.email } });
          toast.success('Login Successful! Redirecting to manager dashboard.');
        } else {
          toast.error('Invalid login credentials for manager.');
        }
      }
      setLoading(false);

      console.log("Login Successful:", response.status);
    } catch (error) {
      console.error("Error during login:", error.response?.data?.error);
      toast.error(`${error.response?.data?.error}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Calendar className="h-12 w-12 text-[#4D49B3]" />
          </div>
          <h1 className="text-2xl font-bold text-[#4D49B3] mb-5">Manager LOGIN</h1>
        </div>

        <form className="space-y-6" onSubmit={HandleLogin}>
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <User className="h-5 w-5 text-gray-400" /> */}
              </div>
              <input
                type="email"
                placeholder="Manager Email Address"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <Lock className="h-5 w-5 text-gray-400" /> */}
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#4D49B3] hover:bg-[#3d3a8f] text-white py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {loading ? (
              <div className="loading-spinner ml-[150px]">
                <ThreeDots
                  visible={true}
                  height="40"
                  width="80"
                  color="white"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          
        </div>
      </div>
    </div>
  );
};

export default ManagerLoginPage;
