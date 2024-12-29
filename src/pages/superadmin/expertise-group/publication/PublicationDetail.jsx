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

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";
import ArrowLeft from "../../../../assets/images/icons/arrow-left.svg";
import UploadIcon from "../../../../assets/images/icons/document-upload-red.svg";
import DownloadIcon from "../../../../assets/images/icons/iconoir_download.svg";

import "../../../../assets/css/style.css";

const ExpertiseGroupPublicationDetail = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();

    /* -------------------- End Global Variable -------------------- */

    /* --------- Get Publication By Id ---------*/

    const [publicationData, setPublicationData] = useState();

    const params = useLocation();

    const id = (params.pathname).split('/')[4];

    useEffect(() => {

        const onPublicationById = async () => {

            try {

                const token = localStorage.getItem("token");

                const getPublicationRequest = await axios.get(
                    `http://localhost:8080/api/v1/superadmin/publication/${id}`,
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

        <SuperadminDashboardLayout>
            <div id="detail-research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="detail-research-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/expertisegroup/publication')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Lihat Publikasi</h1>
                        </Col>
                    </Row>
                    <Row className="detail-research-wrapper">
                        <Col xl={9}>
                            <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '20px' }}>
                                <Row>
                                    <Col xl={12} className="d-flex justify-content-start align-items-center">
                                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#292929', margin: 'auto 0' }}>Informasi Publikasi</h5>
                                    </Col>
                                </Row>
                                <div style={{ gap: '20px', marginTop: '20px' }}>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Nama Dosen</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p>{publicationData ? publicationData.Lecturer.name : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Judul Publikasi</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p>{publicationData ? publicationData.publicationTitle : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={6}>
                                            <h6>Jenis Publikasi</h6>
                                            <p>{publicationData ? publicationData.publicationType : null}</p>
                                        </Col>
                                        <Col xl={6}>
                                            <h6>Nama Jurnal</h6>
                                            <p>{publicationData ? publicationData.journalName : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>URL Publikasi</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p onClick={() => window.location.href = `${publicationData ? publicationData.urlPublication : null}`} style={{color:'#2181E8', textDecoration: 'underline', cursor: 'pointer'}}>Lihat Publikasi</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Dokumen Pendukung</h6>
                                        </Col>
                                        <Col xl={6}>
                                            <div style={{ display: 'flex', gap: '10px', padding: '15px 10px', background: '#FEF2F3', borderRadius: '4px', zIndex: '999', width: 'fit-content' }}>
                                                <Image src={UploadIcon} style={{ width: '15px' }} />
                                                <p style={{ margin: 'auto 0', color: '#292929', fontSize: '14px' }}>{publicationData ? publicationData.publicationFile : null}</p>
                                                <Image 
                                                    src={DownloadIcon} style={{ width: '16px', marginLeft: '40px', cursor: 'pointer' }}
                                                    onClick={() => handleDownload(`http://localhost:8080/${publicationData ? publicationData.publicationFile : null}`, publicationData ? publicationData.publicationFile : null)}
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
        </SuperadminDashboardLayout>

    );

};

export default ExpertiseGroupPublicationDetail;