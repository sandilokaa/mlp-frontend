import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Image,
    Pagination,
    Form
} from "react-bootstrap";
import axios from "axios";

import LecturerDashboardLayout from "../../../layouts/dashboard/LecturerDashboardLayout";
import CustomDropdown from "../../../components/dropdown/DropdownLecturer";
import { usePeriod } from "../../../PeriodProvider";

import ViewIcon from "../../../assets/images/icons/eye.svg";

import "../../../assets/css/style.css";

const LectureListGroup = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();

    /* -------------------- End Global Variable -------------------- */


    /* ================ Get Lecturer Data ================ */

    const [lecturerData, setLecturerData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermGroup, setSearchTermGroup] = useState('');
    const { selectedPeriod } = usePeriod();
    const [period, academicYear] = selectedPeriod.split(' ');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchGroupName = (option) => {
        setSearchTermGroup(option);
    };

    const getLecturerData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/lecturer/group`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    },
                    params: {
                        name: searchTerm,
                        groupName: searchTermGroup,
                        devotionPeriod: period,
                        assignmentPeriod: period,
                        academicYear: academicYear
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getLecturer;

            setLecturerData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        getLecturerData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, searchTermGroup, selectedPeriod]);

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

        <LecturerDashboardLayout>
            <div id="research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <div className="add-research-content">
                        <Row>
                            <Col xl={12}>
                                <h1 style={{ fontSize: '16px', fontWeight: '700' }}>Daftar Dosen</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={9} className="mt-4 d-flex align-items-center">
                                <CustomDropdown
                                    onChange={handleSearchGroupName}
                                />
                            </Col>
                            <Col xl={3} className="mt-4 d-flex justify-content-end align-items-center">
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
                            <Col xl={5}>
                                <h6>Nama Dosen</h6>
                            </Col>
                            <Col xl={5} className="text-center">
                                <h6>Kelompok Keahlian</h6>
                            </Col>
                            <Col xl={1} className="text-center">
                                <h6>Action</h6>
                            </Col>
                        </Row>
                        <hr style={{ marginTop: '10px' }} />

                        {currentItems.map((lecturer, index) => {

                            const displayIndex = (index + 1).toString().padStart(2, '0');

                            return (
                                <Row className="table-body" key={lecturer.id} style={{ padding: '12px' }}>
                                    <div className="d-flex align-items-center" style={{ padding: '16px', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                                        <Col xl={1}>
                                            <h6>{displayIndex}</h6>
                                        </Col>
                                        <Col xl={5} style={{ marginLeft: '1px' }}>
                                            <h6>{lecturer.Lecturer.name}</h6>
                                        </Col>
                                        <Col xl={5} className="text-center" style={{ marginLeft: '5px' }}>
                                            <h6>{lecturer.Lecturer.groupName}</h6>
                                        </Col>
                                        <Col xl={1} className="text-center" style={{ marginLeft: '4px' }}>
                                            <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                <Col xl={12} className="d-flex justify-content-center p-0">
                                                    <span className="view" onClick={() => navigate(`/lecturer/list/detail/${lecturer.id}`)}>
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
        </LecturerDashboardLayout>

    );

};

export default LectureListGroup;