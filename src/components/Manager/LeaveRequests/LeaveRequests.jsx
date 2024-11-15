import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../Apiservice/Apiserverce';

const ITEMS_PER_PAGE = 4;

const ManagerLeaveRequests = () => {
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [reload,useReload] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("accessTokenAdmin");

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/allists/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(response.data);
    } catch (err) {
      toast.error('Could not fetch leave applications');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [token,reload]);

  const handleAcceptLeave = async (id) => {
    try {
      await axios.post(`${API_URL}/api/accept/${id}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(leaves.filter((leave) => leave.id !== id));
      toast.success("Leave accepted successfully");
      setRequestModalOpen(false); 
      useReload(true)

    } catch (error) {
      toast.error("Error accepting leave application");
    }
  };

  const handleRejectLeave = async (id) => {
    try {
      await axios.post(`${API_URL}/api/reject/${id}/`, { reason: rejectionReason }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(leaves.filter((leave) => leave.id !== id));
      toast.success("Leave rejected successfully");
      setRejectModalOpen(false); 
      setRequestModalOpen(false); 
      useReload(true)
    } catch (error) {
      toast.error("Error rejecting leave application");
    }
  };

  const openRejectModal = () => {
    setRejectModalOpen(true);
    setRequestModalOpen(false);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const paginatedLeaves = leaves.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Leave Requests</h1>
      {paginatedLeaves.map((leave) => (
        <div 
          key={leave.id} 
          className="p-4 bg-gray-100 rounded-md shadow-sm mb-4 cursor-pointer w-full sm:w-[80%] md:w-[60%] lg:w-[1200px] mx-auto"
          onClick={() => {
            setSelectedLeave(leave);
            setRequestModalOpen(true);
          }}
        >
          <p><strong>Employee Name:</strong> {leave.username}</p>
          <p><strong>Leave Type:</strong> {leave.leave_type}</p>
          <p><strong>Leave Date:</strong> {leave.start_date} to {leave.end_date}</p>
          <p><strong>Status:</strong> {leave.status}</p>
        </div>
      ))}

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

      {/* Leave Request Modal */}
      {isRequestModalOpen && selectedLeave && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-[90%] md:w-[70%] lg:w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Leave Details</h2>
            <p><strong>Employee Name:</strong> {selectedLeave.username}</p>
            <p><strong>Leave Type:</strong> {selectedLeave.leave_type}</p>
            <p><strong>Leave Date:</strong> {selectedLeave.start_date} to {selectedLeave.end_date}</p>
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
                  onClick={() => handleAcceptLeave(selectedLeave.id)}
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
              onClick={() => setRequestModalOpen(false)}
              className="mt-4 text-gray-500 hover:underline w-full text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-[90%] md:w-[70%] lg:w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Rejection Reason</h2>
            <textarea 
              className="border border-gray-300 rounded-md w-full p-2 mb-4"
              placeholder="Provide reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
            />
            <button 
              onClick={() => handleRejectLeave(selectedLeave.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
            >
              Submit Rejection
            </button>
            <button 
              onClick={() => setRejectModalOpen(false)}
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
