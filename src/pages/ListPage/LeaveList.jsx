import React from 'react'
import Action from '../../components/Common/Actionbar/ActionBar'
import LeaveApplication from '../../components/employe/LeaveList/LeaveApplied'
import { FaTachometerAlt, FaUsers, FaMoneyBillWave, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa'; 

export const LeaveList = () => {
    const navItems = [
        { label: 'Dashboard', icon: FaTachometerAlt, link: '/dashbord' },
        { label: 'Leave Apply', icon: FaCalendarAlt, link: '/lists' },
        { label: 'Help Desk', icon: FaQuestionCircle, link: '/help' },
    ];

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4  ">
                <Action navItems={navItems} />
            </div>

            <div className="w-full md:w-3/4 p-4">
                <LeaveApplication />
            </div>
        </div>
    );
};
