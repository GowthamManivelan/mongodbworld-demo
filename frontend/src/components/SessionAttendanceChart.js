import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Chart, PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip, Legend);

const SessionAttendanceChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [attendanceData, setAttendanceData] = useState({
        labels: [],
        data: []
    });
    const [highlightIndex, setHighlightIndex] = useState(null);

    const baseColors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)'
    ];

    const highlightedColors = [
        'rgba(255, 99, 132, 0.9)',
        'rgba(54, 162, 235, 0.9)',
        'rgba(255, 206, 86, 0.9)',
        'rgba(75, 192, 192, 0.9)',
        'rgba(153, 102, 255, 0.9)'
    ];

    const flashColor = 'rgba(255, 215, 0, 1)'; // Bright yellow flash color

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/locationdensity/density');
                const labels = response.data.map(item => item._id);
                const data = response.data.map(item => item.locationCount);

                let updatedIndex = null;
                data.forEach((count, index) => {
                    if (attendanceData.data[index] !== count) {
                        updatedIndex = index;
                    }
                });

                setAttendanceData({ labels, data });
                setHighlightIndex(updatedIndex);

                if (updatedIndex !== null) {
                    setTimeout(() => setHighlightIndex(null), 1000); // Reset highlight
                }
            } catch (error) {
                console.error("Error fetching session attendance data:", error);
            }
        };

        fetchAttendanceData();
        const intervalId = setInterval(fetchAttendanceData, 5000);
        return () => clearInterval(intervalId);
    }, [attendanceData.data]);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (!chartInstanceRef.current) {
            chartInstanceRef.current = new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: attendanceData.labels,
                    datasets: [{
                        label: 'Location Density',
                        data: attendanceData.data,
                        backgroundColor: baseColors,
                        borderColor: baseColors.map(color => color.replace('0.5', '1')),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            ticks: { display: false },
                            grid: { color: 'rgba(200, 200, 200, 0.5)' }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right',
                            labels: { color: '#4A5568' }
                        }
                    },
                    animation: {
                        duration: 500, // Animation duration
                        easing: 'easeOutBounce' // Animation easing
                    }
                }
            });
        } else {
            chartInstanceRef.current.data.labels = attendanceData.labels;
            chartInstanceRef.current.data.datasets[0].data = attendanceData.data;

            chartInstanceRef.current.data.datasets[0].backgroundColor = attendanceData.data.map((_, index) => {
                if (index === highlightIndex) {
                    return flashColor; // Flash color for update
                }
                return baseColors[index % baseColors.length];
            });

            chartInstanceRef.current.update();

            if (highlightIndex !== null) {
                setTimeout(() => {
                    chartInstanceRef.current.data.datasets[0].backgroundColor = attendanceData.data.map((_, index) =>
                        index === highlightIndex ? highlightedColors[index % highlightedColors.length] : baseColors[index % baseColors.length]
                    );
                    chartInstanceRef.current.update();
                }, 500); // Delay to show flash color
            }
        }
    }, [attendanceData, highlightIndex]);

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ color: '#2A9D8F', marginBottom: '5px', marginTop: '50px' }}>Conference Session Attendance</h3>
            <div style={{ position: 'relative', height: '500px', width: '100%' }}>
                <canvas ref={chartRef} id="sessionAttendanceChart"></canvas>
            </div>
        </div>
    );
};

export default SessionAttendanceChart;
