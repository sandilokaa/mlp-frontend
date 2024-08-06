import React from "react";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

import LecturerDashboardLayout from "../../layouts/dashboard/LecturerDashboardLayout";

import "../../assets/css/style.css";

const LecturerDashboard = () => {

    return (

        <LecturerDashboardLayout>
            <Container fluid style={{ padding: '0 32px' }}>
                <Row>
                    <Col> HALOO </Col>
                </Row>
            </Container>
        </LecturerDashboardLayout>

    );

};

export default LecturerDashboard;