import React from "react";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

import "../../assets/css/style.css";

const NavbarDashboard = () => {

    return (

        <Container fluid style={{ padding: '0 32px' }}>
            <Row style={{ height: '64px' }}>
                <Col xs={12} xl={12} className="d-flex justify-content-end">
                    <div className="d-flex align-items-center" style={{zIndex: '999'}}>
                        Halo
                    </div>
                </Col>
            </Row>
        </Container>

    )

};

export default NavbarDashboard;