import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopCards.css';

function TopCards() {
    const [roleCounts, setRoleCounts] = useState({
        'Sales Engineering': 0,
        Executive: 0,
        Developer: 0,
        'Account Executive': 0,
        Student: 0
    });

    useEffect(() => {
        const fetchRoleCounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rolecounts');
                const data = response.data;

                // Map the response data to the expected structure in roleCounts
                const updatedRoleCounts = {
                    'Sales Engineering': 0,
                    Executive: 0,
                    Developer: 0,
                    'Account Executive': 0,
                    Student: 0
                };

                data.forEach((item) => {
                    if (updatedRoleCounts.hasOwnProperty(item._id)) {
                        updatedRoleCounts[item._id] = item.roleCount;
                    }
                });

                setRoleCounts(updatedRoleCounts);
            } catch (error) {
                console.error('Error fetching role counts:', error);
            }
        };

        // Initial fetch and setup polling
        fetchRoleCounts();
        const intervalId = setInterval(fetchRoleCounts, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="top-cards-container">
            <div className="card">
                <h3>3542</h3>
                <p>Expected</p>
            </div>
            <div className="card">
                <h3>{roleCounts.Executive}</h3>
                <p>Leadership</p>
            </div>
            <div className="card">
                <h3>{roleCounts.Developer}</h3>
                <p>Developers</p>
            </div>
            <div className="card">
                <h3>{roleCounts['Account Executive']}</h3>
                <p>Account Executives</p>
            </div>
            <div className="card">
                <h3>{roleCounts.Student}</h3>
                <p>Students</p>
            </div>
        </div>
    );
}

export default TopCards;
