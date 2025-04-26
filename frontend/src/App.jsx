import React, { useEffect, useState } from 'react';
import Sidebar, { SidebarItem, SidebarHeader } from './GeneralComponents/SideBar';
import './App.css';
import './global.css';
import { SidebarProvider } from './Context/SidebarContext';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CalendarPage from './pages/Calendar';
import MajorRequirements from './pages/MajorRequirements';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Logout from './pages/Logout';  
import MajorTreeView from './pages/MajorTreeView';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function App() {
  const [user, setUser] = useState(null);

  // Check if user is stored in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('user'); // Clear user data from localStorage
    setUser(null); // Reset user state
  };

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
              <SidebarItem icon="pi pi-sitemap" text="Major Tree View" to="/MajorTreeView" />
              <hr className="solid" />
              <SidebarItem icon="pi pi-cog" text="Settings" to="/Settings" />
              <SidebarItem icon="pi pi-sign-out" text="Logout" to="/" onClick={handleLogout} />
            </Sidebar>
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/MajorRequirements" element={<MajorRequirements />} />
                <Route path="/MajorTreeView" element={<MajorTreeView />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/" element={<Logout />} />
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
