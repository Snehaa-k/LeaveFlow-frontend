import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaEdit } from 'react-icons/fa'; 
import { API_URL } from '../../../Apiservice/Apiserverce';
import { toast } from 'react-toastify';
const ProfileCard = () => {
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/128"); 
  const [profile,setProfile] = useState('')
  const [file, setFile] = useState(null); 
  const [isUploading, setIsUploading] = useState(false);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const token = localStorage.getItem("accessToken"); 
  console.log(profilePic,"pro")

  


  const handleImageChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0]; 
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); 
        setProfile(reader.result)
        setFile(selectedFile); 
      };
      reader.readAsDataURL(selectedFile); 
    } else {
      console.error("No file selected or file type is invalid.");
    }
  };

  const uploadImage = async () => {
    // if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setIsUploading(true)

    try {
      const response = await axios.post(`${API_URL}/profileupload/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
         },
      });
      toast.success("Your Profile Is Updated")
      setIsUploading(false)
      console.log(response.data.message); 
    } catch (error) {
      console.error(error.response?.data?.error || 'Image upload failed');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      
      try {
        const response = await axios.get(`${API_URL}/profileview/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setProfilePic(response.data.profile_image);
        setEmail(response.data.email);
        setUsername(response.data.username)
        setIsUploading(false)
        
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data?.error || 'An error occurred');
      }
    };
    fetchProfile();

  }, [token]);


  return (
    <div className="bg-white max-w-xs mx-auto md:mx-0 rounded-lg shadow-lg p-6 flex flex-col items-center">
      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
        {profile && ( <img
    src={profilePic}
    alt="Profile"
    className="w-full h-full object-cover"
  />) }
      {profilePic && profilePic !== 'https://via.placeholder.com/128' ? (
  <img
    src={`${API_URL}${profilePic}`}
    alt="Profile"
    className="w-full h-full object-cover"
  />
) : (
  <img
    src={profile || "https://via.placeholder.com/128"}
    alt="Placeholder"
    className="w-full h-full object-cover"
  />
)}
        {/* Edit Icon */}
        <label htmlFor="file-upload" className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-300">
          <FaEdit size={16} />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <h2 className="text-xl font-bold mt-2 text-center">{username}</h2>
      <p className="text-gray-500 text-center mt-1">{email}</p>
      {profilePic && (
        <button
          onClick={uploadImage}
          className={`mt-4 px-4 py-2 rounded-lg text-white ${isUploading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} transition-colors duration-300`}
          // disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      )}

      <div className="flex justify-center space-x-4 mt-4">
        <a
          href="https://www.linkedin.com/in/tiffanygutman"
          className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
          aria-label="LinkedIn"
        >
        </a>
        <a
          href="https://github.com/tiffanygutman"
          className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          aria-label="GitHub"
        >
        </a>
        <a
          href="mailto:tiffanydesign@example.com"
          className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          aria-label="Email"
        >
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
