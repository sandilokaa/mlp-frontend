import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Pagination
} from "react-bootstrap";
import axios from "axios";

import LecturerDashboardLayout from "../../../layouts/dashboard/LecturerDashboardLayout";

import ViewIcon from "../../../assets/images/icons/eye.svg";
import DeleteIcon from "../../../assets/images/icons/trash.svg";
import EditIcon from "../../../assets/images/icons/edit-2.svg";
import AddIcon from "../../../assets/images/icons/add.svg";

import { formatDate } from "../../../helper/formatDate";

import "../../../assets/css/style.css";

const LecturerPatent = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* ================ Get Patent Data ================ */

    const [patentData, setPatentData] = useState([]);

    const getPatentData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/lecturer/patent`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getPatent;

            setPatentData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        getPatentData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================ End Get Patent Data ================ */


    /* ================ Delete Patent Data ================ */

    const onDeletePatent = async (id) => {

        const token = localStorage.getItem("token");

        try {

            const patentRequest = await axios.delete(
                `http://localhost:8080/api/v1/lecturer/patent/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const patentResponse = await patentRequest.data;

            enqueueSnackbar(patentResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (patentResponse.status) {

                window.location.reload("/lecturer/patent")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* ================ End Delete Patent Data ================ */


    /* ================ Pagination ================ */

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = patentData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(patentData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    /* ================ End Pagination ================ */



    return (

        <LecturerDashboardLayout>
            <div id="research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <div className="add-research-content">
                        <Row>
                            <Col xl={3}>
                                <Button
                                    onClick={() => navigate('/lecturer/patent/create')}
                                    style={{ width: '227px' }}
                                >
                                    Tambah Hak Paten
                                    <Image src={AddIcon} style={{ marginLeft: '8px' }} />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    {currentItems && currentItems.length > 0 ? (
                        <>
                            <div className="research-table-content">
                                <Row className="table-head">
                                    <Col xl={1}>
                                        <h6>No</h6>
                                    </Col>
                                    <Col xl={5}>
                                        <h6>Judul Paten</h6>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <h6>Nomor Pencatatan</h6>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <h6>Tanggal Publikasi</h6>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <h6>Action</h6>
                                    </Col>
                                </Row>
                                <hr style={{ marginTop: '10px' }} />
                                {currentItems.map((patent, index) => {

                                    const colStyle = {
                                        backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                                        padding: '16px 12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '8px',
                                        marginLeft: '5px'
                                    };

                                    const displayIndex = (index + 1).toString().padStart(2, '0');

                                    return (
                                        <Row className="table-body" key={patent.id} style={{ padding: '12px' }}>
                                            <div style={colStyle}>
                                                <Col xl={1}>
                                                    <h6>{displayIndex}</h6>
                                                </Col>
                                                <Col xl={5}>
                                                    <h6>{patent.patentTitle}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center">
                                                    <h6>{patent.registrationNumber}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center">
                                                    <h6>{formatDate(patent.patentDate)}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center" style={{ marginLeft: '4px' }}>
                                                    <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                        <Col xl={4} className="d-flex justify-content-end p-0">
                                                            <span className="view" onClick={() => navigate(`/lecturer/patent/detail/${patent.id}`)}>
                                                                <Image src={ViewIcon} />
                                                            </span>
                                                        </Col>
                                                        <Col xl={4} className="d-flex justify-content-center p-0">
                                                            <span className="edit" onClick={() => navigate(`/lecturer/patent/update/${patent.id}`)}>
                                                                <Image src={EditIcon} />
                                                            </span>
                                                        </Col>
                                                        <Col xl={4} className="d-flex justify-content-start p-0">
                                                            <span className="delete">
                                                                <Image src={DeleteIcon} onClick={() => onDeletePatent(patent.id)} />
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        </Row>
                                    );
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
                        </>
                    ) : (
                        <div>
                            <Row>
                                <Col xl={12} className=" mt-4 d-flex justify-content-center">
                                    <h1 style={{ fontSize: '16px', color: '#989898',  marginTop: '220px'  }}>Belum ada Hak Paten yang ditambahkan pada periode ini.</h1>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>
            </div>
        </LecturerDashboardLayout>

    );

};

export default LecturerPatent;