import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePeriod } from "../../PeriodProvider";

import ArrowDownBlack from "../../assets/images/icons/arrow-down-b.svg";

import UserProfile from "../../assets/images/icons/profile.svg";

import "../../assets/css/style.css";

const NavbarDashboard = () => {


    /* ================ Get Current User ================ */

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [lecturer, setLecturer] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {

        const validateLogin = async () => {

            try {

                const token = localStorage.getItem("token");

                const currentLecturerRequest = await axios.get(
                    `http://localhost:8080/api/v1/auth/lecturer/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentLecturerResponse = currentLecturerRequest.data;

                if (currentLecturerResponse.status) {

                    setLecturer(currentLecturerResponse.data.currentUser);

                }

            } catch (err) {

                setIsLoggedIn(false);

            }

        };

        validateLogin();

        setIsRefresh(false);

    }, [isRefresh]);

    /* ================ Get Current User ================ */

    const { selectedPeriod, setSelectedPeriod } = usePeriod();
    const [isOpen, setIsOpen] = useState(false);

    const options = ["Ganjil 2024", "Genap 2024", "Ganjil 2023", "Genap 2023"];

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    const handlePeriodChange = (newPeriod) => {
        setSelectedPeriod(newPeriod);
        setIsOpen(false);
    };


    return isLoggedIn ? (

        <Container fluid style={{ padding: '0 32px' }}>
            <Row style={{ height: '64px' }}>
                <Col xs={12} xl={12} className="d-flex justify-content-end align-items-center" style={{ gap: '12px' }}>
                    <div className="d-flex">
                        <div className="dropdown-period">
                            <div
                                onClick={handleDropdownClick}
                                className="d-flex align-items-center"
                                style={{ margin: 'auto 0', padding: ' 5px 10px', background: '#EFEFEF', color: '#292929', borderRadius: '4px', gap: '13px', height: '100%', cursor: 'pointer' }}
                            >
                                <p style={{ margin: 'auto 0', fontSize: '14px' }}>{selectedPeriod || 'Ganjil 2024'}</p>
                                <Image src={ArrowDownBlack} />
                            </div>
                            {isOpen && (
                                <ul className="dropdown-period-menu">
                                    {options.map((option) => (
                                        <li key={option} onClick={() => handlePeriodChange(option)} className="dropdown-period-menu-item">
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="d-flex" style={{ margin: 'auto 0', padding: ' 5px 10px', background: '#292929', color: '#FFFFFF', borderRadius: '4px', gap: '8px' }}>
                        <Image src={UserProfile} />
                        <p style={{ margin: 'auto 0', fontSize: '14px' }}>{lecturer.name}</p>
                    </div>
                    <div className="d-flex" style={{ margin: 'auto 0', padding: ' 5px 10px', background: '#292929', color: '#FFFFFF', borderRadius: '4px' }}>
                        <p style={{ margin: 'auto 0', fontSize: '14px' }}>{lecturer.groupName}</p>
                    </div>
                </Col>
            </Row>
        </Container>

    ) : (navigate("/lecturer/login"));

};

export default NavbarDashboard;