import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../Apiservice/Apiserverce";
import { toast } from "react-toastify";

const OtpVerificationPage = () => {
  // const { email } = useParams(); 
  const location = useLocation();
  const email = location.state?.email;
  
  console.log(email, "email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {
    if (otp.every((digit) => digit.length === 1)) {
      const otpCode = otp.join("");
      setLoading(true)
      try {
        const response = await axios.post(`${API_URL}/verification/`, {
          email: email,
          otp: otpCode,
        });
        if (response.data.message) {
          
          navigate("/dashboard");
          toast.success("verified sucussfully")
        }

        console.log("Verification Successful:", response.data);
      } catch (error) {
        console.error("Error during verification:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400 p-5">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
          OTP Verification
        </h2>

        <div className="flex justify-center space-x-2">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              value={value}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              maxLength="1"
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md"
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleVerify}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md focus:outline-none"
          >
            {loading ? (
              <ThreeDots
                visible={true}
                height="40"
                width="80"
                color="white"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
