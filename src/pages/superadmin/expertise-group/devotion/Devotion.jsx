import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Pagination,
    Form
} from "react-bootstrap";
import axios from "axios";

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";

import ViewIcon from "../../../../assets/images/icons/eye.svg";
import ExportIcon from "../../../../assets/images/icons/export.svg";

import "../../../../assets/css/style.css";

const ExpertiseGroupDevotion = () => {


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


    /* ================ Get Devotion Data ================ */

    const [devotionData, setDevotionData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const getDevotionData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/superadmin/${superadmin.id}/devotion`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    },
                    params: {
                        devotionName: searchTerm,
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getDevotion;

            setDevotionData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        getDevotionData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, superadmin.id]);

    /* ================ End Get Devotion Data ================ */

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = devotionData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(devotionData.length / itemsPerPage); i++) {
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
                                <h1 style={{ fontSize: '16px', fontWeight: '700' }}>Daftar Pengabdian</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={2} className="mt-4">
                                <Button style={{ width: '120px', height: '100%', fontSize: '14px' }}>Export <Image src={ExportIcon} style={{ marginLeft: '8px', width: '20px', }} /></Button>
                            </Col>
                            <Col xl={{ span: 3, offset: 7 }} className="mt-4 d-flex justify-content-end">
                                <Form>
                                    <Form.Control
                                        className="form-search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon1"
                                        style={{ height: '45px', width: '250px' }}
                                        onChange={handleSearchChange}
                                    />
                                </Form>
                            </Col>
                        </Row>
                    </div>
                    <div className="research-table-content">
                        <Row className="table-head">
                            <Col xl={1}>
                                <h6>No</h6>
                            </Col>
                            <Col xl={4}>
                                <h6>Judul Pengabdian</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Nama Dosen</h6>
                            </Col>
                            <Col xl={2} className="text-center">
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
                        {currentItems.map((devotion, index) => {

                            const displayIndex = (index + 1).toString().padStart(2, '0');

                            return (
                                <Row className="table-body" key={devotion.id}>
                                    <div className="d-flex align-items-center" style={{ padding: '16px 20px', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA', height: '54px' }}>
                                        <Col xl={1}>
                                            <h6>{displayIndex}</h6>
                                        </Col>
                                        <Col xl={4}>
                                            <h6>{devotion.devotionName}</h6>
                                        </Col>
                                        <Col xl={2} className="text-center">
                                            <h6>{devotion.Lecturer.name}</h6>
                                        </Col>
                                        <Col xl={2} className="text-center" style={{ marginLeft: '8px' }}>
                                            <h6>{devotion.Lecturer.email}</h6>
                                        </Col>
                                        <Col xl={2} className="text-center" style={{ marginLeft: '5px' }}>
                                            {devotion && devotion.devotionValue ? (
                                                <h6>{devotion.devotionValue}</h6>
                                            ) : (
                                                <h6><span style={{ color: '#EA4D55' }}>*</span> Perlu dinilai</h6>
                                            )}
                                        </Col>
                                        <Col xl={1} className="text-center" style={{ marginLeft: '4px' }}>
                                            <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                <Col xl={12} className="d-flex justify-content-center p-0">
                                                    <span className="view" onClick={() => navigate(`/expertisegroup/devotion/detail/${devotion.id}`)}>
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

export default ExpertiseGroupDevotion;