import React from 'react'
import Action from '../../components/Common/Actionbar/ActionBar'
import LeaveApplication from '../../components/employe/LeaveList/LeaveApplied'
import { FaTachometerAlt, FaUsers, FaMoneyBillWave, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa'; 


export const LeaveList = () => {

    const navItems = [
        { label: 'Dashboard', icon: FaTachometerAlt, link: '/dashbord' },
        { label: 'Attendance', icon: FaCalendarAlt, link: '/lists' },
        { label: 'Help Desk', icon: FaQuestionCircle, link: '/helpdesk' },
      ];
  return (
    <div>
    <div>
        <Action navItems={navItems}/>
    </div>
    <div className='mt-[-700px] ml-[300px]'>
        <LeaveApplication/>
    </div>
    </div>
  )
}
