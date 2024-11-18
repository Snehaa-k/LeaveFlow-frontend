import React, { useState } from 'react';
import { Calendar, TableRowsSplit, User } from 'lucide-react';
import { API_URL } from '../../../Apiservice/Apiserverce';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';


const SignUp = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  
  // const handlesign = (email) => {
  //   navigate(`/verification/${email}`);
  // };
  const [error, setError] = useState('');

  const validateForm = () => {
    // Check if any field is empty
    if (!formData.username || !formData.email || !formData.password || !formData.confirmpassword) {
      setError('Please fill in all fields.');
      return false;
    }

    // Check if email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmpassword) {
      setError('Passwords do not match.');
      return false;
    }

    // Clear previous errors if form is valid
    setError('');
    return true;
  };

  const Handlesignup = async (e) => {
    e.preventDefault(); 

    setLoading(true)
    if (!validateForm()) {
      setLoading(false);
      toast.error(`${error}`)
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/register/`, {
        username: formData.username, 
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json' 
        }
      });
      if (response) {
        navigate('/verification',{ state: { email: formData.email } });
      }

      console.log("Signup Successful:", response.data);
    } catch (error) {
      toast.error("please check your informations")
      console.error("Error during signup:", error);
      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Calendar className="h-12 w-12 text-[#4D49B3]" />
          </div>
          <h1 className="text-2xl font-bold text-[#4D49B3] mb-5">SIGN UP</h1>
        </div>
        <form className="space-y-6" onSubmit={Handlesignup}>
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="User Name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
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

          <div className="space-y-2">
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                value={formData.confirmpassword}
                onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            onClick={() => handlesign(formData.email)}
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
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <a href="#" className="font-medium text-[#4D49B3] hover:text-[#3d3a8f]"> Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
