import React, { useState, useEffect, useRef } from 'react';
import './GlobalWrappers.css'; // Import the CSS file


function Sidebar({ children }) {
  const sidebarRef = useRef(null);

  return (
    <div className="test" style={{ display: 'flex', minHeight: '100vh', overflowY: 'auto' }}>
  
        <h2>Sidebar</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Sidebar;