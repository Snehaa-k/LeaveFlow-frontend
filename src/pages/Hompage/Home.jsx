import React from 'react';
import { Calendar, ChevronRight, Clock, FileText, Users, Menu } from 'lucide-react';
import LoginPage from '../../components/Common/LoginPage/LoginPage';
import SignUp from '../../components/employe/Signup/SignUp';
import { useNavigate, useParams } from 'react-router-dom';

const Home = () => {
  const {mode} = useParams();
  const navigate = useNavigate()
  const renderContent = () => {
    if (mode === "login") {
      return <LoginPage/>;
    } else if (mode == "signup") {
      return <SignUp/>;
   
    } else {
      return <LoginPage/>;
    }
  };

  const handleToggle = () => {
    if (mode === "signup") {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side - Blue */}
      <div className="w-full lg:w-1/2 bg-[#4D49B3] p-4 lg:p-8 flex flex-col justify-between min-h-[4vh] lg:min-h-screen">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              <h1 className="text-xl lg:text-2xl font-bold text-white">LeaveFlow</h1>
            </div>
            {/* Mobile Menu Button */}
            <button variant="ghost" className="lg:hidden text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Main Content */}
          <div className="mt-8 lg:mt-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Manage Your Leaves
              <br />With Ease
            </h2>
            <p className="text-gray-200 text-base lg:text-lg mb-6 lg:mb-8">
              Streamline your leave management process with our intuitive platform.
              Track, apply, and manage leaves efficiently.
            </p>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 lg:mt-8">
              {/* <Card className="p-4 bg-white/10 backdrop-blur-lg border-none">
                <Clock className="h-6 w-6 text-white mb-2" />
                <h3 className="text-white font-semibold">Quick Apply</h3>
                <p className="text-gray-200 text-sm">Apply for leaves in seconds</p>
              </Card>
              
              <Card className="p-4 bg-white/10 backdrop-blur-lg border-none">
                <FileText className="h-6 w-6 text-white mb-2" />
                <h3 className="text-white font-semibold">Track Status</h3>
                <p className="text-gray-200 text-sm">Real-time application status</p>
              </Card> */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 lg:mt-auto">
          <p className="text-gray-200 text-sm">© 2024 LeaveFlow. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - White */}
      <div className="w-full lg:w-1/2 bg-white p-4 lg:p-8 flex flex-col">
        {/* Top Navigation */}
        <div className="flex justify-end space-x-2 lg:space-x-4">
          {/* <button onClick={()=>navigate('/help')} variant="ghost" className="text-gray-600 text-sm lg:text-base">Help</button> */}
          {/* <button variant="ghost" className="text-gray-600 text-sm lg:text-base">Contact</button> */}
          <button onClick={handleToggle} className="px-4 py-2 bg-[#4D49B3] text-white rounded">
          {mode === "signup" ? "Login" : "Sign Up"}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full py-6 lg:py-0">
            {renderContent()}
            
         

          {/* Action Buttons */}
          <div className="space-y-3 lg:space-y-4">
            {/* {['Apply for Leave', 'View Leave Balance', 'Leave History', 'Team Calendar'].map((text) => (
              <button
                key={text}
                variant="outline"
                className="w-full justify-between hover:bg-[#4D49B3] hover:text-white group text-sm lg:text-base"
              >
                {text}
              </button>
            ))} */}
          </div>

          {/* Team Overview Card */}
          <div className="mt-6 lg:mt-8">
            {/* <Card className="p-4 border-[#4D49B3] border">
              <div className="flex items-center space-x-4">
                <div className="bg-[#4D49B3]/10 p-2 lg:p-3 rounded-full">
                  <Users className="h-5 w-5 lg:h-6 lg:w-6 text-[#4D49B3]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm lg:text-base">Team Overview</h3>
                  <p className="text-xs lg:text-sm text-gray-600">View your team's leave schedule</p>
                </div>
              </div>
            </Card> */}
          </div>
        </div>

        {/* Bottom Support Text */}
        <div className="mt-6 lg:mt-auto text-center">
          <p className="text-xs lg:text-sm text-gray-500">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;