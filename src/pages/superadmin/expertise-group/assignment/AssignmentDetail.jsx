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
import fileDownload from 'js-file-download';
import axios from "axios";

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";
import ArrowLeft from "../../../../assets/images/icons/arrow-left.svg";
import UploadIcon from "../../../../assets/images/icons/document-upload-red.svg";
import DownloadIcon from "../../../../assets/images/icons/iconoir_download.svg";

import "../../../../assets/css/style.css";

const ExpertiseGroupAssignmentDetail = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */

    /* --------- Get Assignment By Id ---------*/

    const [assignmentData, setAssignmentData] = useState();

    const params = useLocation();

    const id = (params.pathname).split('/')[4];

    useEffect(() => {

        const onAssignmentById = async () => {

            try {

                const token = localStorage.getItem("token");

                const getAssignmentRequest = await axios.get(
                    `http://localhost:8080/api/v1/superadmin/assignment/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Access-Control-Allow-Origin": "*"
                        }
                    }
                );

                const getAssignmentResponse = getAssignmentRequest.data;

                setAssignmentData(getAssignmentResponse.data.getAssignment);

            } catch (err) {
                alert(err.message);
            }

        };

        onAssignmentById();

    }, [id]);

    /* --------- End Get Assignment By Id ---------*/


    /* ================ Download File ================ */

    const handleDownload = (url, filename) => {
        const token = localStorage.getItem('token');
        axios.get(url, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                fileDownload(res.data, filename);
            })
            .catch((err) => {
                console.error('Error downloading file:', err);
            });
    };

    /* ================ End Download File ================ */


    /* --------- Update Assignment Value ---------*/

    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const valueField = useRef();

    const onUpdateAssignmentValue = async () => {

        try {

            const token = localStorage.getItem("token");

            const valuePayload = {
                assignmentValue: valueField.current.value
            }


            const valuePayloadRequest = await axios.put(
                `http://localhost:8080/api/v1/superadmin/assignment/value/${id}`,
                valuePayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );


            const valuePayloadResponse = valuePayloadRequest.data;

            enqueueSnackbar(valuePayloadResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (valuePayloadResponse.status) {

                navigate(`/expertisegroup/assignment`);

            }

        } catch (err) {

            enqueueSnackbar('Cek ulang data anda (:', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* --------- End Update Research Value ---------*/


    return (

        <SuperadminDashboardLayout>
            <div id="detail-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="detail-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/expertisegroup/assignment')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Lihat Penugasan</h1>
                        </Col>
                    </Row>
                    <Row className="detail-research-wrapper">
                        <Col xl={9}>
                            <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '20px' }}>
                                <Row>
                                    <Col xl={12} className="d-flex justify-content-start align-items-center">
                                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#292929', margin: 'auto 0' }}>Informasi Penugasan</h5>
                                    </Col>
                                </Row>
                                <div style={{ gap: '20px', marginTop: '20px' }}>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Nama Dosen</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p>{assignmentData ? assignmentData.Lecturer.name : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Judul Penugasan</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p>{assignmentData ? assignmentData.assignmentName : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Jenis Penugasan</h6>
                                            <p>{assignmentData ? assignmentData.assignmentType : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6}>
                                            <h6>Periode</h6>
                                            <p>{assignmentData ? assignmentData.assignmentPeriod : null}</p>
                                        </Col>
                                        <Col xl={6}>
                                            <h6>Tahun Ajaran</h6>
                                            <p>{assignmentData ? assignmentData.academicYear : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Deskripsi Penugasan</h6>
                                            <p>{assignmentData ? assignmentData.assignmentDescription : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Dokumen Pendukung</h6>
                                        </Col>
                                        <Col xl={6}>
                                            <div style={{ display: 'flex', gap: '10px', padding: '15px 10px', background: '#FEF2F3', borderRadius: '4px', zIndex: '999', width: 'fit-content' }}>
                                                <Image src={UploadIcon} style={{ width: '15px' }} />
                                                <p style={{ margin: 'auto 0', color: '#292929', fontSize: '14px' }}>{assignmentData ? assignmentData.assignmentFile : null}</p>
                                                <Image
                                                    src={DownloadIcon} style={{ width: '16px', marginLeft: '40px', cursor: 'pointer' }}
                                                    onClick={() => handleDownload(`http://localhost:8080/${assignmentData ? assignmentData.assignmentFile : null}`, assignmentData ? assignmentData.assignmentFile : null)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3}>
                            <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '20px' }}>
                                <Row>
                                    <Col xl={12} className="d-flex justify-content-start align-items-center">
                                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#292929', margin: 'auto 0' }}>Nilai Penelitian</h5>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col xl={12}>
                                        {isEditing ? (
                                            <Form>
                                                <Form.Group controlId="exampleForm.ControlInput1">
                                                    <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nilai Penelitian</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Masukan Nilai Penelitian"
                                                        autoComplete="off"
                                                        style={{ fontSize: '14px', height: '45px' }}
                                                        ref={valueField}
                                                        defaultValue={assignmentData ? assignmentData.assignmentValue : null}
                                                    />
                                                </Form.Group>
                                                <Col xl={12} className="d-flex justify-content-end align-items-center mt-3">
                                                    <Button
                                                        style={{ width: '120px', fontSize: '14px', backgroundColor: '#D62C35', border: 'none', padding: '10px 12px' }}
                                                        onClick={onUpdateAssignmentValue}
                                                    >
                                                        Simpan Nilai
                                                    </Button>
                                                </Col>
                                            </Form>
                                        ) : (
                                            <div>
                                                {assignmentData?.assignmentValue ? (
                                                    <p style={{ color: '#292929', fontSize: '24px', fontWeight: '700', float: 'right' }}>
                                                        {assignmentData.assignmentValue}
                                                    </p>
                                                ) : (
                                                    <p style={{ color: '#989898', fontSize: '16px' }}>
                                                        Penilaian Belum dilakukan
                                                    </p>
                                                )}
                                                <Col xl={12} className="d-flex justify-content-end align-items-center mt-3">
                                                    <Button
                                                        style={{ width: '120px', fontSize: '14px', backgroundColor: '#D62C35', border: 'none', padding: '10px 12px' }}
                                                        onClick={handleEditClick}
                                                    >
                                                        {assignmentData?.assignmentValue ? 'Ubah Nilai' : 'Berikan Nilai'}
                                                    </Button>
                                                </Col>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </SuperadminDashboardLayout>

    );

};

export default ExpertiseGroupAssignmentDetail;