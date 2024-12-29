import React, { useState, useEffect, useRef } from "react";
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

import LecturerDashboardLayout from "../../../layouts/dashboard/LecturerDashboardLayout";

import ArrowLeft from "../../../assets/images/icons/arrow-left.svg";
import UploadIcon from "../../../assets/images/icons/document-upload.svg";
import CloseIcon from "../../../assets/images/icons/Close.svg";

import "../../../assets/css/style.css";

const UpdateResearch = () => {

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
        setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    /* --------- End Upload File ---------*/


    /* --------- Get Research By Id ---------*/

    const [researchData, setResearchData] = useState();

    const params = useLocation();

    const id = (params.pathname).split('/')[4];

    useEffect(() => {

        const onResearchById = async () => {

            try {

                const token = localStorage.getItem("token");

                const getResearchRequest = await axios.get(
                    `http://localhost:8080/api/v1/lecturer/research/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Access-Control-Allow-Origin": "*"
                        }
                    }
                );

                const getResearchResponse = getResearchRequest.data;

                setResearchData(getResearchResponse.data.getResearch);

            } catch (err) {
                alert(err.message);
            }

        };

        onResearchById();

    }, [id]);

    /* --------- End Get Devotion By Id ---------*/


    /* -------------------- Handle Update research -------------------- */

    const researchNameField = useRef();
    const researchCategoryField = useRef();
    const researchPeriodField = useRef();
    const academicYearField = useRef();

    const onUpdateResearch = async () => {

        try {

            const token = localStorage.getItem("token");

            const researchPayload = new FormData();
            researchPayload.append("researchName", researchNameField.current.value);
            researchPayload.append("researchCategory", researchCategoryField.current.value);
            researchPayload.append("researchPeriod", researchPeriodField.current.value);
            researchPayload.append("academicYear", academicYearField.current.value);
            files.forEach((file) => {
                researchPayload.append(`researchFile`, file);
            });


            const researchPayloadRequest = await axios.put(
                `http://localhost:8080/api/v1/lecturer/research/${id}`,
                researchPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "multipart/form-data"
                    },
                }
            );


            const researchPayloadResponse = researchPayloadRequest.data;

            enqueueSnackbar(researchPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (researchPayloadResponse.status) {

                navigate("/lecturer/research");

            }

        } catch (err) {

            enqueueSnackbar('Cek ulang data anda (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Update Research -------------------- */


    return (

        <LecturerDashboardLayout>
            <div id="update-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="update-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/lecturer/research')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Edit Penelitian</h1>
                        </Col>
                    </Row>
                    <Row className="form-research">
                        <Col xl={12}>
                            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                <h1>Formulir Penelitian</h1>
                                <div className="form-research-input">
                                    <Form>
                                        <Row>
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nama Penelitian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Nama Penelitian" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={researchData ? researchData.researchName : null} ref={researchNameField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Kategori Penelitian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Kategori Penelitian" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={researchData ? researchData.researchCategory : null} ref={researchCategoryField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput3">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Periode Penelitian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan periode" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={researchData ? researchData.researchPeriod : null} ref={researchPeriodField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput4">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tahun Ajaran <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan tahun ajaran" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={researchData ? researchData.academicYear : null} ref={academicYearField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group>
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
                                                                defaultValue={researchData ? researchData.researchFile : null}
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
                                                                            {researchData ? (
                                                                                <Col xl={12} className="d-flex justify-content-start">
                                                                                    <div style={{ display: 'flex', gap: '10px', padding: '5px 10px', background: '#FAFAFA', borderRadius: '4px', zIndex: '999' }}>
                                                                                        <Image src={UploadIcon} style={{ width: '15px' }} />
                                                                                        <p style={{ margin: 'auto 0', color: '#292929' }}>
                                                                                            {researchData
                                                                                                ? researchData.researchFile
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
                                                <Button onClick={onUpdateResearch} style={{ background: '#D62C35', border: 'none', fontSize: '16px' }}> Simpan Perubahan </Button>
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

export default UpdateResearch;