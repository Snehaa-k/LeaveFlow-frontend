import React, { useState } from 'react';
import { Calendar, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../Apiservice/Apiserverce';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const HandleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(`${API_URL}/login/`, {
        email: formData.email,
        password: formData.password,
      });
      if (response.status == 200) {
        console.log(response,"yaa");
        if(response.data.admin){
        
        localStorage.setItem('accessTokenAdmin', response.data.access);
        navigate('/managerdash',{ state: { email: formData.email } });
        toast.success('Login Successful! Redirecting to manager dashboard.');
        }
        else{
          if(response.data.user.is_verified === true){
          localStorage.setItem('accessToken', response.data.access);
          navigate('/dashbord',{ state: { email: formData.email } });
          toast.success('Login Successful! Redirecting to manager dashboard.');

          }else{
            toast.error('Please Verify');

            console.log("verification needed");
            navigate('/verification')
            
          }
          
        }
      }

      console.log("Signup Successful:", response.status);
    } catch (error) {
      console.error("Error during signup:", error.response.data.error);
      toast.error(`${error.response.data.error}`)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md">
      
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-[#4D49B3]" />
              </div>
              <h1 className="text-2xl font-bold text-[#4D49B3] mb-5">LOGIN</h1>
            </div>
          {/* </CardHeader>
          <CardContent> */}
            <form  className="space-y-6" onSubmit={HandleLogin}>

               
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D49B3] focus:border-transparent outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
              </div>
             

              <div className="flex items-center justify-between">
               
               
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#4D49B3] hover:bg-[#3d3a8f] text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Alredy have an account ?</span>
              <a href="#" className="font-medium text-[#4D49B3] hover:text-[#3d3a8f]">
                Sign Up 
              </a>
            </div>
          {/* </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default LoginPage;