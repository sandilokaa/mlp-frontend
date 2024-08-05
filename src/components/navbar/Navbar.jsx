import React from "react";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import UserProfile from "../../assets/images/icons/profile.svg";

import "../../assets/css/style.css";

const NavbarDashboard = () => {

    return (

        <Container fluid style={{ padding: '0 32px' }}>
            <Row style={{ height: '64px' }}>
                <Col xs={12} xl={12} className="d-flex justify-content-end" style={{gap: '12px'}}>
                    <div className="d-flex align-items-center" style={{margin: 'auto 0', padding: ' 5px 10px', background: '#EFEFEF', color: '#292929', borderRadius: '4px', gap: '8px'}}>
                        <p style={{margin: 'auto 0', fontSize: '14px'}}>Gasal 2024</p>
                    </div>
                    <div className="d-flex align-items-center" style={{margin: 'auto 0', padding: ' 5px 10px', background: '#292929', color: '#FFFFFF', borderRadius: '4px', gap: '8px'}}>
                        <Image src={UserProfile}/>
                        <p style={{margin: 'auto 0', fontSize: '14px'}}>Cecep Bagus</p>
                    </div>
                </Col>
            </Row>
        </Container>

    )

};

export default NavbarDashboard;