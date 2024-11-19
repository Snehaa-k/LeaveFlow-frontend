import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; 
import axios from 'axios';
import { API_URL } from '../../../Apiservice/Apiserverce';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const localizer = momentLocalizer(moment);

const EmployeeLeaveCalendar = () => {
  const [employees, setEmployees] = useState([]);
  const [totalemp,setTotal] = useState(0)
  const [totalpendings,setPendings] = useState(0)
  const [filteredUsers, setFilteredUsers] = useState([]);
  console.log(employees,"dataaa");
  
  const [leaveData, setLeaveData] = useState({
    labels: ['Sick Leave', 'Annual Leave', 'Casual Leave'],
    datasets: [
      {
        label: 'Number of Leaves',
        data: [0, 0, 0],  
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107'],
      },
    ],
  });
  console.log(employees,"haii");
  
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [events, setEvents] = useState([]);
  const [error,setError] = useState()
  const token = localStorage.getItem("accessTokenAdmin"); 
  
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/calenderview/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response, "leave res");
        const leaveTypeCounts = {
            'Sick Leave': 0,
            'Annual Leave': 0,
            'Casual Leave': 0,
          };
      
          response.data.users.forEach(user => {
            user.leaves.forEach(leave => {
              if (leaveTypeCounts.hasOwnProperty(leave.leave_type)) {
                leaveTypeCounts[leave.leave_type]++;
              }
            });
          });
      
          setLeaveData(prevData => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: [
                  leaveTypeCounts['Sick Leave'],
                  leaveTypeCounts['Annual Leave'],
                  leaveTypeCounts['Casual Leave'],
                ],
              },
            ],
          }));
          setLeaveData(prevData => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: [
                  leaveTypeCounts['Sick Leave'],
                  leaveTypeCounts['Annual Leave'],
                  leaveTypeCounts['Casual Leave'],
                ],
              },
            ],
          }));

        setEmployees(response.data.users);
        setTotal(response.data.total_employees)
        setPendings(response.data.total_pending_approvals)

        const allEvents = response.data.users.flatMap((employee) =>
          employee.leaves
            .filter((leave) => leave.status === 'accepted') 
            .map((leave) => ({
              title: `${employee.name} - ${leave.type}`,
              start: new Date(leave.start),
              end: new Date(leave.end),
              allDay: true,
            }))
        );
        setEvents(allEvents);
      } catch (err) {
        console.error('Error fetching leave applications:', err);
        setError('Could not fetch leave applications');
      }
    };

    fetchLeaves();
  }, [ token]);

  const handleEmployeeClick = (employee) => {
   
    
    setSelectedEmployee(employee);
    
    const employeeEvents = employee.leaves
    .filter((leave) => leave.status === "accepted")
    .map((leave) => ({
      title: `${leave.leave_type}`,
      start: new Date(leave.start_date),
      end: new Date(leave.end_date),
      allDay: true,
    }));
    console.log(employeeEvents,"ya");
    
    setEvents(employeeEvents);
  };

  



  return (
    <div className="container mx-auto p-4 grid lg:grid-cols-12 gap-4">
      <div className="lg:col-span-3 col-span-12 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">DASHBORD</h3>

        <h3 className="text-lg font-semibold mb-4">Employees</h3>
        <ul>
        {employees.map((employee) => (
            <li
              key={employee.id}
              className={`cursor-pointer text-blue-500 hover:underline mb-2 p-2 rounded ${
                selectedEmployee?.id === employee.id ? 'bg-blue-100 font-bold' : ''
              }`}
              onClick={() => handleEmployeeClick(employee)}
            >
              {employee.username}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-9 col-span-12 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <h4>Total Employees</h4>
            <p className="text-xl font-bold">{totalemp}</p>
          </div>
          <div>
            <h4>Pending Approvals</h4>
        <p className="text-xl font-bold">{totalpendings}</p>

          </div>
          <div>
            <h4>Leave Summary</h4>
            <Bar data={leaveData} options={{ maintainAspectRatio: true }} />
          </div>
        </div>

        <div>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={['month', 'week', 'day']}
            defaultView="month"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveCalendar;
