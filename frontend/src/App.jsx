import React, { useEffect, useState } from 'react';
import Sidebar, { SidebarItem, SidebarHeader } from './GeneralComponents/SideBar';
import './App.css';
import './global.css';
import { SidebarProvider } from './Context/SidebarContext';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Calendar from './pages/Calendar';
import MajorRequirements from './pages/MajorRequirements';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      {user ? (
        <SidebarProvider>
          <main className="App">
            <Sidebar>
              <SidebarHeader text="Degree Tracker" icon="pi pi-graduation-cap" />
              <SidebarItem icon="pi pi-home" text="Home" to="/" />
              <SidebarItem icon="pi pi-book" text="Courses" to="/courses" />
              <SidebarItem icon="pi pi-calendar" text="Calendar" to="/calendar" />
              <SidebarItem icon="pi pi-book" text="Major Requirements" to="/MajorRequirements" />
              <hr className="solid" />
              <SidebarItem icon="pi pi-cog" text="Settings" to="/Settings" />
              <SidebarItem icon="pi pi-sign-out" text="Logout" to="/" onClick={() => setUser(null)} />
            </Sidebar>
            <div className="content">

              <Routes>
               
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/MajorRequirements" element={<MajorRequirements />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
              
              </Routes>
           
            </div>
          </main>
        </SidebarProvider>
      ) : (
        <Login onLogin={setUser} />
      )}
    </Router>
  );
}
