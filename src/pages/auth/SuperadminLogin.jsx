import React, { useRef } from "react";
import {
    Container,
    Row,
    Col,
    Image,
    Form,
    Button
} from "react-bootstrap";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

import axios from "axios";

import LoginImage from "../../assets/images/login-image.png";
import LogoIcon from "../../assets/images/logo.png";
import SuggestIcon from "../../assets/images/icons/arrow-right.svg"

import "../../assets/css/style.css";

const SuperadminLogin = () => {

    /* ================ Function Login ================ */

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const emailField = useRef();
    const passwordField = useRef();

    const onLogin = async (e) => {

        e.preventDefault();

        try {

            const loginPayload = {
                email: emailField.current.value,
                password: passwordField.current.value,
            };


            const loginRequest = await axios.post(
                `http://localhost:8080/api/v1/auth/superadmin/login`,
                loginPayload
            );

            const loginResponse = loginRequest.data;

            enqueueSnackbar(loginResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (loginResponse.status) {

                localStorage.setItem("token", loginResponse.data.token);

                navigate("/superadmin/dashboard");

            }
        } catch (err) {

            const errorMessage = err.response?.data?.message || 'Terdapat kesalahan';

            if (err.response?.status === 401) {
                enqueueSnackbar('Your email or password is incorrect!', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    autoHideDuration: 2000
                });
            } else {
                enqueueSnackbar(errorMessage, {
                    variant: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    autoHideDuration: 2000
                });
            }

        }

    };

    /* ================ Function Login ================ */

    return (

        <div id="login-content">
            <Image src={LoginImage} className="login-background" />
            <Container>
                <Row className="form-login">
                    <Col xl={{ span: 3, offset: 9 }}>
                        <div>
                            <Image src={LogoIcon} />
                            <h1>Selamat Datang Dashboard Monitoring Kinerja Dosen</h1>
                            <p>Masuk untuk mengakses fitur secara penuh</p>
                        </div>
                        <div className="form-input">
                            <Form>
                                <Row style={{ gap: '16px' }}>
                                    <Col xl={12}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label style={{ fontSize: '14px' }}>Email <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                            <Form.Control type="email" placeholder="Contoh: telkom@gmail.com" autoComplete="off" ref={emailField}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xl={12}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Label style={{ fontSize: '14px' }}>Password <span style={{ color: '#EA4D55' }}>*</span></Form.Label>
                                            <Form.Control type="password" placeholder="Masukan Password" autoComplete="off" ref={passwordField}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="form-btn-login">
                            <Row>
                                <Col xl={12}>
                                    <Button onClick={onLogin}>Masuk</Button>
                                </Col>
                            </Row>
                        </div>
                        <div 
                            onClick={() => navigate('/lecturer/login')}
                            className="suggest-superadmin" 
                            style={{marginTop: '40px', cursor: 'pointer'}}
                        >
                            <Row>
                                <Col xl={12} className="d-flex align-items-center">
                                    <span style={{fontSize: '14px', color: '#EA4D55'}}>Login sebagai Dosen</span>
                                    <Image src={SuggestIcon} style={{width: '20px', marginLeft: '12px'}}/>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );

};

export default SuperadminLogin;