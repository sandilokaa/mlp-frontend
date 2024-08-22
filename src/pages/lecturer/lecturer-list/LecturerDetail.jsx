import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";
import axios from "axios";

import LecturerDashboardLayout from "../../../layouts/dashboard/LecturerDashboardLayout";

import ProfileImage from "../../../assets/images/profile.png";
import ArrowLeft from "../../../assets/images/icons/arrow-left.svg";

import "../../../assets/css/style.css";

const OtherLecturerDetail = () => {

    const navigate = useNavigate();

    /* ================ Get Lecturer Data ================ */


    const [lecturerData, setLecturerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useLocation();

    const id = (params.pathname).split('/')[4];

    const lecturerDetailData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/lecturer/group/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getLecturerDetail;

            setLecturerData(getDataResponse);
            setLoading(false);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        lecturerDetailData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================ End Get Lecturer Data ================ */


    /* ================ Get Expertise Data ================ */

    const getExpertise = (educationLevel) => {
        try {
            const educationData = JSON.parse(lecturerData.LecturerEducation?.[educationLevel] || '{}');
            return educationData.expertise ? educationData.expertise.split(', ').map(exp => exp.trim()) : [];
        } catch (error) {
            console.error('Parsing error:', error);
            return [];
        }
    };

    const doctorExpertise = getExpertise('doctor');
    const magisterExpertise = getExpertise('magister');
    const bachelorExpertise = getExpertise('bachelor');

    const allExpertise = [...doctorExpertise, ...magisterExpertise, ...bachelorExpertise];

    const uniqueExpertise = Array.from(new Set(allExpertise));

    const expertiseString = uniqueExpertise.join(', ');

    /* ================ End Get Expertise Data ================ */


    return (

        <LecturerDashboardLayout>
            <div id="lecturer-profile-content">
                <Container fluid style={{ padding: '0 20px 0 32px' }}>
                    <Row>
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/lecturer/list')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1 style={{ fontSize: '16px', fontWeight: '700', margin: 'auto 0' }}>Data Dosen</h1>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={6} style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px', height: 'fit-content' }}>
                            <div>
                                <h1 style={{ fontSize: '14px', fontWeight: '700' }}>Profile Dosen</h1>
                            </div>
                            <div className="profile-personal">
                                <Row>
                                    <Col xl={3}>
                                        <div className="photo-wrapper" style={{ height: '150px', width: '100%', background: '#989898' }}>
                                            <Image src={ProfileImage} style={{ width: '100%', height: '100%' }} />
                                        </div>
                                    </Col>
                                    <Col xl={8}>
                                        <div className="profile-general-information">
                                            <h5>Informasi Umum</h5>
                                            <div className="profile-general-information-describe">
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Nomor Induk Pegawai</h6>
                                                        <p>{lecturerData.LecturerPersonal ? lecturerData.LecturerPersonal.nip : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Nama Dosen</h6>
                                                        <p>{lecturerData.Lecturer ? lecturerData.Lecturer.name : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Kelompok Keahlian</h6>
                                                        <p>{lecturerData.Lecturer ? lecturerData.Lecturer.groupName : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Pendidikan Terakhir</h6>
                                                        <p>
                                                            {loading ? (
                                                                <p>Loading...</p>
                                                            ) :
                                                                (lecturerData.LecturerEducation?.doctor && JSON.parse(lecturerData.LecturerEducation.doctor).title) ? 'Doctor'
                                                                    : (lecturerData.LecturerEducation?.magister && JSON.parse(lecturerData.LecturerEducation.magister).title) ? 'Magister'
                                                                        : (lecturerData.LecturerEducation?.bachelor && JSON.parse(lecturerData.LecturerEducation.bachelor).title) ? 'Bachelor'
                                                                            : 'Tidak ada data'
                                                            }
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Keahlian</h6>
                                                        {
                                                            expertiseString ? (
                                                                <p>{expertiseString}</p>
                                                            ) : (
                                                                <p>-</p>
                                                            )
                                                        }
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="profile-other-information">
                                            <h5>Informasi Lainnya</h5>
                                            <div className="profile-other-information-describe">
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Jenis Kelamin</h6>
                                                        <p>{lecturerData.LecturerPersonal ? lecturerData.LecturerPersonal.gender : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Tempat, Tanggal Lahir</h6>
                                                        <p>{lecturerData.LecturerPersonal ? lecturerData.LecturerPersonal.placeOfBirth : null}, {lecturerData.LecturerPersonal ? lecturerData.LecturerPersonal.dateOfBirth : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Alamat</h6>
                                                        <p>{lecturerData.LecturerPersonal ? lecturerData.LecturerPersonal.address : null}</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="profile-contact-information">
                                            <h5>Informasi Kontak</h5>
                                            <div className="profile-contact-information-describe">
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Email</h6>
                                                        <p>{lecturerData.Lecturer ? lecturerData.Lecturer.email : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>No. HP</h6>
                                                        <p>{lecturerData.LecturerPersonal ? lecturerData.LecturerPersonal.phoneNumber : null}</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xl={6}>
                            <div>
                                <Col xl={12} style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px', height: 'fit-content' }}>
                                    <div>
                                        <h1 style={{ fontSize: '14px', fontWeight: '700' }}>Penilaian Kerja</h1>
                                    </div>
                                    <div className="work-assessment">
                                        <Row>
                                            <Col xl={6}>
                                                <h6 style={{ marginTop: '12px', fontSize: '10px', color: '#989898' }}>Nilai</h6>
                                                {lecturerData && lecturerData.averageValue ? (
                                                    <p style={{ fontSize: '14px', color: '#292929' }}>{lecturerData.averageValue}</p>
                                                ) : (
                                                    <p style={{ fontSize: '14px', color: '#292929' }}><span style={{ color: '#EA4D55' }}>*</span> Belum dinilai</p>
                                                )}
                                            </Col>
                                            <Col xl={6}>
                                                <h6 style={{ marginTop: '12px', fontSize: '10px', color: '#989898' }}>Predikat</h6>
                                                {
                                                    lecturerData && parseFloat(lecturerData.averageValue) > 0 ? (
                                                        <p style={{ fontSize: '14px', color: '#292929' }}>Cukup Baik</p>
                                                    ) : lecturerData && parseFloat(lecturerData.averageValue) > 5 ? (
                                                        <p style={{ fontSize: '14px', color: '#292929' }}>Baik</p>
                                                    ) :
                                                        lecturerData && parseFloat(lecturerData.averageValue) >= 8 ? (
                                                            <p style={{ fontSize: '14px', color: '#292929' }}>Sangat Baik</p>
                                                        ) : (
                                                            <p style={{ fontSize: '14px', color: '#292929' }}><span style={{ color: '#EA4D55' }}>*</span> Belum dinilai</p>
                                                        )
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col xl={12} style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px', height: 'fit-content', marginTop: '20px' }}>
                                    <div>
                                        <h1 style={{ fontSize: '14px', fontWeight: '700' }}>Riwayat Pengabdian</h1>
                                    </div>
                                    <div className="history-table-head">
                                        <Row>
                                            <Col xl={1}>
                                                <h1>No</h1>
                                            </Col>
                                            <Col xl={9}>
                                                <h1>Judul Pengabdian</h1>
                                            </Col>
                                            <Col xl={2} className="text-center">
                                                <h1>Skor</h1>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr />
                                    {
                                        lecturerData?.Devotions?.length > 0 ? (
                                            lecturerData.Devotions.map((devotion, index) => {
                                                const displayIndex = (index + 1).toString().padStart(2, '0');

                                                return (
                                                    <div className="history-table-body" key={devotion.id}>
                                                        <Row>
                                                            <Col xl={1}>
                                                                <p>{displayIndex}</p>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <p>{devotion.devotionName}</p>
                                                            </Col>
                                                            <Col xl={2} className="text-center">
                                                                <p>{devotion.devotionValue}</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <p style={{ fontSize: '14px' }}><span style={{ color: '#EA4D55' }}>*</span> Belum ada pengabdian.</p>
                                        )
                                    }
                                </Col>
                                <Col xl={12} style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px', height: 'fit-content', marginTop: '20px' }}>
                                    <div>
                                        <h1 style={{ fontSize: '14px', fontWeight: '700' }}>Riwayat Penugasan</h1>
                                    </div>
                                    <div className="history-table-head">
                                        <Row>
                                            <Col xl={1}>
                                                <h1>No</h1>
                                            </Col>
                                            <Col xl={9}>
                                                <h1>Judul Penugasan</h1>
                                            </Col>
                                            <Col xl={2} className="text-center">
                                                <h1>Skor</h1>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr />
                                    {
                                        lecturerData?.Assignments?.length > 0 ? (
                                            lecturerData.Assignments.map((assignment, index) => {
                                                const displayIndex = (index + 1).toString().padStart(2, '0');

                                                return (
                                                    <div className="history-table-body" key={assignment.id}>
                                                        <Row>
                                                            <Col xl={1}>
                                                                <p>{displayIndex}</p>
                                                            </Col>
                                                            <Col xl={9}>
                                                                <p>{assignment.assignmentName}</p>
                                                            </Col>
                                                            <Col xl={2} className="text-center">
                                                                <p>{assignment.assignmentValue}</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <p style={{ fontSize: '14px' }}><span style={{ color: '#EA4D55' }}>*</span> Belum ada penugasan.</p>
                                        )
                                    }
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </LecturerDashboardLayout>

    );

};

export default OtherLecturerDetail;