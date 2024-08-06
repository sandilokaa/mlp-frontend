import React from "react";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Form
} from "react-bootstrap";

import LecturerDashboardLayout from "../../layouts/dashboard/LecturerDashboardLayout";

import ArrowLeft from "../../assets/images/icons/arrow-left.svg";

import "../../assets/css/style.css";

const UpdateLecturerProfile = () => {

    const navigate = useNavigate();

    return (

        <LecturerDashboardLayout>
            <div id="update-profile-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="update-profile-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/lecturer-profile')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
                            <h1>Edit Profile</h1>
                        </Col>
                    </Row>
                    <Row className="form-update-profile">
                        <Form>
                            <Col xl={12}>
                                <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                    <h1>Informasi Umum <span style={{ color: '#D62C35', fontWeight: '700' }}>*</span></h1>
                                    <div className="update-general-information">
                                        <Row>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nomor Induk Pegawai <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Nomor Induk Pegawai" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nama Dosen <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Nama Dosen" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jurusan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Jurusan" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jenis Kelamin <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Jenis Kelamin" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tempat Lahir <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Tempat Lahir" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tanggal Lahir <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Tanggal Lahir" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Alamat <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Alamat" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Email <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Email" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nomor Telpon <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan No Telpon" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={12} className="mt-3">
                                <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                    <h1>Riwayat Pendidikan - Sarjana <span style={{ color: '#D62C35', fontWeight: '700' }}>*</span></h1>
                                    <div className="update-bachelor-information">
                                        <Row>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jenjang Pendidikan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Jenjang Pendidikan" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Universitas <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Universitas" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>GPA <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan GPA" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Skripsi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Judul Skripsi" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Keahlian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Keahlian" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={12} className="mt-3">
                                <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                    <h1>Riwayat Pendidikan - Magister <span style={{ color: '#D62C35', fontWeight: '700' }}>*</span></h1>
                                    <div className="update-magister-information">
                                        <Row>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jenjang Pendidikan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Jenjang Pendidikan" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Universitas <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Universitas" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>GPA <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan GPA" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Tesis <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Judul Tesis" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Keahlian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Keahlian" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={12} className="mt-3">
                                <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px' }}>
                                    <h1>Riwayat Pendidikan - Doktoral <span style={{ color: '#D62C35', fontWeight: '700' }}>*</span></h1>
                                    <div className="update-doctoral-information">
                                        <Row>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jenjang Pendidikan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Jenjang Pendidikan" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Universitas <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Universitas" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>GPA <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan GPA" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Disertasi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Judul Disertasi" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Keahlian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Masukan Keahlian" autoComplete="off" style={{ fontSize: '14px' }} />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12} className="d-flex justify-content-end">
                                                <div>
                                                    <Button style={{fontSize: '16px', backgroundColor: '#EA4D55', border: 'none'}}>Simpan Perubahan</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
        </LecturerDashboardLayout>

    );

};

export default UpdateLecturerProfile;