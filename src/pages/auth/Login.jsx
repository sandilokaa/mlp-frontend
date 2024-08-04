import React from "react";
import {
    Container,
    Row,
    Col,
    Image,
    Form,
    Button
} from "react-bootstrap";

import LoginImage from "../../assets/images/login-image.png";
import LogoIcon from "../../assets/images/logo.png";

import "../../assets/css/style.css";

const Login = () => {



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
                                <Row style={{gap: '16px'}}>
                                    <Col xl={12}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label style={{ fontSize: '14px' }}>Email <span style={{color: '#EA4D55'}}>*</span></Form.Label>
                                            <Form.Control type="email" placeholder="Contoh: telkom@gmail.com" autoComplete="off"/>
                                        </Form.Group>
                                    </Col>
                                    <Col xl={12}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label style={{ fontSize: '14px' }}>Password <span style={{color: '#EA4D55'}}>*</span></Form.Label>
                                            <Form.Control type="password" placeholder="Masukan Password" autoComplete="off"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="form-btn-login">
                            <Row>
                                <Col xl={12}>
                                    <Button>Masuk</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );

};

export default Login;