import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
      <div className="text-center text-white p-8 rounded-lg shadow-xl bg-opacity-90 max-w-md mx-auto">
        {/* Error Icon - Blue color for the icon */}
        
        <h1 className="text-4xl font-bold mb-2">Oops! Something Went Wrong!</h1>
        <p className="text-lg mb-6">There was an issue with your request. Please try again later or contact support if the problem persists.</p>
        <button 
          onClick={() => navigate('/login')} 
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
