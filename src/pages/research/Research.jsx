import React from "react";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    Image
} from "react-bootstrap";

import DashboardLayout from "../../layouts/dashboard/DashboardLayout";

import ViewIcon from "../../assets/images/icons/eye.svg";
import DeleteIcon from "../../assets/images/icons/trash.svg";

import "../../assets/css/style.css";

const Research = () => {

    const navigate = useNavigate();

    return (

        <DashboardLayout>
            <div id="research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <div className="add-research-content">
                        <Row>
                            <Col xl={3}>
                                <Button onClick={() => navigate('/add-research')}>Tambah Penelitian</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="research-table-content">
                        <Row className="table-head">
                            <Col xl={1}>
                                <h6>No</h6>
                            </Col>
                            <Col xl={5}>
                                <h6>Judul Penelitian</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Kategori</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Skor</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Action</h6>
                            </Col>
                        </Row>
                        <hr style={{ marginTop: '0px' }} />
                        <Row className="table-body">
                            <Col xl={1}>
                                <h6>01</h6>
                            </Col>
                            <Col xl={5}>
                                <h6>Analisis User Interface dan User Experience Aplikasi</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Product Design</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>TBA</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <Row>
                                    <Col xl={6} className="d-flex justify-content-end">
                                        <span className="view">
                                            <Image src={ViewIcon} />
                                        </span>
                                    </Col>
                                    <Col xl={6} className="d-flex justify-content-start">
                                        <span className="delete">
                                            <Image src={DeleteIcon} />
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </DashboardLayout>

    );

};

export default Research;