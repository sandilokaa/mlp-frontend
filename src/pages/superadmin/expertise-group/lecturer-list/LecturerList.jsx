import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
import CustomDropdown from "../../../../components/dropdown/DropdownExpertiseGroup";

import ViewIcon from "../../../../assets/images/icons/eye.svg";
import AddIcon from "../../../../assets/images/icons/add.svg";
import DeleteIcon from "../../../../assets/images/icons/trash.svg";

import "../../../../assets/css/style.css";

const ExpertiseGroupLecturerList = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* ================ Get Lecturer Data ================ */

    const [lecturerData, setLecturerData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermGroup, setSearchTermGroup] = useState('');

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
                `http://localhost:8080/api/v1/superadmin/lecturer`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    },
                    params: {
                        name: searchTerm,
                        groupName: searchTermGroup
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
    }, [searchTerm, searchTermGroup]);

    /* ================ End Get Lecturer Data ================ */


    /* ================ Delete Lecturer Data ================ */

    const onDeleteLecturer = async (id) => {

        const token = localStorage.getItem("token");

        try {

            const deleteRequest = await axios.delete(
                `http://localhost:8080/api/v1/superadmin/lecturer/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const deleteResponse = await deleteRequest.data;

            enqueueSnackbar(deleteResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (deleteResponse.status) {

                window.location.reload("/expertisegroup/lecturer/list")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* ================ End Delete Lecturer Data ================ */


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
                                    style={{ width: '180px', height: '45px', fontSize: '14px' }}
                                    onClick={() => navigate('/expertisegroup/lecturer/create')}
                                >
                                    Tambah Dosen
                                    <Image src={AddIcon} style={{ marginLeft: '20px' }} />
                                </Button>
                            </Col>
                            <Col xl={{ span: 4, offset: 2 }} className="mt-4 d-flex justify-content-end align-items-center">
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
                            <Col xl={3}>
                                <h6>Nama Dosen</h6>
                            </Col>
                            <Col xl={3} className="text-center">
                                <h6>Kelompok Keahlian</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Email</h6>
                            </Col>
                            <Col xl={1} className="text-center">
                                <h6>Skor</h6>
                            </Col>
                            <Col xl={2} className="text-center">
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
                                        <Col xl={3}>
                                            <h6>{lecturer.Lecturer.name}</h6>
                                        </Col>
                                        <Col xl={3} className="text-center" style={{ marginLeft: '5px' }}>
                                            <h6>{lecturer.Lecturer.groupName}</h6>
                                        </Col>
                                        <Col xl={2} className="text-center" style={{ marginLeft: '5px' }}>
                                            <h6>{lecturer.Lecturer.email}</h6>
                                        </Col>
                                        <Col xl={1} className="text-center">
                                            {lecturer && lecturer.averageValue ? (
                                                <h6>{lecturer.averageValue}</h6>
                                            ) : (
                                                <h6><span style={{ color: '#EA4D55' }}>*</span> Belum dinilai</h6>
                                            )}
                                        </Col>
                                        <Col xl={2} className="text-center" style={{ marginLeft: '2px' }}>
                                            <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                <Col xl={{ span: 3, offset: 3 }} className="d-flex justify-content-center p-0">
                                                    <span className="view" onClick={() => navigate(`/expertisegroup/lecturer/detail/${lecturer.id}`)}>
                                                        <Image src={ViewIcon} />
                                                    </span>
                                                </Col>
                                                <Col xl={{ span: 3 }} className="d-flex justify-content-center p-0">
                                                    <span className="delete" onClick={() => onDeleteLecturer(lecturer.id)}>
                                                        <Image src={DeleteIcon} />
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

export default ExpertiseGroupLecturerList;