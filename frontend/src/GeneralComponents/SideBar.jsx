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
    <div className={`layout-sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{ padding: 0 }}>
      <aside className="bg-blue-900 text-white h-screen ">
      
        {children}
      </aside>
    </div>
  );
}

export function SidebarItem({ icon, text, active, alert, to,  onClick }) {
  const { isCollapsed } = useContext(SidebarContext);
  if(isCollapsed){ 
   return (
      <Link to={to} style={{width: 46, marginLeft: 7}}  onClick={onClick} className="sidebar-item  flex items-center py-2 hover:bg-blue-800 rounded cursor-pointer transition duration-200 ease-in-out" >
      <div>
      <i className={icon} size="medium"  />
      </div>
    
      </Link>
    );
  } else {
  return (
    <Link to={to}  onClick={onClick} className="sidebar-item flex items-center py-2 px-4 hover:bg-blue-800 rounded cursor-pointer transition duration-200 ease-in-out">
      <div style={{ marginRight: '10px' }}>
        <i className={icon} size="medium" />
      </div>
      <span style={{overflowX: 'hidden', whiteSpace: 'nowrap'}}>{text}</span>
  </Link>
  );
}
}

export function SidebarHeader({ text, icon }) {

  const { isCollapsed, toggleSidebar } = useContext(SidebarContext);
  if(isCollapsed){
    return(
    <div className="sidebar-header-collapsed " style={{height: 51, backgroundColor: 'rgb(1, 23, 54)'}} >
      <Button icon="pi pi-bars" className="p-button-text ml-auto py-3" onClick={toggleSidebar} />
  </div>
    );
  } else {
  return (
    <div className="sidebar-header" style={{backgroundColor: 'rgb(1, 23, 54)', height: 51}}>
      <div className=" w-full flex text-white"> 
        <div style={{ marginRight: '10px', paddingLeft: 24, paddingTop: 11 }}>
          <i className={icon} size="medium" />
        </div>
        <label style={{overflowX: 'hidden', whiteSpace: 'nowrap', paddingBottom: 0, paddingTop: 10}}>{text}</label>
        <Button icon="pi pi-bars" className="p-button-text ml-6 py-3"  onClick={toggleSidebar} style={{padding: 0, margin: 0, top: 0}} />
      </div>
    </div>
  );
}
}
