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

import LecturerDashboardLayout from "../../../layouts/dashboard/LecturerDashboardLayout";
import ArrowLeft from "../../../assets/images/icons/arrow-left.svg";
import EditIcon from "../../../assets/images/icons/edit.svg";
import UploadIcon from "../../../assets/images/icons/document-upload-red.svg";
import DownloadIcon from "../../../assets/images/icons/iconoir_download.svg";

import { formatDate } from "../../../helper/formatDate";

import "../../../assets/css/style.css";

const IPRightDetail = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();

    /* -------------------- End Global Variable -------------------- */

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


    return (

        <LecturerDashboardLayout>
            <div id="detail-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="detail-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/lecturer/ipright')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Lihat HAKI</h1>
                        </Col>
                    </Row>
                    <Row className="detail-research-wrapper">
                        <Col xl={9}>
                            <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '20px' }}>
                                <Row>
                                    <Col xl={10} className="d-flex justify-content-start align-items-center">
                                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#292929', margin: 'auto 0' }}>Informasi HAKI</h5>
                                    </Col>
                                    <Col xl={2} className="d-flex justify-content-end align-items-center">
                                        <Image src={EditIcon} style={{ width: '20px', cursor: 'pointer' }} onClick={() => navigate(`/lecturer/ipright/update/${id}`)}/>
                                    </Col>
                                </Row>
                                <div style={{ gap: '20px', marginTop: '20px' }}>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Nama Dosen</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p>{iprightData ? iprightData.Lecturer.name : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Judul HAKI</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p>{iprightData ? iprightData.iPRightTitle : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6}>
                                            <h6>Nomor Pencatatan</h6>
                                            <p>{iprightData ? iprightData.registrationNumber : null}</p>
                                        </Col>
                                        <Col xl={6}>
                                            <h6>Tanggal Publikasi</h6>
                                            <p>{formatDate(iprightData ? iprightData.iPRightDate : null)}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Deskripsi</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p>{iprightData ? iprightData.description : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Dokumen Pendukung</h6>
                                        </Col>
                                        <Col xl={6}>
                                            <div style={{ display: 'flex', gap: '10px', padding: '15px 10px', background: '#FEF2F3', borderRadius: '4px', zIndex: '999', width: 'fit-content' }}>
                                                <Image src={UploadIcon} style={{ width: '15px' }} />
                                                <p style={{ margin: 'auto 0', color: '#292929', fontSize: '14px' }}>{iprightData ? iprightData.ipRightFile : null}</p>
                                                <Image 
                                                    src={DownloadIcon} style={{ width: '16px', marginLeft: '40px', cursor: 'pointer' }}
                                                    onClick={() => handleDownload(`http://localhost:8080/${iprightData ? iprightData.ipRightFile : null}`, iprightData ? iprightData.ipRightFile : null)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LecturerDashboardLayout>

    );

};

export default IPRightDetail;