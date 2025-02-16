/* @author Lucas Matheson
 *
 *  This component is the sidebar of the application. It was first developed as a baseline
 *  It can be used to display a list of other applications inside the degree tracker.
 *
 */
import { Button } from 'primereact/button';
import '../App.css';

export default function Sidebar({ children }) {
  return (
    <div className='layout-sidebar'>
    <aside className="bg-blue-800 text-white h-screen p-4">

      <div className="flex items-center mb-6">
        <h1 className="text-xl font-bold">Degree Tracker</h1>
      </div>
      
      <ul>{children}</ul>
    </aside>
    </div>
  );
}



export function SidebarItem({ icon, text, active, alert }) {
  return (
    <li className='py-2'>
      {icon}
      <span> {text}</span>
    </li>
  );
}
