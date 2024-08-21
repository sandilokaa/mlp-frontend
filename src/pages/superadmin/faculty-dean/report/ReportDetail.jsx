import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Container,
    Row,
    Col,
    Image,
    Button
} from "react-bootstrap";
import fileDownload from 'js-file-download';
import axios from "axios";
import moment from "moment-timezone";

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";
import ArrowLeft from "../.././../../assets/images/icons/arrow-left.svg";
import UploadIcon from "../../../../assets/images/icons/document-upload-red.svg";
import DownloadIcon from "../../../../assets/images/icons/iconoir_download.svg";

import "../../../../assets/css/style.css";

const DeanReportDetail = () => {


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


    /* --------- Get Note By Report Id ---------*/

    const [noteData, setNoteData] = useState();

    useEffect(() => {

        const onNoteByReportId = async () => {

            try {

                const token = localStorage.getItem("token");

                const getNoteRequest = await axios.get(
                    `http://localhost:8080/api/v1/superadmin/${id}/note`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Access-Control-Allow-Origin": "*"
                        }
                    }
                );

                const getNoteResponse = getNoteRequest.data;

                setNoteData(getNoteResponse.data.getNote);

            } catch (err) {
                alert(err.message);
            }

        };

        onNoteByReportId();

    }, [id]);

    /* --------- End Get Note By Report Id ---------*/


    /* --------- Update Report Done ---------*/

    const onDoneReportUpdate = async () => {

        try {

            const token = localStorage.getItem("token");

            const updateReportRequest = await axios.post(
                `http://localhost:8080/api/v1/superadmin/note/done`,
                {
                    reportId: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );


            const updateReportResponse = updateReportRequest.data;

            enqueueSnackbar(updateReportResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (updateReportResponse.status) {

                navigate("/dean/report");

            }

        } catch (err) {

            enqueueSnackbar(err.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* --------- End Update Report Done ---------*/


    /* --------- Create Report ---------*/

    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    /* --------- End Create Report ---------*/


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

    /* ================ Format Date ================ */

    const formatDate = (dateString) => {
        const date = moment(dateString).tz('Asia/Jakarta');
        return date.format('DD/MM/YYYY HH:mm');
    };

    /* ================ End Format Date ================ */

    return (

        <SuperadminDashboardLayout>
            <div id="detail-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="detail-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/dean/report')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Detail Laporan</h1>
                        </Col>
                    </Row>
                    <Row className="detail-research-wrapper">
                        <Col xl={12}>
                            <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '20px' }}>
                                <Row>
                                    <Col xl={12} className="d-flex justify-content-start align-items-center">
                                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#292929', margin: 'auto 0' }}>Informasi Penelitian</h5>
                                    </Col>
                                </Row>
                                <div style={{ gap: '20px', marginTop: '20px' }}>
                                    <Row>
                                        <Col xl={5}>
                                            <h6>Judul Laporan</h6>
                                            <p>{reportData ? reportData.reportName : null}</p>
                                        </Col>
                                        <Col xl={2}>
                                            <h6>Periode</h6>
                                            <p>{reportData ? reportData.reportPeriod : null}</p>
                                        </Col>
                                        <Col xl={2}>
                                            <h6>Tahun Ajaran</h6>
                                            <p>{reportData ? reportData.academicYear : null}</p>
                                        </Col>
                                        <Col xl={3}>
                                            <h6>Last Update</h6>
                                            <p>{formatDate(reportData ? reportData.updatedAt : null)}</p>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: '20px' }}>
                                        <Col xl={12}>
                                            <h6>Dokumen Pendukung</h6>
                                        </Col>
                                        <Col xl={6}>
                                            <div style={{ display: 'flex', gap: '10px', padding: '15px 10px', background: '#FEF2F3', borderRadius: '4px', zIndex: '999', width: 'fit-content' }}>
                                                <Image src={UploadIcon} style={{ width: '15px' }} />
                                                <p style={{ margin: 'auto 0', color: '#292929', fontSize: '14px' }}>{reportData ? reportData.reportFile : null}</p>
                                                <Image
                                                    src={DownloadIcon} style={{ width: '16px', marginLeft: '40px', cursor: 'pointer' }}
                                                    onClick={() => handleDownload(`http://localhost:8080/${reportData ? reportData.reportFile : null}`, reportData ? reportData.reportFile : null)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="detail-research-wrapper">
                        <Col xl={12}>
                            <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '20px' }}>
                                <Row>
                                    <Col xl={12} className="d-flex justify-content-start align-items-center">
                                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#292929', margin: 'auto 0' }}>Catatan</h5>
                                    </Col>
                                </Row>
                                {noteData && noteData.length > 0 ? (
                                    <div className="research-table-content mt-4">
                                        <Row className="table-head">
                                            <Col xl={3}>
                                                <h6 style={{ color: '#292929' }}>Tanggal</h6>
                                            </Col>
                                            <Col xl={9} className="text-center d-flex justify-content-start">
                                                <h6 style={{ color: '#292929' }}>Catatan</h6>
                                            </Col>
                                        </Row>
                                        <hr style={{ marginTop: '10px' }} />
                                        {noteData.slice().reverse().map((note, index) => {
                                            return (
                                                <Row className="table-body" key={`${note.createdAt}-${index}`}>
                                                    <div className="d-flex align-items-center" style={{ padding: '16px 20px', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA', height: '54px' }}>
                                                        <Col xl={3}>
                                                            <h6 style={{ color: '#292929', fontSize: '14px', margin: 'auto 10px' }}>{formatDate(note.createdAt)}</h6>
                                                        </Col>
                                                        <Col xl={9}>
                                                            <h6 style={{ color: '#292929', fontSize: '14px', margin: 'auto 10px' }}>{note.note}</h6>
                                                        </Col>
                                                    </div>
                                                </Row>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <Row className="mt-4">
                                        <Col xl={12} className="text-center">
                                            <p style={{ fontSize: '16px', color: '#989898', margin: 'auto 0' }}>Belum ada catatan ditambahkan</p>
                                        </Col>
                                    </Row>
                                )}

                                {isEditing ? (
                                    <Row> Halo</Row>
                                ) : (
                                    <Row className="mt-4">
                                        <Col xl={6} className="d-flex justify-content-end align-items-center">
                                            <Button
                                                onClick={() => onDoneReportUpdate()}
                                                style={{ backgroundColor: '#D62C35', border: '1px solid #D62C35' }}
                                            >
                                                Tandai Selesai
                                            </Button>
                                        </Col>
                                        <Col xl={6} className="d-flex align-items-center p-0">
                                            <Button
                                                onClick={handleEditClick}
                                                style={{ backgroundColor: 'transparent', border: '1px solid #D62C35', color: '#D62C35' }}
                                            >
                                                Tambahkan Catatan
                                            </Button>
                                        </Col>
                                    </Row>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </SuperadminDashboardLayout>

    );

};

export default DeanReportDetail;