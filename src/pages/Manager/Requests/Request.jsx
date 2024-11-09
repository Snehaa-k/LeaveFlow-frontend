import React from 'react'
import Action from '../../../components/Common/Actionbar/ActionBar'
import ManagerLeaveRequests from '../../../components/Manager/LeaveRequests/LeaveRequests';
import { FaTachometerAlt, FaUsers, FaMoneyBillWave, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa'; 


const Request = () => {
    const navItems = [
        { label: 'Dashboard', icon: FaTachometerAlt, link: '/managerdash' },
        { label: 'Leave Requests', icon: FaUsers, link: '/requests' },
        { label: 'Help Desk', icon: FaQuestionCircle, link: '/helpdesk' },


      ];

     
  return (
    <div>
    <div>
        <Action navItems={navItems} />

    </div>
    <div className='mt-[-700px] ml-[300px] '>
        <ManagerLeaveRequests  />
    </div>
    </div>
    

  )
}

export default Request