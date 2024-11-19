import React, { useEffect, useState } from 'react';
import './calenderdesign.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegCalendarCheck } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../../../Apiservice/Apiserverce';

const LeaveCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [leaves, setLeaves] = useState([]);

  console.log(leaves,"leave status");
  
  const token = localStorage.getItem("accessToken");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${API_URL}/leavelists/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response, "leave res");
        setLeaves(response.data.leave);
      } catch (err) {
        console.error('Could not fetch leave applications');
      }
    };

    fetchLeaves();
  }, [token]);

  // Utility function to generate all dates between two dates
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const tileContent = ({ date, view }) => {
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0);
    const formattedDate = localDate.toISOString().split('T')[0];

    // Check if any leave covers this date
    const leave = leaves.find((leave) => {
      if (leave.status !== 'accepted') return false; 
      const leaveStartDate = new Date(leave.start_date);
      const leaveEndDate = new Date(leave.end_date);
      leaveStartDate.setHours(0, 0, 0, 0);
      leaveEndDate.setHours(0, 0, 0, 0);
      
      // Check if the current date is within the leave range
      return formattedDate >= leaveStartDate.toISOString().split('T')[0] &&
             formattedDate <= leaveEndDate.toISOString().split('T')[0];
    });

    if (leave) {
      return (
        <div className="leave-status">
          <FaRegCalendarCheck className="text-blue-500" />
          <span className="text-xs">{leave.leave_type}</span>
        </div>
      );
    }
    return null;
  };

  // Function to mark all dates between start_date and end_date as "leave taken"
  const tileClassName = ({ date }) => {
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0);
    const formattedDate = localDate.toISOString().split('T')[0];

    // Check if any leave covers this date
    const isLeaveTaken = leaves.some((leave) => {
      const leaveStartDate = new Date(leave.start_date);
      const leaveEndDate = new Date(leave.end_date);
      leaveStartDate.setHours(0, 0, 0, 0);
      leaveEndDate.setHours(0, 0, 0, 0);

      return formattedDate >= leaveStartDate.toISOString().split('T')[0] &&
             formattedDate <= leaveEndDate.toISOString().split('T')[0];
    });

    return isLeaveTaken ? 'leave-taken' : '';
  };

  return (
    <div className="leave-calendar-container p-4 max-w-screen-lg mx-auto">
      <div className="calendar-wrapper">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default LeaveCalendar;
