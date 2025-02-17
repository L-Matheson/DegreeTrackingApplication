/* @author Lucas Matheson
 *
 *  This component is the sidebar of the application. It was first developed as a baseline
 *  It can be used to display a list of other applications inside the degree tracker.
 *
 */
import { Button } from "primereact/button";
import { useState } from "react";
import "../App.css";

export default function Sidebar({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`layout-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <aside className="bg-blue-900 text-white h-screen p-2">
        <div className="flex justify-between items-center">
          <Button icon="pi pi-bars" className="p-button-text ml-auto" onClick={toggleSidebar}/>
          </div>
        <div>
          <SidebarHeader text="Degree Tracker" icon={"pi pi-graduation-cap"} />
        </div>
        <hr class="solid" />

        {children}
      </aside>
    </div>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  return (
    // add rounded corners and hover effect
    <div className="sidebar-item flex items-center py-2 px-4 hover:bg-blue-800 rounded cursor-pointer transition duration-200 ease-in-out">
      <div style={{ marginRight: "10px" }}>
        <i class={icon} size="medium" />
        
      </div>
      <div className="flex-grow">{text}</div>
    </div>
  );
}

export function SidebarHeader({ text, icon }) {
  return (
    <div className="sidebar-header">
     <div className="py-2 px-3 w-full flex justify-center bg-blue-900 text-white ">
      <div style={{ marginRight: "10px" }}>
        <i class={icon} size="medium" />
      </div>
      <label>{text}</label>
    </div>
    </div>
  );
}
