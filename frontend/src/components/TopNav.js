import React, { useState, useEffect } from 'react';
import './TopNav.css';

function TopNav() {
    const [time, setTime] = useState('0:00:00');

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => {
                const [hours, minutes, seconds] = prevTime.split(':').map(Number);
                let newSeconds = seconds + 1;
                let newMinutes = minutes;
                let newHours = hours;

                if (newSeconds === 60) {
                    newSeconds = 0;
                    newMinutes += 1;
                }
                if (newMinutes === 60) {
                    newMinutes = 0;
                    newHours += 1;
                }

                return `${newHours}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
            });
        }, 1000);

        return () => clearInterval(timer); // Clean up timer on component unmount
    }, []);

    return (
        <div className="top-nav">
            <div className="title-container">
                <h1>MongoDB World 2025</h1>
                <div className="live-section">
                    <img src="/live-icon.png" alt="Live Icon" className="live-icon" />
                    <span className="timer">{time}</span>
                </div>
            </div>
            <input type="text" placeholder="Search..." className="search-bar" />
        </div>
    );
}

export default TopNav;
