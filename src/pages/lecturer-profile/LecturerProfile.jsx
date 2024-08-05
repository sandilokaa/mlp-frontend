import React from "react";
import {
    Container,
    Row,
    Col,
    Image,
    Button
} from "react-bootstrap";

import DashboardLayout from "../../layouts/dashboard/DashboardLayout";

import EducationIcon from "../../assets/images/icons/briefcase.svg";

import "../../assets/css/style.css";

const LecturerProfile = () => {

    return (

        <DashboardLayout>
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
                                        <div className="photo-wrapper" style={{height: '150px', width: '100%', background: '#989898'}}></div>
                                        <div className="mt-3" style={{marginLeft: '8px', marginRight: '8px'}}>
                                            <Button style={{fontSize: '14px', border: 'none', backgroundColor: '#D62C35', width: '100%'}}>Edit Profile</Button>
                                        </div>
                                    </Col>
                                    <Col xl={8}>
                                        <div className="profile-general-information">
                                            <h5>Informasi Umum</h5>
                                            <div className="profile-general-information-describe">
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Nomor Induk Pegawai</h6>
                                                        <p>1234567890</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Nama Dosen</h6>
                                                        <p>Cecep Bagus Surya Dinata K.A</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={6}>
                                                        <h6>Jurusan</h6>
                                                        <p>Ilmu Komputer</p>
                                                    </Col>
                                                    <Col xl={6}>
                                                        <h6>Pendidikan Terakhir</h6>
                                                        <p>Doktoral</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Keahlian</h6>
                                                        <p>Artificial Intelligence, Cloud Computing, Human and Computer Interactions, Cryptography</p>
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
                                                        <p>Laki - Laki</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Tempat, Tanggal Lahir</h6>
                                                        <p>Lampung Utara, 13 Juni 2001</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>Alamat</h6>
                                                        <p>Jl. Taman Siswa No.71 B, Sekaran, Gunung Pati</p>
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
                                                        <p>cecepbagus.personal@mail.com</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <h6>No. HP</h6>
                                                        <p>082258937031</p>
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
                                        <Image src={EducationIcon}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h6>S3 - Computer Science</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <h5>Oxford University</h5>
                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col xl={2}>
                                        <p>Thesis</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>Analisis User Interface dan User Experience Menggunakan Metode SUS dan Design Thinking</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={2}>
                                        <p>Expertise</p>
                                    </Col>
                                    <Col xl={9}>
                                        <p>Artificial Intelligence, Cloud Computing, Human and Computer Interactions, Cryptography</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </DashboardLayout>

    );

};

export default LecturerProfile;