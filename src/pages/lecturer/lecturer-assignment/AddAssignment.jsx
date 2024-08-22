import React, { useState, useRef } from "react";
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

import LecturerDashboardLayout from "../../../layouts/dashboard/LecturerDashboardLayout";

import ArrowLeft from "../../../assets/images/icons/arrow-left.svg";
import UploadIcon from "../../../assets/images/icons/document-upload.svg";
import CloseIcon from "../../../assets/images/icons/Close.svg";

import "../../../assets/css/style.css";

const AddAssignment = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* --------- Upload File ---------*/

    const [files, setFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFiles = e.dataTransfer.files;
        handleFiles(droppedFiles);
    };

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        handleFiles(selectedFiles);
    };

    const handleFiles = (newFiles) => {
        setFiles(prevFiles => [...prevFiles, ...Array.from(newFiles)]);
    };

    const handleRemoveFile = (fileName) => {
        setFiles([]);
        document.getElementById('fileInput').value = '';
    };

    /* --------- End Upload File ---------*/


    /* -------------------- Handle Create Assignment -------------------- */

    const assignmentNameField = useRef();
    const assignmentTypeField = useRef();
    const assignmentDescriptionField = useRef();

    const onCreateAssignment = async () => {

        try {

            const token = localStorage.getItem("token");

            const assignmentPayload = new FormData();
            assignmentPayload.append("assignmentName", assignmentNameField.current.value);
            assignmentPayload.append("assignmentType", assignmentTypeField.current.value);
            assignmentPayload.append("assignmentDescription", assignmentDescriptionField.current.value);
            files.forEach((file) => {
                assignmentPayload.append(`assignmentFile`, file);
            });

            const assignmentPayloadRequest = await axios.post(
                `http://localhost:8080/api/v1/lecturer/assignment`,
                assignmentPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "multipart/form-data"
                    },
                }
            );

            const assignmentPayloadResponse = assignmentPayloadRequest.data;

            enqueueSnackbar(assignmentPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (assignmentPayloadResponse.status) {

                navigate("/lecturer/assignment");

            }

        } catch (err) {

            enqueueSnackbar('Cek ulang data anda (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Create Assignment -------------------- */


    return (

        <LecturerDashboardLayout>
            <div id="add-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="add-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/lecturer/assignment')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Tambah Penugasan</h1>
                        </Col>
                    </Row>
                    <Row className="form-research">
                        <Col xl={12}>
                            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                <h1>Formulir Penugasan</h1>
                                <div className="form-research-input">
                                    <Form>
                                        <Row>
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nama penugasan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan nama penugasan" autoComplete="off" style={{ fontSize: '14px' }} ref={assignmentNameField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput2">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jenis penugasan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan jenis" autoComplete="off" style={{ fontSize: '14px' }} ref={assignmentTypeField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput2">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Deskripsi penugasan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan deskripsi" autoComplete="off" style={{ fontSize: '14px' }} ref={assignmentDescriptionField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group>
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Upload lampiran penugasan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <div
                                                            className="form-upload"
                                                            style={{ padding: '30px', border: '1px solid #EFEFEF', borderRadius: '8px', cursor: 'pointer' }}
                                                            onDragOver={(e) => e.preventDefault()}
                                                            onDrop={handleDrop}
                                                            onClick={() => document.getElementById('fileInput').click()}
                                                        >
                                                            <Form.Control
                                                                type="file"
                                                                id="fileInput"
                                                                onChange={handleFileChange}
                                                                style={{ display: 'none' }}
                                                                accept=".pdf"
                                                            />
                                                            <Row>
                                                                {
                                                                    files.length > 0 ? (
                                                                        <Col xl={12} className="d-flex justify-content-start">
                                                                            <div style={{ display: 'flex', gap: '10px', padding: '5px 10px', background: '#FAFAFA', borderRadius: '4px', zIndex: '999' }}>
                                                                                <Image src={UploadIcon} style={{ width: '15px' }} />
                                                                                <p style={{ margin: 'auto 0', color: '#292929' }}>{files[0].name}</p>
                                                                                <Image key={files[0].name} onClick={() => handleRemoveFile(files[0].name)} src={CloseIcon} style={{ width: '15px', marginLeft: '40px' }} />
                                                                            </div>
                                                                        </Col>
                                                                    ) : (
                                                                        <>
                                                                            <Col xl={12} className="d-flex justify-content-center">
                                                                                <Image src={UploadIcon} />
                                                                            </Col>
                                                                            <Col xl={{ span: 2, offset: 5 }} className="text-center mt-2">
                                                                                <p style={{ margin: 'auto 0', color: '#292929', fontSize: '14px' }}>Drag and drop filemu atau <span style={{ color: '#2181E8' }}>telusuri</span></p>
                                                                            </Col>
                                                                        </>
                                                                    )
                                                                }
                                                            </Row>
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-4">
                                            <Col xl={12} className="d-flex justify-content-end">
                                                <Button onClick={onCreateAssignment} style={{ background: '#D62C35', border: 'none', fontSize: '16px' }}> Tambah Penugasan </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LecturerDashboardLayout>

    );

};

export default AddAssignment;