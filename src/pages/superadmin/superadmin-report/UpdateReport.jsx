import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
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
import UploadIcon from "../../../assets/images/icons/document-upload.svg";
import CloseIcon from "../../../assets/images/icons/Close.svg";

import "../../../assets/css/style.css";

const SuperadminUpdateReport = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* --------- Get Report By Id ---------*/

    const [reportData, setReportData] = useState();

    const params = useLocation();

    const id = (params.pathname).split('/')[4];

    useEffect(() => {

        const onReportById = async () => {

            try {

                const token = localStorage.getItem("token");

                const getReportRequest = await axios.get(
                    `http://localhost:8080/api/v1/superadmin/report/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Access-Control-Allow-Origin": "*"
                        }
                    }
                );

                const getReportResponse = getReportRequest.data;

                setReportData(getReportResponse.data.getReport);

            } catch (err) {
                alert(err.message);
            }

        };

        onReportById();

    }, [id]);

    /* --------- End Get Report By Id ---------*/


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
        setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    /* --------- End Upload File ---------*/


    /* -------------------- Update Report -------------------- */

    const reportTitleField = useRef();
    const periodField = useRef();
    const taField = useRef();

    const onUpdateReport = async () => {

        try {

            const token = localStorage.getItem("token");

            const reportPayload = new FormData();
            reportPayload.append("reportTitle", reportTitleField.current.value);
            reportPayload.append("period", periodField.current.value);
            reportPayload.append("ta", taField.current.value);
            files.forEach((file) => {
                reportPayload.append(`reportFile`, file);
            });

            const updateReportRequest = await axios.put(
                `http://localhost:8080/api/v1/superadmin/report/${id}`,
                reportPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "multipart/form-data"
                    },
                }
            );
            

            const updateReportResponse = updateReportRequest.data;

            enqueueSnackbar(updateReportResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (updateReportResponse.status) {

                navigate("/superadmin/report");

            }
            
        } catch (err) {
            
            enqueueSnackbar(err.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };
    
    /* -------------------- End Update Report -------------------- */

    return (

        <SuperadminDashboardLayout>
            <div id="add-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="add-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/superadmin/report')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Edit Laporan</h1>
                        </Col>
                    </Row>
                    <Row className="form-research">
                        <Col xl={12}>
                            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                <h1>Form Edit Laporan</h1>
                                <div className="form-research-input">
                                    <Form>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput2">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Laporan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Contoh: Perbandingan Metode X terhadap Y" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={reportData ? reportData.reportTitle : null} ref={reportTitleField}/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput3">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Periode <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="email" placeholder="Contoh: Genap" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={reportData ? reportData.period : null} ref={periodField}/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput4">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tahun Ajaran <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Contoh: 2024" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={reportData ? reportData.ta : null} ref={taField}/>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group>
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Upload Dokumen <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
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
                                                            />
                                                            <Row>
                                                            {
                                                                    files.length > 0 ? (
                                                                        <Col xl={12} className="d-flex justify-content-start">
                                                                            <div style={{ display: 'flex', gap: '10px', padding: '5px 10px', background: '#FAFAFA', borderRadius: '4px', zIndex: '999' }}>
                                                                                <Image src={UploadIcon} style={{ width: '15px' }} />
                                                                                <p style={{ margin: 'auto 0', color: '#292929' }}>{files.map(file => file.name).join(', ')}</p>
                                                                                <Image key={files.name} onClick={() => handleRemoveFile(files.name)} src={CloseIcon} style={{ width: '15px', marginLeft: '40px' }} />
                                                                            </div>
                                                                        </Col>
                                                                    ) : (
                                                                        <>
                                                                            {reportData ? (
                                                                                <Col xl={12} className="d-flex justify-content-start">
                                                                                    <div style={{ display: 'flex', gap: '10px', padding: '5px 10px', background: '#FAFAFA', borderRadius: '4px', zIndex: '999' }}>
                                                                                        <Image src={UploadIcon} style={{ width: '15px' }} />
                                                                                        <p style={{ margin: 'auto 0', color: '#292929' }}>
                                                                                            {reportData
                                                                                                ? reportData.reportFile
                                                                                                : files.map(file => file.name).join(', ')
                                                                                            }
                                                                                        </p>
                                                                                        <Image key={files.name} onClick={() => handleRemoveFile(files.name)} src={CloseIcon} style={{ width: '15px', marginLeft: '40px' }} />
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
                                                                            )}
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
                                                <Button onClick={onUpdateReport} style={{ background: '#D62C35', border: 'none', fontSize: '16px' }}> Simpan Perubahan </Button>
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

export default SuperadminUpdateReport;