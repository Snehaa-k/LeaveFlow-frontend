import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../Apiservice/Apiserverce';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const ITEMS_PER_PAGE = 3; 
const LeaveApplication = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("accessToken"); 
  const [expandedDescriptions, setExpandedDescriptions] = useState({});


  

  
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    document: null,
  });
  
  const [currentLeave, setCurrentLeave] = useState(null);
  const validateForm = () => {
    if (!formData.reason) {
      setError('Please fill in all fields.');

      return false;
    }

    
    setError('');
    return true;
  }

  const toggleModal = (leave = null) => {
    setIsModalOpen(!isModalOpen);
    
    if (leave) {
      setFormData({
        id: leave.id || '',
        type: leave.leave_type || '',
        startDate: leave.start_date || '',
        endDate: leave.end_date || '',
        reason: leave.reason || '',
        document: null, 
      });
      setCurrentLeave(leave);
    } else {
      setFormData({
        type: '',
        startDate: '',
        endDate: '',
        reason: '',
        document: null,
      });
      setCurrentLeave(null);
    }
  };


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSaveLeave = (e) => {
    e.preventDefault();

    if (currentLeave) {
      setLeaves(leaves.map((leave) =>
        leave.id === currentLeave.id ? { ...leave, ...formData } : leave
      ));
    } else {
      setLeaves([...leaves, { id: leaves.length + 1, ...formData, status: 'Pending' }]);
    }

    toggleModal();
  };
  
  
  
    useEffect(() => {
      const fetchLeaves = async () => {
        try {
          const response = await axios.get(`${API_URL}/leavelists/`,{headers: {
            Authorization: `Bearer ${token}` 
          }});
          console.log(response,"leave res");
          
          
          setLeaves(response.data.leave);
        } catch (err) {
          setError('Could not fetch leave applications');
        }
      };
  
      fetchLeaves();
    }, [token,isModalOpen]);
  

  const Handleleave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("must add reson for the leave")
      return;
    }
    const today = new Date().toISOString().split('T')[0]; 
    if (formData.startDate < today) {
      toast.error("Start date cannot be in the past.");
      return;
    }
  
    if (formData.endDate < formData.startDate) {
      toast.error("End date must be greater than or equal to the start date.");
      return;
    }

    if (formData.endDate < formData.startDate) {
      toast.error("End date must be greater than or equal to the start date.");
      return;
    }

    const hasDuplicate = leaves.some(leave =>
      leave.leave_type === formData.type &&
      leave.start_date === formData.startDate &&
      leave.end_date === formData.endDate
    );

    if (hasDuplicate) {
      toast.error("Duplicate leave request found. Please modify your dates or leave type.");
      return;
    }

    const hasOverlap = leaves.some(leave => 
      new Date(leave.end_date) >= new Date(formData.startDate)
    );

    if (hasOverlap) {
      toast.error("New leave start date must be after the end date of your last leave.");
      return;
    }

    const form = new FormData();
    form.append('leave_type', formData.type);
    form.append('start_date', formData.startDate);
    form.append('end_date', formData.endDate);
    form.append('reason', formData.reason);
    if (formData.document) {
      form.append('document', formData.document);
    }

    try {
      if (currentLeave) {
        await axios.post(`${API_URL}/editleave/${currentLeave.id}/`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${API_URL}/leaveapply/`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/lists');
      toggleModal();
      toast.success("Leave Applied")
    } catch (error) {
      console.error("Error during leave application submission:", error);
      toast.error("some thing went worng please try again")

    }
  };

  const canShowDelete = (startDate) => {
    const now = new Date();
    const startOfLeave = new Date(startDate);
    
    startOfLeave.setHours(9, 30, 0, 0);
  
    
    return now < startOfLeave;
  };

  const handleDeleteLeave = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel the trip?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });
    
    if(result.isConfirmed){
    try {
      await axios.delete(`${API_URL}/deleteleave/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeaves(leaves.filter((leave) => leave.id !== id));
    } catch (error) {
      console.error("Error deleting leave application:", error);
    }
  }
  };
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const displayedLeaves = leaves.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Leave Applications</h1>
      
      <button 
        onClick={() => toggleModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Apply for Leave
      </button>

      {/* Leave List */}
      <div className="space-y-4">
        {displayedLeaves.map((leave) => (
          <div key={leave.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm">
            <div>
              <p className="text-lg font-medium">{leave.leave_type}</p>
              <p className="text-sm text-gray-500">Start Date : {leave.start_date}</p>
              <p className="text-sm text-gray-500">End Date : {leave.end_date}</p>
              Description:
  {expandedDescriptions[leave.id] 
    ? leave.reason 
    : `${leave.reason.split(" ").slice(0, 10).join(" ")}... `}
  
  {leave.reason.split(" ").length > 10 && (
    <button 
      onClick={() => toggleDescription(leave.id)} 
      className="text-blue-500 hover:underline"
    >
      {expandedDescriptions[leave.id] ? 'Read Less' : 'Read More'}
    </button>
  )}
              {leave.document && (
      <a 
        href={`${API_URL}${leave.document}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-500 hover:underline mt-2 block"
      >
        View Document
      </a>
    )}
    <p className="text-sm text-gray-500">Status : {leave.status}</p>


            </div>
            {canShowDelete(leave.start_date) && leave.status === "pending" && (
              <button 
                className="text-red-500 hover:text-red-700 ml-[800px]"
                onClick={() => handleDeleteLeave(leave.id)}
              >
                <FaTrash />
              </button>
            )}
          {leave.status === "pending" && (
  <button 
    className="text-blue-500 hover:text-blue-700"
    onClick={() => toggleModal(leave)}
  >
    ✏️
  </button>
)}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(leaves.length / ITEMS_PER_PAGE)).keys()].map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === pageNum + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {pageNum + 1}
          </button>
        ))}
      </div>


      {/* Apply/Edit Leave Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{currentLeave ? 'Edit Leave' : 'Apply for Leave'}</h2>
            {/* Form for applying/editing leave */}
            <form onSubmit={Handleleave}>
  <label className="block mb-2">Leave Type:</label>
  <select 
    name="type" 
    className="border border-gray-300 rounded-md w-full p-2 mb-4"
    value={formData.type } // Bind value to state
    onChange={(e) => setFormData({ ...formData, type: e.target.value })} // Handle change
    required
  >
    <option value="" disabled>Select leave type</option>
    <option value="Sick Leave">Sick Leave</option>
    <option value="Casual Leave">Casual Leave</option>
    <option value="Annual Leave">Annual Leave</option>
    {/* Add more leave options as needed */}
  </select>

  <label className="block mb-2">Start Date:</label>
  <input 
    type="date" 
    name="startDate"
    className="border border-gray-300 rounded-md w-full p-2 mb-4"
    value={formData.startDate} 
    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} 
    required 
  />

  <label className="block mb-2">End Date:</label>
  <input 
    type="date" 
    name="endDate"
    className="border border-gray-300 rounded-md w-full p-2 mb-4"
    value={formData.endDate} 
    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} 
    required 
  />

  <label className="block mb-2">Reason:</label>
  <textarea 
    name="reason"
    className="border border-gray-300 rounded-md w-full p-2 mb-4"
    placeholder="Describe the reason for your leave, e.g., 'medical appointment,' 'family emergency,' etc."
    value={formData.reason} 
    onChange={(e) => setFormData({ ...formData, reason: e.target.value })} 
    required 
  />

  <label className="block mb-2">Upload Document:</label>
  <input 
    type="file" 
    name="document"
    accept=".pdf, .jpg, .jpeg, .png" 
    className="border border-gray-300 rounded-md w-full p-2 mb-4"
    onChange={(e) => setFormData({ ...formData, document: e.target.files[0] })} 
    
  />

  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
    {currentLeave ? 'Update Leave' : 'Submit'}
  </button>

  <button
    type="button"
    onClick={toggleModal}
    className="mt-2 w-full text-gray-500 hover:underline"
  >
    Cancel
  </button>
</form>

          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplication;
