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

import "../../../assets/css/style.css";

const LecturerDetailResearch = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();

    /* -------------------- End Global Variable -------------------- */

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

    /* --------- End Get Research By Id ---------*/


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
                            <Image onClick={() => navigate('/lecturer/research')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Detail Penelitan</h1>
                        </Col>
                    </Row>
                    <Row className="detail-research-wrapper">
                        <Col xl={9}>
                            <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', marginTop: '20px' }}>
                                <Row>
                                    <Col xl={10} className="d-flex justify-content-start align-items-center">
                                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#292929', margin: 'auto 0' }}>Informasi Penelitian</h5>
                                    </Col>
                                    <Col xl={2} className="d-flex justify-content-end align-items-center">
                                        <Image src={EditIcon} style={{ width: '20px', cursor: 'pointer' }} onClick={() => navigate(`/lecturer/research/update/${id}`)}/>
                                    </Col>
                                </Row>
                                <div style={{ gap: '20px', marginTop: '20px' }}>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Nama Dosen</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p>{researchData ? researchData.LecturerDetail.Lecturer.name : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Judul Penelitian</h6>
                                        </Col>
                                        <Col xl={12}>
                                            <p>{researchData ? researchData.title : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={4}>
                                            <h6>Kategori Penelitian</h6>
                                            <p>{researchData ? researchData.category : null}</p>
                                        </Col>
                                        <Col xl={4}>
                                            <h6>Periode</h6>
                                            <p>{researchData ? researchData.period : null}</p>
                                        </Col>
                                        <Col xl={4}>
                                            <h6>Tahun Ajaran</h6>
                                            <p>{researchData ? researchData.ta : null}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <h6>Dokumen Pendukung</h6>
                                        </Col>
                                        <Col xl={6}>
                                            <div style={{ display: 'flex', gap: '10px', padding: '15px 10px', background: '#FEF2F3', borderRadius: '4px', zIndex: '999', width: 'fit-content' }}>
                                                <Image src={UploadIcon} style={{ width: '15px' }} />
                                                <p style={{ margin: 'auto 0', color: '#292929', fontSize: '14px' }}>{researchData ? researchData.researchFile : null}</p>
                                                <Image 
                                                    src={DownloadIcon} style={{ width: '16px', marginLeft: '40px', cursor: 'pointer' }}
                                                    onClick={() => handleDownload(`http://localhost:8080/${researchData ? researchData.researchFile : null}`, researchData ? researchData.researchFile : null)}
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
                                <Row className="mt-4">
                                    <Col xl={12} className="d-flex justify-content-start align-items-center">
                                        {researchData && researchData.ResearchValue.value ? (
                                            <p style={{ color: '#292929', fontSize: '24px', fontWeight: '700' }}>{researchData.ResearchValue.value}</p>
                                        ) : (
                                            <p style={{ color: '#989898' }}>Penelitian Belum dilakukan</p>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LecturerDashboardLayout>

    );

};

export default LecturerDetailResearch;