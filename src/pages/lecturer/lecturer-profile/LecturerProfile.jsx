import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Image,
    Button
} from "react-bootstrap";
import axios from "axios";

import LecturerDashboardLayout from "../../../layouts/dashboard/LecturerDashboardLayout";

import EducationIcon from "../../../assets/images/icons/briefcase.svg";

import "../../../assets/css/style.css";

const LecturerProfile = () => {

    const navigate = useNavigate();

    /* ================ Get Lecturer Data ================ */

    const [lecturerData, setLecturerData] = useState([]);

    const lecturerDetailData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/lecturer`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getDetailLecture;

            setLecturerData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        lecturerDetailData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /* ================ End Get Lecturer Data ================ */

    return (

        <LecturerDashboardLayout>
            <div id="lecturer-profile-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row>
                        <Col xl={6} style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px' }}>
                            <div>
                                <h1 style={{ fontSize: '14px', fontWeight: '700' }}>Profile Dosen</h1>
                            </div>
                            <div className="profile-personal">
                                <Row>
                                    <Col xl={3}>
                                        <div className="photo-wrapper" style={{ height: '150px', width: '100%', background: '#989898' }}></div>
                                        <div className="mt-3" style={{ marginLeft: '4px', marginRight: '4px' }}>
                                            <Button
                                                onClick={() => navigate(`/lecturer/profile/update/${lecturerData ? lecturerData.lecturerId : null}`)}
                                                style={{ fontSize: '14px', border: 'none', backgroundColor: '#D62C35', width: '100%' }}
                                            >
                                                Edit Profile
                                            </Button>
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
                                                    <Col xl={6}>
                                                        <h6>Jurusan</h6>
                                                        <p>{lecturerData.LecturerEducation ? lecturerData.LecturerEducation.major : null}</p>
                                                    </Col>
                                                    <Col xl={6}>
                                                        <h6>Pendidikan Terakhir</h6>
                                                        <p>
                                                            {
                                                                (lecturerData.LecturerEducation?.doctor && JSON.parse(lecturerData.LecturerEducation.doctor)) ? 'Doctor'
                                                                    : (lecturerData.LecturerEducation?.magister && JSON.parse(lecturerData.LecturerEducation.magister)) ? 'Magister'
                                                                        : (lecturerData.LecturerEducation?.bachelor && JSON.parse(lecturerData.LecturerEducation.bachelor)) ? 'Bachelor'
                                                                            : 'Tidak ada data'
                                                            }
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Keahlian</h6>
                                                        <p>Machine Learmbud</p>
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
                        <Col xl={6} style={{ padding: '20px', background: '#FFFFFF', borderRadius: '8px' }}>
                            <div>
                                <h1 style={{ fontSize: '14px', fontWeight: '700' }}>Riwayat Pendidikan</h1>
                            </div>
                            <div className="education-history">
                                <Row>
                                    <Col xl={12}>
                                        <Image src={EducationIcon} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h6>S3 - {lecturerData.LecturerEducation ? lecturerData.LecturerEducation.major : null}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h5>{lecturerData.LecturerEducation?.doctor ? JSON.parse(lecturerData.LecturerEducation.doctor)?.university : null}</h5>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xl={2}>
                                        <p>Disertasi</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{lecturerData.LecturerEducation?.doctor ? JSON.parse(lecturerData.LecturerEducation.doctor)?.title : null}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <p>Expertise</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{lecturerData.LecturerEducation?.doctor ? JSON.parse(lecturerData.LecturerEducation.doctor)?.expertise : null}</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className="education-history" style={{ backgroundColor: '#FAFAFA' }}>
                                <Row>
                                    <Col xl={12}>
                                        <Image src={EducationIcon} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h6>S2 - {lecturerData.LecturerEducation ? lecturerData.LecturerEducation.major : null}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h5>{lecturerData.LecturerEducation?.magister ? JSON.parse(lecturerData.LecturerEducation.magister)?.university : null}</h5>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xl={2}>
                                        <p>Disertasi</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{lecturerData.LecturerEducation?.magister ? JSON.parse(lecturerData.LecturerEducation.magister)?.title : null}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <p>Expertise</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{lecturerData.LecturerEducation?.magister ? JSON.parse(lecturerData.LecturerEducation.magister)?.expertise : null}</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className="education-history">
                                <Row>
                                    <Col xl={12}>
                                        <Image src={EducationIcon} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h6>S1 - {lecturerData.LecturerEducation ? lecturerData.LecturerEducation.major : null}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h5>{lecturerData.LecturerEducation?.bachelor ? JSON.parse(lecturerData.LecturerEducation.bachelor)?.university : null}</h5>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xl={2}>
                                        <p>Disertasi</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{lecturerData.LecturerEducation?.bachelor ? JSON.parse(lecturerData.LecturerEducation.bachelor)?.title : null}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <p>Expertise</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{lecturerData.LecturerEducation?.bachelor ? JSON.parse(lecturerData.LecturerEducation.bachelor)?.expertise : null}</p>
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

export default LecturerProfile;