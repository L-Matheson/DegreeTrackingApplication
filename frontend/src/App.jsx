import React, { useState, useEffect, useRef } from 'react';
import menubar from './GeneralComponents/Menubar';
import Sidebar, { SidebarItem } from './GeneralComponents/SideBar';
import './App.css';
import './global.css'; 

export default function App() {


 return (
   <main className='App'>
      <Sidebar>
        <SidebarItem icon={<i className="pi pi-home"></i>} text="Home" active={true} alert={false} />
        <SidebarItem icon={<i className="pi pi-users"></i>} text="Users" active={false} alert={true} />
        <SidebarItem icon={<i className="pi pi-cog"></i>} text="Settings" active={false} alert={false} />
        <SidebarItem icon={<i className="pi pi-sign-out"></i>} text="Logout" active={false} alert={false} />
       </Sidebar>
   </main>
  );
}

