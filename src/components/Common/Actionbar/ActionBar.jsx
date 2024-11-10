import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

const Action = ({ navItems }) => {
  const  usertoken = localStorage.getItem("accessToken")
   const   admintoken = localStorage.getItem("accessTokenAdmin")
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = () => {
    localStorage.clear();
    if(usertoken){

    navigate('/login');
    }
    else{
      navigate('/mlog')
    }
  };

  return (
    <div>
      {/* Header with Toggle Button for screens smaller than 900px */}
      <div className="lg:hidden p-4 bg-blue-500 text-white flex items-center">
        <h1 className="text-lg font-bold">LEAVE</h1>
        <button onClick={toggleMenu} className="ml-auto text-white">
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`bg-blue-500 text-white p-6 flex flex-col space-y-4 fixed top-0 left-0 z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:relative lg:translate-x-0
          w-full lg:w-64 h-full lg:h-[729px]`}
      >
        <h1 className="text-2xl font-bold mb-10 hidden lg:block">LEAVE APP</h1>
        
        <nav className="space-y-2 w-full">
          {navItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <div
                className="flex items-center p-2 rounded-md cursor-pointer hover:bg-blue-600 font-normal text-sm sm:text-base"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-3 text-xl" />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div
          onClick={handleLogout}
          className="flex items-center p-2 rounded-md cursor-pointer hover:bg-blue-600 font-normal text-sm sm:text-base mt-auto"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          <span>Logout</span>
        </div>
      </div>

      {/* Overlay for smaller screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default Action;
