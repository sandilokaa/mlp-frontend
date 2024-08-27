import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    

    return isLoggedIn ? (

        <Container fluid style={{ padding: '0 32px' }}>
            <Row style={{ height: '64px' }}>
                <Col xs={12} xl={12} className="d-flex justify-content-end align-items-center" style={{ gap: '12px' }}>
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