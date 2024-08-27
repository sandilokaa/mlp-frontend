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
import ArrowDownBlack from "../../assets/images/icons/arrow-down-b.svg";

import "../../assets/css/style.css";

const NavbarDashboard = () => {
    
    /* ================ Get Current User ================ */

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [superadmin, setSuperadmin] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {

        const validateLogin = async () => {

            try {

                const token = localStorage.getItem("token");

                const currentSuperadminRequest = await axios.get(
                    `http://localhost:8080/api/v1/auth/superadmin/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentSuperadminResponse = currentSuperadminRequest.data;

                if (currentSuperadminResponse.status) {

                    setSuperadmin(currentSuperadminResponse.data.currentUser);

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
                <Col xs={12} xl={12} className="d-flex justify-content-end" style={{ gap: '12px' }}>
                    <div className="d-flex align-items-center" style={{ margin: 'auto 0', padding: ' 5px 10px', background: '#292929', color: '#FFFFFF', borderRadius: '4px', gap: '8px' }}>
                        <Image src={UserProfile} />
                        <p style={{ margin: 'auto 0', fontSize: '14px' }}>{superadmin.name}</p>
                    </div>
                    {superadmin.role === "expertiseGroup" ? (
                        <div className="d-flex align-items-center" style={{ margin: 'auto 0', padding: ' 5px 10px', background: '#292929', color: '#FFFFFF', borderRadius: '4px', gap: '13px' }}>
                            <p style={{ margin: 'auto 0', fontSize: '14px' }}>{superadmin.groupName}</p>
                        </div>
                    ) : null}
                </Col>
            </Row>
        </Container>

    ) : (navigate("/superadmin/login"));

};

export default NavbarDashboard;