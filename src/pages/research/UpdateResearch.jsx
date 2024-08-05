import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Form
} from "react-bootstrap";

import DashboardLayout from "../../layouts/dashboard/DashboardLayout";

import ArrowLeft from "../../assets/images/icons/arrow-left.svg";
import UploadIcon from "../../assets/images/icons/document-upload.svg";
import CloseIcon from "../../assets/images/icons/Close.svg";

import "../../assets/css/style.css";

const UpdateResearch = () => {

    const navigate = useNavigate();

    /* --------- Upload File ---------*/

    const [fileNames, setFileNames] = useState('');

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        handleFiles(files);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        setFileNames(fileNames);
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setFileNames('');
    };

    /* --------- End Upload File ---------*/

    return (

        <DashboardLayout>
            <div id="add-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="add-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/research')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Tambah Penelitan</h1>
                        </Col>
                    </Row>
                    <Row className="form-research">
                        <Col xl={12}>
                            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                <h1>Roadmap Penelitian</h1>
                                <div className="form-research-input">
                                    <Form>
                                        <Row>
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Penelitian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Judul Penelitian" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Kategori Penelitian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Kategori Penelitian" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Periode Penelitian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Periode Penelitian" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tahun Ajaran <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Tahun Ajaran" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Upload Dokumen Penelitian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
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
                                                                multiple
                                                                onChange={handleFileChange}
                                                                style={{ display: 'none' }}
                                                            />
                                                            <Row>
                                                                {
                                                                    fileNames ? (
                                                                        <Col xl={12} className="d-flex justify-content-start">
                                                                            <div style={{display:'flex', gap: '10px' , padding: '5px 10px', background: '#FAFAFA', borderRadius: '4px', zIndex: '999'}}>
                                                                                <Image src={UploadIcon} style={{width: '15px'}}/>
                                                                                <p style={{ margin: 'auto 0', color: '#292929' }}>{fileNames}</p>
                                                                                <Image onClick={handleRemoveFile} src={CloseIcon} style={{width: '15px', marginLeft: '40px'}}/>
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
                                                <Button style={{ background: '#D62C35', border: 'none', fontSize: '16px' }}> Simpan Perubahan </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </DashboardLayout>

    );

};

export default UpdateResearch;