import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../Apiservice/Apiserverce';
import { toast } from 'react-toastify';

const ManagerLeaveRequests = ({ leaveRequests }) => {
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [confirm,setIsconform] = useState(false)
  const [error,setError] = useState(null)
  const [leaves,setLeaves] = useState([])
  console.log(leaves,"leaves");
  
  const token = localStorage.getItem("accessTokenAdmin"); 

  const openRequestModal = (leave) => {
    setSelectedLeave(leave);
    setRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setRequestModalOpen(false);
    setSelectedLeave(null);
  };

  const openRejectModal = () => {
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setRejectionReason('');
  };

  const handleAcceptLeave = (leaveId) => {
    // Logic to accept leave request
    closeRequestModal();
  };

  const handleRejectLeave = (leaveId) => {
    // Logic to reject leave request with reason
    console.log(`Rejected leave ID: ${leaveId} for reason: ${rejectionReason}`);
    closeRejectModal();
    closeRequestModal();
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${API_URL}/allists/`,{headers: {
          Authorization: `Bearer ${token}` 
        }});
        console.log(response,"leave res");
        
        
        setLeaves(response.data);
        console.log(leaves,"leaves.......");
        
      } catch (err) {
        setError('Could not fetch leave applications');
      }
    };

    fetchLeaves();
  }, [token,confirm]);

  const HandleAccept = async (id) => {
    try {
      await axios.post(`${API_URL}/accept/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeaves(leaves.filter((leave) => leave.id !== id));
      setIsconform(true)
      
      toast.success("Status Updated")
    } catch (error) {
      console.error("Error deleting leave application:", error);
    }
  };
  const HandleReject = async (id) => {
    try {
      await axios.post(`${API_URL}/reject/${id}/`,rejectionReason, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeaves(leaves.filter((leave) => leave.id !== id));
      setIsconform(true)

      closeRequestModal()

      toast.success("Status Updated")

    } catch (error) {
      console.error("Error deleting leave application:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Leave Requests</h1>
      {leaves?.map((leave) => (
        <div 
          key={leave.id} 
          className="p-4 bg-gray-100 rounded-md shadow-sm mb-4 cursor-pointer w-[1200px]"
          onClick={() => openRequestModal(leave)}
        >
          <p><strong>Employee Name:</strong> {leave.username}</p>
          <p><strong>Leave Type:</strong> {leave.leave_type}</p>
          <p><strong>Leave Date:</strong> {leave.start_date} <h5 className='text-orange-800 size-min'>to</h5> {leave.end_date}</p>
          <p><strong>Status:</strong> {leave.status}</p>
        </div>
      ))}

      {/* Leave Request Modal */}
      {isRequestModalOpen && selectedLeave && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Leave Details</h2>
            <p><strong>Employee Name:</strong> {selectedLeave.username}</p>
            <p><strong>Leave Type:</strong> {selectedLeave.leave_type}</p>
            <p><strong>Leave Date:</strong> {selectedLeave.start_date}  to {selectedLeave.end_date} </p>
            <p><strong>Reason:</strong> {selectedLeave.reason}</p>
            {selectedLeave.document && (
      <a 
        href={`${API_URL}${selectedLeave.document}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-500 hover:underline mt-2 block"
      >
        View Document
      </a>
    )}


{selectedLeave.status === "pending" && (
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => HandleAccept(selectedLeave.id)}
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  <FaCheck className="mr-2" /> Accept
                </button>
                <button 
                  onClick={openRejectModal}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  <FaTimes className="mr-2" /> Reject
                </button>
              </div>
            )}
            <button 
              onClick={closeRequestModal}
              className="mt-4 text-gray-500 hover:underline w-full text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Rejection Reason</h2>
            <textarea 
              className="border border-gray-300 rounded-md w-full p-2 mb-4"
              placeholder="Provide reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
            />
            <button 
              onClick={() => HandleReject(selectedLeave.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
            >
              Submit Rejection
            </button>
            <button 
              onClick={closeRejectModal}
              className="mt-2 text-gray-500 hover:underline w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerLeaveRequests;
