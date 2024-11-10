import React from 'react';
import Action from '../../../components/Common/Actionbar/ActionBar';
import EmployeeLeaveCalendar from '../../../components/Manager/Dashboardmanager/Calender';
import { FaTachometerAlt, FaUsers, FaMoneyBillWave, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';

const DashboardManager = () => {
    const navItems = [
        { label: 'Dashboard', icon: FaTachometerAlt, link: '/managerdash' },
        { label: 'Leave Requests', icon: FaUsers, link: '/requests' },
        { label: 'Help Desk', icon: FaQuestionCircle, link: '/help' },


    ];

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 lg:w-1/5 ">
                <Action navItems={navItems} />
            </div>
            
            <div className="mt-4 md:mt-0 md:w-3/4 lg:w-[1200px]  ">
                <EmployeeLeaveCalendar />
            </div>
        </div>
    );
}

export default DashboardManager;
