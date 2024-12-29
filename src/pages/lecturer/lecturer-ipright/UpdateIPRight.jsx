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

const UpdateIPRight = () => {

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


    /* --------- Get IPRight By Id ---------*/

    const [iprightData, setIPRightData] = useState();

    const params = useLocation();

    const id = (params.pathname).split('/')[4];

    useEffect(() => {

        const onIPRightById = async () => {

            try {

                const token = localStorage.getItem("token");

                const getIPRightRequest = await axios.get(
                    `http://localhost:8080/api/v1/lecturer/ipright/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Access-Control-Allow-Origin": "*"
                        }
                    }
                );

                const getIPRightResponse = getIPRightRequest.data;

                setIPRightData(getIPRightResponse.data.getIPRight);

            } catch (err) {
                alert(err.message);
            }

        };

        onIPRightById();

    }, [id]);

    /* --------- End Get IPRight By Id ---------*/


    /* -------------------- Handle Update IPRight -------------------- */

    const [selectedDate, setSelectedDate] = useState();

    const iPRightTitleField = useRef();
    const registrationNumberField = useRef();
    const descriptionField = useRef();

    const handleIPRightDate = (e) => {

        const selectedDate = e.target.value;

        setSelectedDate(selectedDate);

    };

    const onUpdateIPRight = async () => {

        try {

            const token = localStorage.getItem("token");

            const iprightPayload = new FormData();
            iprightPayload.append("iPRightTitle", iPRightTitleField.current.value);
            iprightPayload.append("iPRightDate", selectedDate);
            iprightPayload.append("registrationNumber", registrationNumberField.current.value);
            iprightPayload.append("description", descriptionField.current.value);
            files.forEach((file) => {
                iprightPayload.append(`ipRightFile`, file);
            });


            const iprightPayloadRequest = await axios.put(
                `http://localhost:8080/api/v1/lecturer/ipright/${id}`,
                iprightPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "multipart/form-data"
                    },
                }
            );


            const iprightPayloadResponse = iprightPayloadRequest.data;

            enqueueSnackbar(iprightPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (iprightPayloadResponse.status) {

                navigate("/lecturer/ipright");

            }

        } catch (err) {

            enqueueSnackbar('Cek ulang data anda (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Update IPRight -------------------- */


    return (

        <LecturerDashboardLayout>
            <div id="update-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="update-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/lecturer/ipright')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Edit HAKI</h1>
                        </Col>
                    </Row>
                    <Row className="form-research">
                        <Col xl={12}>
                            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                <h1>Formulir HAKI</h1>
                                <div className="form-research-input">
                                    <Form>
                                        <Row>
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul HAKI <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Judul HAKI" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={iprightData ? iprightData.iPRightTitle : null} ref={iPRightTitleField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tanggal Publikasi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="date" placeholder="Masukan Tanggal Publikasi" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={iprightData ? iprightData.iPRightDate : null} onChange={handleIPRightDate} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput3">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nomor Pencatatan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan nomor pencatatan" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={iprightData ? iprightData.registrationNumber : null} ref={registrationNumberField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Deskripsi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan deskripsi" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={iprightData ? iprightData.description : null} ref={descriptionField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group>
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Upload Dokumen HAKI <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
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
                                                                defaultValue={iprightData ? iprightData.ipRightFile : null}
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
                                                                            {iprightData ? (
                                                                                <Col xl={12} className="d-flex justify-content-start">
                                                                                    <div style={{ display: 'flex', gap: '10px', padding: '5px 10px', background: '#FAFAFA', borderRadius: '4px', zIndex: '999' }}>
                                                                                        <Image src={UploadIcon} style={{ width: '15px' }} />
                                                                                        <p style={{ margin: 'auto 0', color: '#292929' }}>
                                                                                            {iprightData
                                                                                                ? iprightData.ipRightFile
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
                                                <Button onClick={onUpdateIPRight} style={{ background: '#D62C35', border: 'none', fontSize: '16px' }}> Simpan Perubahan </Button>
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

export default UpdateIPRight;