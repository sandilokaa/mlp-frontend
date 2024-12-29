import React from "react";
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";
import ResearchDashboard from "../../Dashboard/ResearchDashboard";
import PublicationDashboard from "../../Dashboard/PublicationDashboard";
import PatentDashboard from "../../Dashboard/PatentDashboard";
import IPRightDashboard from "../../Dashboard/IPRightDashboard";
import DevotionDashboard from "../../Dashboard/DevotionDashboard";

import "../../../../assets/css/style.css";

const DeanDashboard = () => {

    return (

        <SuperadminDashboardLayout>
            <div id="research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <div className="add-research-content" style={{paddingBottom: '20px'}}>
                        <Row>
                            <Col xl={12}>
                                <h1 style={{ fontSize: '16px', fontWeight: '700' }}>Daftar Laporan</h1>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col xl={6}>
                                <ResearchDashboard />
                            </Col>
                            <Col xl={6}>
                                <PublicationDashboard />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col xl={6}>
                                <PatentDashboard />
                            </Col>
                            <Col xl={6}>
                                <IPRightDashboard />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col xl={6}>
                                <DevotionDashboard />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </SuperadminDashboardLayout>

    );

};

export default DeanDashboard;