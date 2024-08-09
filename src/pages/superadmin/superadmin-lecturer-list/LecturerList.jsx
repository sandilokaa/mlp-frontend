import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Pagination
} from "react-bootstrap";
import axios from "axios";

import SuperadminDashboardLayout from "../../../layouts/dashboard/SuperadminDashboardLayout";

import ViewIcon from "../../../assets/images/icons/eye.svg";
import AddIcon from "../../../assets/images/icons/add.svg";

import "../../../assets/css/style.css";

const SuperadminLecturerList = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();

    /* -------------------- End Global Variable -------------------- */

    /* ================ Get Current User ================ */

    const [superadmin, setSuperadmin] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {

        const validateLogin = async () => {

            try {

                const token = localStorage.getItem("token");

                const currentSuperadminRequest = await axios.get(
                    `http://localhost:8080/api/v1/auth/superadmin/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentSuperadminResponse = currentSuperadminRequest.data;

                if (currentSuperadminResponse.status) {

                    setSuperadmin(currentSuperadminResponse.data.currentUser);

                }

            } catch (err) {

                console.log(err.message);

            }

        };

        validateLogin();

        setIsRefresh(false);

    }, [isRefresh]);

    /* ================ Get Current User ================ */
    

    /* ================ Get Lecturer Data ================ */

    const [lecturerData, setLecturerData] = useState([]);

    const getLecturerData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/superadmin/${superadmin.id}/lecturer`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getedLecturerBySuperAdminId;

            setLecturerData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        if (superadmin.id) {
            getLecturerData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [superadmin.id]);

    /* ================ End Get Lecturer Data ================ */


    /* ================ Pagination ================ */

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = lecturerData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(lecturerData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    /* ================ End Pagination ================ */


    return (

        <SuperadminDashboardLayout>
            <div id="research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <div className="add-research-content">
                        <Row>
                            <Col xl={12}>
                                <h1 style={{ fontSize: '16px', fontWeight: '700' }}>Daftar Dosen</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={3} className="mt-4 d-flex align-items-center">
                                <Button 
                                    style={{ width: '180px', height: '48px', fontSize: '14px' }} 
                                    onClick={() => navigate('/superadmin/lecturer/create')}
                                >
                                    Tambah Dosen
                                    <Image src={AddIcon} style={{marginLeft: '20px'}}/>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="research-table-content">
                        <Row className="table-head">
                            <Col xl={1}>
                                <h6>No</h6>
                            </Col>
                            <Col xl={5}>
                                <h6>Nama Dosen</h6>
                            </Col>
                            <Col xl={3} className="text-center">
                                <h6>Email</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Skor</h6>
                            </Col>
                            <Col xl={1} className="text-center">
                                <h6>Action</h6>
                            </Col>
                        </Row>
                        <hr style={{ marginTop: '10px' }} />
                        
                        {currentItems.map((lecturer, index) => {

                            const displayIndex = (index + 1).toString().padStart(2, '0');

                            return (
                                <Row className="table-body" key={lecturer.id}>
                                    <div className="d-flex align-items-center" style={{ padding: '16px 15px', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                                        <Col xl={1}>
                                            <h6>{displayIndex}</h6>
                                        </Col>
                                        <Col xl={5}>
                                            <h6>{lecturer.LecturerDetail.Lecturer.name}</h6>
                                        </Col>
                                        <Col xl={3} className="text-center" style={{ marginLeft: '5px' }}>
                                            <h6>{lecturer.LecturerDetail.Lecturer.email}</h6>
                                        </Col>
                                        <Col xl={2} className="text-center" style={{ marginLeft: '5px' }}>
                                            {lecturer.ResearchValue && lecturer.ResearchValue.value ? (
                                                <h6>{lecturer.ResearchValue.value}</h6>
                                            ) : (
                                                <h6>?</h6>
                                            )}
                                        </Col>
                                        <Col xl={1} className="text-center" style={{ marginLeft: '4px' }}>
                                            <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                <Col xl={12} className="d-flex justify-content-center p-0">
                                                    <span className="view" onClick={() => navigate(`/superadmin/lecturer/detail/${lecturer.id}`)}>
                                                        <Image src={ViewIcon} />
                                                    </span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </div>
                                </Row>
                            )
                        })}
                    </div>
                    <Pagination style={{ marginTop: '2%' }}>
                        {pageNumbers.map(number => (
                            <Pagination.Item
                                key={number}
                                active={number === currentPage}
                                onClick={() => handlePageChange(number)}
                                linkStyle={{ backgroundColor: number === currentPage ? '#D62C35' : '#FEF2F3', border: number === currentPage ? '1px solid #D62C35' : '1px solid #FEF2F3' }}
                            >
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            </div>
        </SuperadminDashboardLayout>

    );

};

export default SuperadminLecturerList;