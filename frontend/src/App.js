import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import TopCards from './components/TopCards';
import LiveSessionAnalytics from './components/LiveSessionAnalytics';
import SessionAttendanceChart from './components/SessionAttendanceChart';
import './App.css';
import banner from './components/banner.png';

function App() {
    return (
        <div className="app">
            <TopNav />
            <div className="main-content">
                <Sidebar />
                <div className="dashboard-content">
                <div className="banner-container">
                        <img src={banner} alt="Conference Banner" className="banner-image" />
                    </div>
                    <h2 className="badge-scanning-title">Badge Scanning Real-Time Update</h2>
                    <TopCards />
                    <Dashboard />
                    <LiveSessionAnalytics />
                    <SessionAttendanceChart />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
