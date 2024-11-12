import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CheckInList() {
    const [checkIns, setCheckIns] = useState([]);

    useEffect(() => {
        const fetchCheckIns = async () => {
            const response = await axios.get('/api/checkins');
            setCheckIns(response.data);
        };
        fetchCheckIns();
    }, []);

    return (
        <div>
            {checkIns.map((checkIn) => (
                <div key={checkIn.attendeeID}>
                    {checkIn.attendeeID} checked in at {checkIn.location}
                </div>
            ))}
        </div>
    );
}

export default CheckInList;
