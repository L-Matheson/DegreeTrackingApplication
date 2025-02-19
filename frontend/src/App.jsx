import React, { useState, useEffect, useRef } from 'react';
import Sidebar, { SidebarItem } from './GeneralComponents/SideBar';
import './App.css';
import './global.css'; 
import { SidebarProvider } from './Context/SidebarContext';
import { SidebarHeader } from './GeneralComponents/SideBar';
export default function App() {


 return (
  <SidebarProvider>
   <main className='App'>
      <Sidebar>
          <SidebarHeader text="Degree Tracker" icon="pi pi-graduation-cap" />
        
          <hr className="solid" />
        <SidebarItem icon="pi pi-home" text="Home" active={true} alert={false} />
        <SidebarItem icon="pi pi-book" text="Courses" active={false} alert={false} />
        <SidebarItem icon="pi pi-user" text="Professors" active={false} alert={true} />
        <SidebarItem icon="pi pi-calendar" text="Calendar" active={false} alert={false} />
        <SidebarItem icon="pi pi-book" text="Major Requirements" active={false} alert={false} />
        <hr class="solid" />
        <SidebarItem icon="pi pi-cog" text="Settings" active={false} alert={false} />
        <SidebarItem icon="pi pi-sign-out" text="Logout" active={false} alert={false} />
       </Sidebar>
   </main>
   </SidebarProvider>
  );
}

