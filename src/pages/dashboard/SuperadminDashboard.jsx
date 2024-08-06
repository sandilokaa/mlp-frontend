import React from "react";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

import SuperadminDashboardLayout from "../../layouts/dashboard/SuperadminDashboardLayout";

import "../../assets/css/style.css";

const SuperadminDashboard = () => {

    return (

        <SuperadminDashboardLayout>
            <Container fluid style={{ padding: '0 32px' }}>
                <Row>
                    <Col> HALOO </Col>
                </Row>
            </Container>
        </SuperadminDashboardLayout>

    );

};

export default SuperadminDashboard;