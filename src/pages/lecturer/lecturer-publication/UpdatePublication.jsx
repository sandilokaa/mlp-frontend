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

const UpdatePublication = () => {

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


    /* --------- Get Publication By Id ---------*/

    const [publicationData, setPublicationData] = useState();

    const params = useLocation();

    const id = (params.pathname).split('/')[4];

    useEffect(() => {

        const onPublicationById = async () => {

            try {

                const token = localStorage.getItem("token");

                const getPublicationRequest = await axios.get(
                    `http://localhost:8080/api/v1/lecturer/publication/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Access-Control-Allow-Origin": "*"
                        }
                    }
                );

                const getPublicationResponse = getPublicationRequest.data;

                setPublicationData(getPublicationResponse.data.getPublication);

            } catch (err) {
                alert(err.message);
            }

        };

        onPublicationById();

    }, [id]);

    /* --------- End Get Publication By Id ---------*/


    /* -------------------- Handle Update Publication -------------------- */

    const publicationTitleField = useRef();
    const publicationTypeField = useRef();
    const journalNameField = useRef();
    const urlPublicationField = useRef();

    const onUpdatePublication = async () => {

        try {

            const token = localStorage.getItem("token");

            const publicationPayload = new FormData();
            publicationPayload.append("publicationTitle", publicationTitleField.current.value);
            publicationPayload.append("publicationType", publicationTypeField.current.value);
            publicationPayload.append("journalName", journalNameField.current.value);
            publicationPayload.append("urlPublication", urlPublicationField.current.value);
            files.forEach((file) => {
                publicationPayload.append(`publicationFile`, file);
            });


            const publicationPayloadRequest = await axios.put(
                `http://localhost:8080/api/v1/lecturer/publication/${id}`,
                publicationPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "multipart/form-data"
                    },
                }
            );


            const publicationPayloadResponse = publicationPayloadRequest.data;

            enqueueSnackbar(publicationPayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (publicationPayloadResponse.status) {

                navigate("/lecturer/publication");

            }

        } catch (err) {

            enqueueSnackbar('Cek ulang data anda (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Handle Update Publication -------------------- */


    return (

        <LecturerDashboardLayout>
            <div id="update-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="update-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/lecturer/publication')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Edit Publikasi</h1>
                        </Col>
                    </Row>
                    <Row className="form-research">
                        <Col xl={12}>
                            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                <h1>Formulir Publikasi</h1>
                                <div className="form-research-input">
                                    <Form>
                                        <Row>
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Publikasi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Judul Publikasi" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={publicationData ? publicationData.publicationTitle : null} ref={publicationTitleField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jenis Publikasi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Jenis Publikasi" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={publicationData ? publicationData.publicationType : null} ref={publicationTypeField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput3">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nama Jurnal <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Nama Jurnal" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={publicationData ? publicationData.journalName : null} ref={journalNameField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput4">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>URL Publikasi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan URL Publikasi" autoComplete="off" style={{ fontSize: '14px' }} defaultValue={publicationData ? publicationData.urlPublication : null} ref={urlPublicationField} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group>
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Upload Dokumen Publikasi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
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
                                                                defaultValue={publicationData ? publicationData.researchFile : null}
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
                                                                            {publicationData ? (
                                                                                <Col xl={12} className="d-flex justify-content-start">
                                                                                    <div style={{ display: 'flex', gap: '10px', padding: '5px 10px', background: '#FAFAFA', borderRadius: '4px', zIndex: '999' }}>
                                                                                        <Image src={UploadIcon} style={{ width: '15px' }} />
                                                                                        <p style={{ margin: 'auto 0', color: '#292929' }}>
                                                                                            {publicationData
                                                                                                ? publicationData.publicationFile
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
                                                <Button onClick={onUpdatePublication} style={{ background: '#D62C35', border: 'none', fontSize: '16px' }}> Simpan Perubahan </Button>
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

export default UpdatePublication;