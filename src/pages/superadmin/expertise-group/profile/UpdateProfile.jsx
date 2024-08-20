import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Form
} from "react-bootstrap";
import axios from "axios";

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";

import ArrowLeft from "../../../../assets/images/icons/arrow-left.svg";

import "../../../../assets/css/style.css";

const ExpertiseGroupUpdateProfile = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* ================ Get Superadmin Data ================ */

    const [superadminData, setSuperadminData] = useState([]);

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

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        superadminDetailData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    /* ================ End Get Superadmin Data ================ */


    /* ================ Update SuperAdmin Data ================ */

    const params = useLocation();

    const id = (params.pathname).split('/')[4];

    const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (e) => {

        const selectedDateValue = e.target.value;

        setSelectedDate(selectedDateValue);

    };

    const nipField = useRef();
    const nameField = useRef();
    const genderField = useRef();
    const placeBirthField = useRef();
    const addressField = useRef();
    const phoneNumberField = useRef();
    
    const universityBachelorField = useRef();
    const gpaBachelorField = useRef();
    const titleBachelorField = useRef();
    const expertiseBachelorField = useRef();
    const majorBachelorField = useRef();

    const universityMagisterField = useRef();
    const gpaMagisterField = useRef();
    const titleMagisterField = useRef();
    const expertiseMagisterField = useRef();
    const majorMagisterField = useRef();

    const universityDoctorField = useRef();
    const gpaDoctorField = useRef();
    const titleDoctorField = useRef();
    const expertiseDoctorField = useRef();
    const majorDoctorField = useRef();

    const onUpdateProfile = async () => {

        try {
            
            const token = localStorage.getItem("token");

            const profilePayload = {
                nip: nipField.current.value,
                name: nameField.current.value,
                gender: genderField.current.value,
                address: addressField.current.value,
                phoneNumber: phoneNumberField.current.value,
                placeOfBirth: placeBirthField.current.value,
                dateOfBirth: selectedDate,
                bachelor: {
                    university: universityBachelorField.current.value,
                    gpa: gpaBachelorField.current.value,
                    title: titleBachelorField.current.value,
                    expertise: expertiseBachelorField.current.value,
                    major: majorBachelorField.current.value
                },
                magister: {
                    university: universityMagisterField.current.value,
                    gpa: gpaMagisterField.current.value,
                    title: titleMagisterField.current.value,
                    expertise: expertiseMagisterField.current.value,
                    major: majorMagisterField.current.value
                },
                doctor: {
                    university: universityDoctorField.current.value,
                    gpa: gpaDoctorField.current.value,
                    title: titleDoctorField.current.value,
                    expertise: expertiseDoctorField.current.value,
                    major: majorDoctorField.current.value
                },
            };

            const updateProfileRequest = await axios.put(
                `http://localhost:8080/api/v1/superadmin/${id}`,
                profilePayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );

            const updateProfileResponse = updateProfileRequest.data;

            enqueueSnackbar(updateProfileResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (updateProfileResponse.status) {

                navigate("/expertisegroup/profile");

            }

        } catch (err) {

            console.log(err.message);
            

        }

    };

    /* ================ End Update SuperAdmin Data ================ */


    return (

        <SuperadminDashboardLayout>
            <div id="update-profile-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <Row className="update-profile-title">
                        <Col xl={12} className="d-flex align-items-center">
                            <Image onClick={() => navigate('/expertisegroup/profile')} src={ArrowLeft} style={{ marginRight: '16px', cursor: 'pointer' }} />
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
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Nomor Induk Pegawai" 
                                                            autoComplete="off" style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.nip : null}
                                                            ref={nipField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nama Dosen <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Nama Dosen" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdmin ? superadminData.SuperAdmin.name : null}
                                                            ref={nameField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Kelompok Keahlian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Jurusan" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px', background:'#F5F6F8' }}
                                                            defaultValue={superadminData.SuperAdmin ? superadminData.SuperAdmin.groupName : null}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jenis Kelamin <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Jenis Kelamin" 
                                                            autoComplete="off" style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.gender : null}
                                                            ref={genderField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tempat Lahir <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Tempat Lahir" 
                                                            autoComplete="off" style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.placeOfBirth : null}
                                                            ref={placeBirthField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Tanggal Lahir <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="date" 
                                                            placeholder="Masukan Tanggal Lahir" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            onChange={handleDateChange}
                                                            defaultValue={superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.dateOfBirth : null}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Alamat <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Alamat" 
                                                            autoComplete="off" style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.address : null}
                                                            ref={addressField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Email <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Email" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px', background:'#F5F6F8' }} 
                                                            defaultValue={superadminData.SuperAdmin ? superadminData.SuperAdmin.email : null} readOnly
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Nomor Telpon <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan No Telpon" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminPersonal ? superadminData.SuperAdminPersonal.phoneNumber : null}
                                                            ref={phoneNumberField}
                                                        />
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
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Jenjang Pendidikan" 
                                                            autoComplete="off" style={{ fontSize: '14px', background:'#F5F6F8' }} 
                                                            defaultValue="S1" 
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Universitas <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Universitas" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.bachelor ? JSON.parse(superadminData.SuperAdminEducation.bachelor)?.university : null}
                                                            ref={universityBachelorField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>GPA <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan GPA" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.bachelor ? JSON.parse(superadminData.SuperAdminEducation.bachelor)?.gpa : null}
                                                            ref={gpaBachelorField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Skripsi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Judul Skripsi" 
                                                            autoComplete="off" style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.bachelor ? JSON.parse(superadminData.SuperAdminEducation.bachelor)?.title : null}
                                                            ref={titleBachelorField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jurusan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Jurusan" 
                                                            autoComplete="off" style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.bachelor ? JSON.parse(superadminData.SuperAdminEducation.bachelor)?.major : null}
                                                            ref={majorBachelorField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Keahlian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Keahlian" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.bachelor ? JSON.parse(superadminData.SuperAdminEducation.bachelor)?.expertise : null}
                                                            ref={expertiseBachelorField}
                                                        />
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
                                                        <Form.Control  
                                                            type="text" 
                                                            placeholder="Masukan Jenjang Pendidikan" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px', background:'#F5F6F8' }} 
                                                            defaultValue="S2" 
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Universitas <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Universitas" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.magister ? JSON.parse(superadminData.SuperAdminEducation.magister)?.university : null}
                                                            ref={universityMagisterField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>GPA <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan GPA" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.magister ? JSON.parse(superadminData.SuperAdminEducation.magister)?.gpa : null}
                                                            ref={gpaMagisterField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Thesis <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Judul Thesis" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.magister ? JSON.parse(superadminData.SuperAdminEducation.magister)?.title : null}
                                                            ref={titleMagisterField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jurusan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Jurusan" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.magister ? JSON.parse(superadminData.SuperAdminEducation.magister)?.major : null}
                                                            ref={majorMagisterField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Keahlian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Keahlian" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.magister ? JSON.parse(superadminData.SuperAdminEducation.magister)?.expertise : null}
                                                            ref={expertiseMagisterField}
                                                        />
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
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Jenjang Pendidikan" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px', background:'#F5F6F8' }} 
                                                            defaultValue="S3" 
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Universitas <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Universitas" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.doctor ? JSON.parse(superadminData.SuperAdminEducation.doctor)?.university : null}
                                                            ref={universityDoctorField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>GPA <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan GPA" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.doctor ? JSON.parse(superadminData.SuperAdminEducation.doctor)?.gpa : null}
                                                            ref={gpaDoctorField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Judul Distertasi <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Judul Distertasi" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.doctor ? JSON.parse(superadminData.SuperAdminEducation.doctor)?.title : null}
                                                            ref={titleDoctorField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Jurusan <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Jurusan" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.doctor ? JSON.parse(superadminData.SuperAdminEducation.doctor)?.major : null}
                                                            ref={majorDoctorField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                            <Col xl={4}>
                                                <div>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label style={{ fontSize: '14px', color: '#292929' }}>Keahlian <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Masukan Keahlian" 
                                                            autoComplete="off" 
                                                            style={{ fontSize: '14px' }} 
                                                            defaultValue={superadminData.SuperAdminEducation?.doctor ? JSON.parse(superadminData.SuperAdminEducation.doctor)?.expertise : null}
                                                            ref={expertiseDoctorField}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xl={12} className="d-flex justify-content-end">
                                                <div>
                                                    <Button 
                                                        onClick={onUpdateProfile}
                                                        style={{fontSize: '16px', backgroundColor: '#EA4D55', border: 'none'}}
                                                    >
                                                        Simpan Perubahan
                                                    </Button>
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
        </SuperadminDashboardLayout>

    );

};

export default ExpertiseGroupUpdateProfile;