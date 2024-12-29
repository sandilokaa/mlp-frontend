import React, {useState, useEffect} from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

import CardDashboard from "../../../components/card-dashboard/CardDashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResearchDashboard = () => {

    /* ================ Get Research Data ================ */

    const [researchData, setResearchData] = useState([]);

    const getResearchData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/superadmin/dashboard/researchs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    },
                }
            );

            const getDataResponse = await getDataRequest.data.data.getResearch.counts;

            setResearchData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        getResearchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================ End Get Research Data ================ */


    const data = {
        labels: ['DEST', 'MPE', 'EIMS'],
        datasets: [
            {
                label: 'Jumlah',
                data: researchData.map(item => item.total),
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
            },
        },
        scales: {
            y: {
                grid: {
                    display: true,
                    color: '#EFEFEF',
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
                },
            },
        },
    };

    return (
        <CardDashboard title="Penelitian">
            <Bar data={data} options={options} />
        </CardDashboard>
    );

};

export default ResearchDashboard;