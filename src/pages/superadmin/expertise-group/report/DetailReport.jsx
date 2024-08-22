import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";
import fileDownload from 'js-file-download';
import axios from "axios";
import moment from "moment-timezone";

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";
import ArrowLeft from "../.././../../assets/images/icons/arrow-left.svg";
import EditIcon from "../../../../assets/images/icons/edit.svg";
import UploadIcon from "../../../../assets/images/icons/document-upload-red.svg";
import DownloadIcon from "../../../../assets/images/icons/iconoir_download.svg";

import "../../../../assets/css/style.css";

const ExpertiseGroupDetailReport = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();

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
                            <Image onClick={() => navigate('/expertisegroup/report')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Detail Laporan</h1>
                        </Col>
                    </Row>
                    <Row className="detail-research-wrapper">
                        <Col xl={12}>
                            <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '20px' }}>
                                <Row>
                                    <Col xl={10} className="d-flex justify-content-start align-items-center">
                                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#292929', margin: 'auto 0' }}>Informasi Penelitian</h5>
                                    </Col>
                                    <Col xl={2} className="d-flex justify-content-end align-items-center">
                                        <Image src={EditIcon} style={{ width: '20px', cursor: 'pointer' }} onClick={() => navigate(`/expertisegroup/report/update/${id}`)} />
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
                                                <Row className="table-body" key={`${note.createdAt}-${index}`} style={{ padding: '0 12px' }}>
                                                    <div className="d-flex align-items-center" style={{ padding: '16px 10px', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA', height: '54px', borderRadius: '6px' }}>
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </SuperadminDashboardLayout>

    );

};

export default ExpertiseGroupDetailReport;