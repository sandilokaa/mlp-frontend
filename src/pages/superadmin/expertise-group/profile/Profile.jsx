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

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";

import EducationIcon from "../../../../assets/images/icons/briefcase-2.svg";

import "../../../../assets/css/style.css";

const ExpertiseGroupProfile = () => {

    const navigate = useNavigate();

    /* ================ Get Superadmin Data ================ */

    const [superadminData, setSuperadminData] = useState([]);
    const [loading, setLoading] = useState(true);

    const superadminDetailData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/superadmin`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getDetailSuperAdmin;

            setSuperadminData(getDataResponse);
            setLoading(false);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        superadminDetailData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /* ================ End Get Superadmin Data ================ */


    /* ================ Get Expertise Data ================ */

    const getExpertise = (educationLevel) => {
        try {
            const educationData = JSON.parse(superadminData.SuperAdminEducation?.[educationLevel] || '{}');
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

        <SuperadminDashboardLayout>
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
                                                onClick={() => navigate(`/expertisegroup/profile/update/${superadminData ? superadminData.superAdminId : null}`)}
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
                                                        <p>{superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.nip : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Nama Dosen</h6>
                                                        <p>{superadminData.SuperAdmin ? superadminData.SuperAdmin.name : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Kelompok Keahlian</h6>
                                                        <p>{superadminData.SuperAdmin ? superadminData.SuperAdmin.groupName : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Pendidikan Terakhir</h6>
                                                        <p>
                                                            {loading ? (
                                                                <p>Loading...</p>
                                                            ) :
                                                                (superadminData.SuperAdminEducation?.doctor && JSON.parse(superadminData.SuperAdminEducation.doctor).title) ? 'Doctor'
                                                                    : (superadminData.SuperAdminEducation?.magister && JSON.parse(superadminData.SuperAdminEducation.magister).title) ? 'Magister'
                                                                        : (superadminData.SuperAdminEducation?.bachelor && JSON.parse(superadminData.SuperAdminEducation.bachelor).title) ? 'Bachelor'
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
                                                        <p>{superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.gender : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Tempat, Tanggal Lahir</h6>
                                                        <p>{superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.placeOfBirth : null}, {superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.dateOfBirth : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Alamat</h6>
                                                        <p>{superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.address : null}</p>
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
                                                        <p>{superadminData.SuperAdmin ? superadminData.SuperAdmin.email : null}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>No. HP</h6>
                                                        <p>{superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.phoneNumber : null}</p>
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
                                        <h6>S3 - {superadminData.SuperAdminEducation?.doctor ? JSON.parse(superadminData.SuperAdminEducation.doctor)?.major : null}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h5>{superadminData.SuperAdminEducation?.doctor ? JSON.parse(superadminData.SuperAdminEducation.doctor)?.university : null}</h5>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xl={2}>
                                        <p>Disertasi</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{superadminData.SuperAdminEducation?.doctor ? JSON.parse(superadminData.SuperAdminEducation.doctor)?.title : null}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <p>Expertise</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{superadminData.SuperAdminEducation?.doctor ? JSON.parse(superadminData.SuperAdminEducation.doctor)?.expertise : null}</p>
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
                                        <h6>S2 - {superadminData.SuperAdminEducation?.magister ? JSON.parse(superadminData.SuperAdminEducation.magister)?.major : null}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h5>{superadminData.SuperAdminEducation?.magister ? JSON.parse(superadminData.SuperAdminEducation.magister)?.university : null}</h5>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xl={2}>
                                        <p>Thesis</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{superadminData.SuperAdminEducation?.magister ? JSON.parse(superadminData.SuperAdminEducation.magister)?.title : null}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <p>Expertise</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{superadminData.SuperAdminEducation?.magister ? JSON.parse(superadminData.SuperAdminEducation.magister)?.expertise : null}</p>
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
                                        <h6>S1 - {superadminData.SuperAdminEducation?.bachelor ? JSON.parse(superadminData.SuperAdminEducation.bachelor)?.major : null}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h5>{superadminData.SuperAdminEducation?.bachelor ? JSON.parse(superadminData.SuperAdminEducation.bachelor)?.university : null}</h5>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xl={2}>
                                        <p>Skripsi</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{superadminData.SuperAdminEducation?.bachelor ? JSON.parse(superadminData.SuperAdminEducation.bachelor)?.title : null}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <p>Expertise</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>{superadminData.SuperAdminEducation?.bachelor ? JSON.parse(superadminData.SuperAdminEducation.bachelor)?.expertise : null}</p>
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

export default ExpertiseGroupProfile;