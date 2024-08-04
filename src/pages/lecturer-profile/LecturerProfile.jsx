import React from "react";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

import DashboardLayout from "../../layouts/dashboard/DashboardLayout";

import "../../assets/css/style.css";

const LecturerProfile = () => {

    return (

        <DashboardLayout>
            <Container fluid style={{ padding: '0 32px' }}>
                <Row>
                    <Col> HALOO </Col>
                </Row>
            </Container>
        </DashboardLayout>

    );

};

export default LecturerProfile;