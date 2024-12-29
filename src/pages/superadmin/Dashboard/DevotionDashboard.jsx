import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

import CardDashboard from "../../../components/card-dashboard/CardDashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DevotionDashboard = () => {

    /* ================ Get Devotion Data ================ */

    const [devotionData, setDevotionData] = useState([]);

    const getDevotionData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/superadmin/dashboard/devotions`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    },
                }
            );

            const getDataResponse = await getDataRequest.data.data.getDevotion.counts;

            setDevotionData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        getDevotionData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================ End Get Devotion Data ================ */


    const data = {
        labels: ['DEST', 'MPE', 'EIMS'],
        datasets: [
            {
                label: 'Jumlah',
                data: devotionData.map(item => item.total),
                backgroundColor: [
                    '#2181E8',
                    '#D62C35',
                    '#24A560',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                grid: {
                    display: true,
                    color: '#EFEFEF',
                    borderDash: [25, 5],
                    drawBorder: false
                },
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    callback: function(value) {
                        return value.toFixed(0);
                    }
                }
            },
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false,
                    drawBorder: false
                },
            },
        },
    };

    return (
        <CardDashboard title="Pengabdian">
            <Bar data={data} options={options} />
        </CardDashboard>
    );

};

export default DevotionDashboard;