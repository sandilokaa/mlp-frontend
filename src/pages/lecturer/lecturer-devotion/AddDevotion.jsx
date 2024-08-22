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

const AddDevotion = () => {

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
    

    /* -------------------- Handle Create Devotion -------------------- */

    const devotionNameField = useRef();
    const devotionRoleField = useRef();
    const devotionPeriodField = useRef();
    const academicYearField = useRef();
    const devotionDescriptionField = useRef();

    const onCreateDevotion = async () => {

        try {

            const token = localStorage.getItem("token");

            const devotionPayload = new FormData();
            devotionPayload.append("devotionName", devotionNameField.current.value);
            devotionPayload.append("devotionRole", devotionRoleField.current.value);
            devotionPayload.append("devotionPeriod", devotionPeriodField.current.value);
            devotionPayload.append("academicYear", academicYearField.current.value);
            devotionPayload.append("devotionDescription", devotionDescriptionField.current.value);
            files.forEach((file) => {
                devotionPayload.append(`devotionFile`, file);
            });
            

            const devotionPayloadRequest = await axios.post(
                `http://localhost:8080/api/v1/lecturer/devotion`,
                devotionPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "multipart/form-data"
                    },
                }
            );

            const devotionPayloadResponse = devotionPayloadRequest.data;

            enqueueSnackbar(devotionPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (devotionPayloadResponse.status) {

                navigate("/lecturer/devotion");

            }

        } catch (err) {

            enqueueSnackbar('Cek ulang data anda (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Create Devotion -------------------- */


    return (

        <LecturerDashboardLayout>
            <div id="add-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="add-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/lecturer/devotion')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Tambah Pengabdian</h1>
                        </Col>
                    </Row>
                    <Row className="form-research">
                        <Col xl={12}>
                            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                <h1>Formulir Pengabdian</h1>
                                <div className="form-research-input">
                                    <Form>
                                        <Row>
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nama pengabdian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan nama pengabdian" autoComplete="off" style={{ fontSize: '14px' }} ref={devotionNameField}/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput2">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Peran dalam pengabdian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan peran" autoComplete="off" style={{ fontSize: '14px' }} ref={devotionRoleField}/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput3">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Periode pengabdian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan periode" autoComplete="off" style={{ fontSize: '14px' }} ref={devotionPeriodField}/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput4">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tahun ajaran <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan tahun ajaran" autoComplete="off" style={{ fontSize: '14px' }} ref={academicYearField}/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput2">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Deskripsi pengabdian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan deskripsi" autoComplete="off" style={{ fontSize: '14px' }} ref={devotionDescriptionField}/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group>
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Upload lampiran pengabdian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
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
                                                                            <div style={{display:'flex', gap: '10px' , padding: '5px 10px', background: '#FAFAFA', borderRadius: '4px', zIndex: '999'}}>
                                                                                <Image src={UploadIcon} style={{width: '15px'}}/>
                                                                                <p style={{ margin: 'auto 0', color: '#292929' }}>{files[0].name}</p>
                                                                                <Image key={files[0].name} onClick={() => handleRemoveFile(files[0].name)} src={CloseIcon} style={{width: '15px', marginLeft: '40px'}}/>
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
                                                <Button onClick={onCreateDevotion} style={{ background: '#D62C35', border: 'none', fontSize: '16px' }}> Tambah Pengabdian </Button>
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

export default AddDevotion;