import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Container,
    Row,
    Col,
    Button,
    Image
} from "react-bootstrap";
import axios from "axios";

import LecturerDashboardLayout from "../../../layouts/dashboard/LecturerDashboardLayout";

import ViewIcon from "../../../assets/images/icons/eye.svg";
import DeleteIcon from "../../../assets/images/icons/trash.svg";
import EditIcon from "../../../assets/images/icons/edit-2.svg";

import "../../../assets/css/style.css";

const LectureResearch = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */


    /* ================ Get Research Data ================ */

    const [researchData, setResearchData] = useState([]);

    const getResearchData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/lecturer/research`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getResearch;

            setResearchData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        getResearchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================ End Get Research Data ================ */


    /* ================ Delete Research Data ================ */

    const onDeleteResearch = async (id) => {

        const token = localStorage.getItem("token");

        try {

            const researchRequest = await axios.delete(
                `http://localhost:8080/api/v1/lecturer/research/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const researchResponse = await researchRequest.data;

            enqueueSnackbar(researchResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (researchResponse.status) {

                window.location.reload("/lecturer/research")

            }

        } catch (err) {

            enqueueSnackbar('Data bukan punya user ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* ================ End Delete Research Data ================ */


    return (

        <LecturerDashboardLayout>
            <div id="research-content">
                <Container fluid style={{ padding: '0 32px' }}>
                    <div className="add-research-content">
                        <Row>
                            <Col xl={3}>
                                <Button onClick={() => navigate('/lecturer/research/create')}>Tambah Penelitian</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="research-table-content">
                        <Row className="table-head">
                            <Col xl={1}>
                                <h6>No</h6>
                            </Col>
                            <Col xl={5}>
                                <h6>Judul Penelitian</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Kategori</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Skor</h6>
                            </Col>
                            <Col xl={2} className="text-center">
                                <h6>Action</h6>
                            </Col>
                        </Row>
                        <hr style={{ marginTop: '10px' }} />
                        {researchData.map((research, index) => {

                            const colStyle = {
                                backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                                padding: '16px 10px',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '8px',
                                marginLeft: '5px'
                            };

                            const displayIndex = (index + 1).toString().padStart(2, '0');

                            return (
                                <Row className="table-body" key={research.id}>
                                    <div style={colStyle}>
                                        <Col xl={1}>
                                            <h6>{displayIndex}</h6>
                                        </Col>
                                        <Col xl={5}>
                                            <h6>{research.title}</h6>
                                        </Col>
                                        <Col xl={2} className="text-center">
                                            <h6>{research.category}</h6>
                                        </Col>
                                        <Col xl={2} className="text-center">
                                            {research.ResearchValue && research.ResearchValue.value ? (
                                                <h6>{research.ResearchValue.value}</h6>
                                            ) : (
                                                <h6>?</h6>
                                            )}
                                        </Col>
                                        <Col xl={2} className="text-center" style={{ marginLeft: '4px' }}>
                                            <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                <Col xl={4} className="d-flex justify-content-end p-0">
                                                    <span className="view" onClick={() => navigate(`/lecturer/research/detail/${research.id}`)}>
                                                        <Image src={ViewIcon} />
                                                    </span>
                                                </Col>
                                                <Col xl={4} className="d-flex justify-content-center p-0">
                                                    <span className="edit" onClick={() => navigate(`/lecturer/research/update/${research.id}`)}>
                                                        <Image src={EditIcon} />
                                                    </span>
                                                </Col>
                                                <Col xl={4} className="d-flex justify-content-start p-0">
                                                    <span className="delete">
                                                        <Image src={DeleteIcon} onClick={() => onDeleteResearch(research.id)} />
                                                    </span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </div>
                                </Row>
                            )
                        })}
                    </div>
                </Container>
            </div>
        </LecturerDashboardLayout>

    );

};

export default LectureResearch;