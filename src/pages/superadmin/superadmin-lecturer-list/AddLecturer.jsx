import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Form
} from "react-bootstrap";
import axios from "axios";

import SuperadminDashboardLayout from "../../../layouts/dashboard/SuperadminDashboardLayout";

import ArrowLeft from "../../../assets/images/icons/arrow-left.svg";

import "../../../assets/css/style.css";

const SuperadminAddLecturer = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* -------------------- Create New Lecturer -------------------- */

    const lecturerNameField = useRef();
    const lecturerEmailField = useRef();
    const lecturerPasswordField = useRef();

    const onCreateLecturer = async () => {

        try {

            const token = localStorage.getItem("token");

            const lecturerPayload = {
                name: lecturerNameField.current.value,
                email: lecturerEmailField.current.value,
                password: lecturerPasswordField.current.value
            }           

            const createLecturerRequest = await axios.post(
                `http://localhost:8080/api/v1/superadmin/lecturer`,
                lecturerPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );

            console.log(createLecturerRequest);
            

            const createLecturerResponse = createLecturerRequest.data;

            enqueueSnackbar(createLecturerResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (createLecturerResponse.status) {

                navigate("/superadmin/lecturer/list");

            }
            
        } catch (err) {
            
            enqueueSnackbar(err.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };
    
    /* -------------------- End Create New Lecturer -------------------- */

    return (

        <SuperadminDashboardLayout>
            <div id="add-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="add-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/superadmin/lecturer/list')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Tambah Dosen</h1>
                        </Col>
                    </Row>
                    <Row className="form-research">
                        <Col xl={12}>
                            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                <h1>Form Penambahan Dosen</h1>
                                <div className="form-research-input">
                                    <Form>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput2">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nama Dosen <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Contoh: John Doe" autoComplete="off" style={{ fontSize: '14px' }} ref={lecturerNameField} required/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput3">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Email Dosen <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="email" placeholder="Contoh: telkom@gmail.com" autoComplete="off" style={{ fontSize: '14px' }} ref={lecturerEmailField} required/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput4">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Password <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Minimal 8 karakter" autoComplete="off" style={{ fontSize: '14px' }} ref={lecturerPasswordField} required/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-4">
                                            <Col xl={12} className="d-flex justify-content-end">
                                                <Button onClick={onCreateLecturer} style={{ background: '#D62C35', border: 'none', fontSize: '16px' }}> Tambah Dosen </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </SuperadminDashboardLayout>

    );

};

export default SuperadminAddLecturer;