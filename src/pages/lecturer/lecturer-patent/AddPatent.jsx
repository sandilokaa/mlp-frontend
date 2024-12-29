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

const AddPatent = () => {

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


    /* -------------------- Handle Create Patent -------------------- */

    const [selectedDate, setSelectedDate] = useState();

    const patentTitleField = useRef();
    const registrationNumberField = useRef();
    const descriptionField = useRef();

    const handlePatentDate = (e) => {

        const selectedDate = e.target.value;

        setSelectedDate(selectedDate);

    };

    const onCreatePatent = async () => {

        try {

            const token = localStorage.getItem("token");

            const patentPayload = new FormData();
            patentPayload.append("patentTitle", patentTitleField.current.value);
            patentPayload.append("patentDate", selectedDate);
            patentPayload.append("registrationNumber", registrationNumberField.current.value);
            patentPayload.append("description", descriptionField.current.value);
            files.forEach((file) => {
                patentPayload.append(`patentFile`, file);
            });

            const patentPayloadRequest = await axios.post(
                `http://localhost:8080/api/v1/lecturer/patent`,
                patentPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "multipart/form-data"
                    },
                }
            );

            const patentPayloadResponse = patentPayloadRequest.data;

            enqueueSnackbar(patentPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (patentPayloadResponse.status) {

                navigate("/lecturer/patent");

            }

        } catch (err) {

            enqueueSnackbar('Cek ulang data anda (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Create Patent -------------------- */


    return (

        <LecturerDashboardLayout>
            <div id="add-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="add-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/lecturer/patent')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Tambah Hak Paten</h1>
                        </Col>
                    </Row>
                    <Row className="form-research">
                        <Col xl={12}>
                            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                <h1>Formulir Hak Paten</h1>
                                <div className="form-research-input">
                                    <Form>
                                        <Row>
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Paten <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan judul paten" autoComplete="off" style={{ fontSize: '14px' }} ref={patentTitleField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput2">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tanggal publikasi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="date" placeholder="Masukan tanggal publikasi" autoComplete="off" style={{ fontSize: '14px' }} onChange={handlePatentDate} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput3">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nomor Pencatatan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan nomor pencatatan" autoComplete="off" style={{ fontSize: '14px' }} ref={registrationNumberField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Deskripsi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan deskripsi" autoComplete="off" style={{ fontSize: '14px' }} ref={descriptionField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group>
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Upload Lampiran Hak Paten <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
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
                                                <Button onClick={onCreatePatent} style={{ background: '#D62C35', border: 'none', fontSize: '16px' }}> Tambah Hak Paten </Button>
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

export default AddPatent;