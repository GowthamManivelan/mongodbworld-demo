import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>MongoDB World Conference</h2>
      <nav>
        <ul>
          <li>Hack-a-thon</li>
          <li>Dashboard</li>
          <li>Chat</li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;

