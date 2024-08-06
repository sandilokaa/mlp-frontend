import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Container,
    Row,
    Col,
    Button,
    Image
} from "react-bootstrap";
import axios from "axios";

import SuperadminDashboardLayout from "../../../layouts/dashboard/SuperadminDashboardLayout";

import ViewIcon from "../../../assets/images/icons/eye.svg";
import ExportIcon from "../../../assets/images/icons/export.svg";

import "../../../assets/css/style.css";

const SuperadminResearch = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    return (

        <SuperadminDashboardLayout>
            <div id="research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <div className="add-research-content">
                        <Row>
                            <Col xl={12}>
                                <h1 style={{ fontSize: '16px', fontWeight: '700' }}>Daftar Penelitian</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={2} className="mt-4">
                                <Button style={{width: '120px', fontSize: '14px'}}>Export <Image src={ExportIcon} style={{marginLeft: '8px', width: '20px',}}/></Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="research-table-content">
                        <Row className="table-head">
                            <Col xl={1}>
                                <h6>No</h6>
                            </Col>
                            <Col xl={4}>
                                <h6>Judul Penelitian</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Nama Dosen</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Kategori</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Skor</h6>
                            </Col>
                            <Col xl={1} className="text-center">
                                <h6>Action</h6>
                            </Col>
                        </Row>
                        <hr style={{ marginTop: '10px' }} />
                        <Row className="table-body">
                            <div className="d-flex align-items-center" style={{padding: '16px'}}>
                                <Col xl={1}>
                                    <h6>01</h6>
                                </Col>
                                <Col xl={4}>
                                    <h6>Analisis User Interface dan User Experience Aplikasi</h6>
                                </Col>
                                <Col xl={2} className="text-center">
                                    <h6>Cecep Bagus</h6>
                                </Col>
                                <Col xl={2} className="text-center" style={{marginLeft: '8px'}}>
                                    <h6>Product Design</h6>
                                </Col>
                                <Col xl={2} className="text-center" style={{marginLeft: '5px'}}>
                                    <h6>Perlu dinilai</h6>
                                </Col>
                                <Col xl={1} className="text-center" style={{marginLeft: '4px'}}>
                                    <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                        <Col xl={12} className="d-flex justify-content-center p-0">
                                            <span className="view">
                                                <Image src={ViewIcon} />
                                            </span>
                                        </Col>
                                    </Row>
                                </Col>
                            </div>
                        </Row>
                    </div>
                </Container>
            </div>
        </SuperadminDashboardLayout>

    );

};

export default SuperadminResearch;