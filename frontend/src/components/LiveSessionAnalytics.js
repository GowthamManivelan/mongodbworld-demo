import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LiveSessionAnalytics.css';
import liveIcon from './live.png'; // Replace with the path to your LIVE icon image

function LiveSessionAnalytics() {
    const [liveSessions, setLiveSessions] = useState([]);
    const [attendeeCounts, setAttendeeCounts] = useState({});

    // Fetch live sessions data
    useEffect(() => {
        const fetchLiveSessions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sessions/live');
                setLiveSessions(response.data);
            } catch (error) {
                console.error('Error fetching live sessions:', error);
            }
        };

        fetchLiveSessions();
    }, []);

    // Polling for real-time attendee counts every 5 seconds
    useEffect(() => {
        const fetchAttendeeCounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/session-analytics/analytics');
                const counts = response.data.reduce((acc, item) => {
                    acc[item._id] = item.attendeeCount;  // Map attendee count by session ID
                    return acc;
                }, {});
                setAttendeeCounts(counts);
            } catch (error) {
                console.error('Error fetching attendee counts:', error);
            }
        };

        fetchAttendeeCounts();
        const intervalId = setInterval(fetchAttendeeCounts, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="live-session-analytics">
            <h2>Live Session Analytics</h2>
            <div className="session-cards">
                {liveSessions.map(session => (
                    <div key={session._id} className="session-card">
                        <div className="session-header">
                            <img src={liveIcon} alt="LIVE" className="live-icon" />
                            <span className="attendee-count">Checked-In: {attendeeCounts[session._id] || 0}</span>
                        </div>
                        <h3>{session.title}</h3>
                        <p>{session.description}</p>
                        <p><strong>Location:</strong> {session.location}</p>
                        <p><strong>Speaker:</strong> {session.speaker}</p>
                        <p><strong>Duration:</strong> {session.duration}</p>
                        <p><strong>Type:</strong> {session.sessionType}</p>
                        <div className="tags">
                            {session.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LiveSessionAnalytics;
