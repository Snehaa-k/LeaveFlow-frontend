import React from 'react'
import { FaTachometerAlt, FaUsers, FaMoneyBillWave, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa'; 
import Action from '../../components/Common/Actionbar/ActionBar';
import HelpGuide from '../../components/Common/HelpGuide/HelpGuid';

export const HelpDesk = () => {
   const  usertoken = localStorage.getItem("accessToken")
   const   admintoken = localStorage.getItem("accessTokenAdmin")
    
    const navItems = [
        { label: 'Dashboard', icon: FaTachometerAlt, link: '/dashbord' },
        { label: 'Leave Apply', icon: FaCalendarAlt, link: '/lists' },
        { label: 'Help Desk', icon: FaQuestionCircle, link: '/help' },
      ];
      const navItemsadmin = [
        { label: 'Dashboard', icon: FaTachometerAlt, link: '/managerdash' },
        { label: 'Leave Requests', icon: FaUsers, link: '/requests' },
        { label: 'Help Desk', icon: FaQuestionCircle, link: '/help' },


    ];
    const nav = usertoken ? navItems : admintoken ? navItemsadmin : [];

  return (
    <div>
        <div className=''>
            {usertoken ?  
        <Action navItems={nav}/>:  <Action navItems={navItemsadmin}/>}
        </div>
        <div className=" p-4 mt-4 sm:mt-[-750px] sm:ml-[300px] overflow-auto max-h-[100vh] ">
                <HelpGuide />
            </div>
    </div>
  )
}
