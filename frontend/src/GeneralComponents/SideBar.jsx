/* @author Lucas Matheson
 *
 *  This component is the sidebar of the application. Developed as a baseline for the degree tracker.
 *  It can be used to display a list of other applications inside the degree tracker.
 *
 */
import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import { SidebarContext } from '../Context/SidebarContext';
import '../App.css';
import { Link } from 'react-router-dom';


export default function Sidebar({ children }) {
  const { isCollapsed, toggleSidebar } = useContext(SidebarContext);

  return (
    <div className={`layout-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <aside className="bg-blue-900 text-white h-screen p-2">
        <div className="flex justify-between items-center">
          <Button icon="pi pi-bars" className="p-button-text ml-auto" style={{marginRight: '1px'}} onClick={toggleSidebar} />
        </div>
  
        {children}
      </aside>
    </div>
  );
}

export function SidebarItem({ icon, text, active, alert, to }) {
  const { isCollapsed } = useContext(SidebarContext);

  if(isCollapsed){
    
    return (
      <Link to={to} className="sidebar-item py-2 hover:bg-blue-800 rounded cursor-pointer transition duration-200 ease-in-out">

     
        <div >
          <i className={icon} size="medium" />
        </div>
    
      </Link>
    );
  } else {

  return (
    <Link to={to} className="sidebar-item flex items-center py-2 px-4 hover:bg-blue-800 rounded cursor-pointer transition duration-200 ease-in-out">
    
      <div style={{ marginRight: '10px' }}>
        <i className={icon} size="medium" />
      </div>
      {!isCollapsed && <span>{text}</span>}
    
  </Link>
  
  );
}
}

export function SidebarHeader({ text, icon }) {
  const { isCollapsed } = useContext(SidebarContext);

  if(isCollapsed){
    return(
    <div className="sidebar-item flex  py-2  transition duration-200 ease-in-out">

      <i className={icon} size="medium" />

  </div>
    );
  } else {
  return (
    <div className="sidebar-header">
      <div className="py-2 px-3 w-full flex justify-start bg-blue-900 text-white">
        <div style={{ marginRight: '10px' }}>
          <i className={icon} size="medium" />
        </div>
        <label>{text}</label>
      </div>
    </div>
  );
}
}
