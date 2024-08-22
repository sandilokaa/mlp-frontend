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

import "../../../assets/css/style.css";

const LectureDevotion = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* ================ Get Devotion Data ================ */

    const [devotionData, setDevotionData] = useState([]);

    const getDevotionData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/lecturer/devotion`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
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
    }, []);

    /* ================ End Get Devotion Data ================ */


    /* ================ Delete Devotion Data ================ */

    const onDeleteDevotion = async (id) => {

        const token = localStorage.getItem("token");

        try {

            const devotionRequest = await axios.delete(
                `http://localhost:8080/api/v1/lecturer/devotion/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const devotionResponse = await devotionRequest.data;

            enqueueSnackbar(devotionResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (devotionResponse.status) {

                window.location.reload("/lecturer/devotion")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* ================ End Delete Devotion Data ================ */


    /* ================ Pagination ================ */

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

        <LecturerDashboardLayout>
            <div id="research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <div className="add-research-content">
                        <Row>
                            <Col xl={3}>
                                <Button 
                                    onClick={() => navigate('/lecturer/devotion/create')}
                                    style={{width: '227px'}}
                                >
                                    Tambah Pengabdian
                                    <Image src={AddIcon} style={{marginLeft: '8px'}}/>
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
                                <h6>Judul Pengabdian</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Role</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Skor</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Action</h6>
                            </Col>
                        </Row>
                        <hr style={{ marginTop: '10px' }} />
                        {currentItems.map((devotion, index) => {

                            const colStyle = {
                                backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                                padding: '16px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '8px',
                                marginLeft: '5px',
                            };

                            const displayIndex = (index + 1).toString().padStart(2, '0');

                            return (
                                <Row className="table-body" key={devotion.id} style={{padding: '12px'}}>
                                    <div style={colStyle}>
                                        <Col xl={1}>
                                            <h6>{displayIndex}</h6>
                                        </Col>
                                        <Col xl={5}>
                                            <h6>{devotion.devotionName}</h6>
                                        </Col>
                                        <Col xl={2} className="text-center">
                                            <h6>{devotion.devotionRole}</h6>
                                        </Col>
                                        <Col xl={2} className="text-center">
                                            {devotion && devotion.devotionValue ? (
                                                <h6>{devotion.devotionValue}</h6>
                                            ) : (
                                                <h6>?</h6>
                                            )}
                                        </Col>
                                        <Col xl={2} className="text-center" style={{ marginLeft: '4px' }}>
                                            <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                <Col xl={4} className="d-flex justify-content-end p-0">
                                                    <span className="view" onClick={() => navigate(`/lecturer/devotion/detail/${devotion.id}`)}>
                                                        <Image src={ViewIcon} />
                                                    </span>
                                                </Col>
                                                <Col xl={4} className="d-flex justify-content-center p-0">
                                                    <span className="edit" onClick={() => navigate(`/lecturer/devotion/update/${devotion.id}`)}>
                                                        <Image src={EditIcon} />
                                                    </span>
                                                </Col>
                                                <Col xl={4} className="d-flex justify-content-start p-0">
                                                    <span className="delete">
                                                        <Image src={DeleteIcon} onClick={() => onDeleteDevotion(devotion.id)} />
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

export default LectureDevotion;