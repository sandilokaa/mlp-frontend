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

import LecturerDashboardLayout from "../../layouts/dashboard/LecturerDashboardLayout";

import ViewIcon from "../../assets/images/icons/eye.svg";
import DeleteIcon from "../../assets/images/icons/trash.svg";
import EditIcon from "../../assets/images/icons/edit-2.svg";

import "../../assets/css/style.css";

const Research = () => {

    
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

                window.location.reload("/research")

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
                                <Button onClick={() => navigate('/add-research')}>Tambah Penelitian</Button>
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
                        <hr style={{ marginTop: '0px' }} />
                        {researchData.map((research, index) =>
                            <Row className="table-body" key={research.id}>
                                <Col xl={1}>
                                    <h6>0{index + 1}</h6>
                                </Col>
                                <Col xl={5}>
                                    <h6>{research.title}</h6>
                                </Col>
                                <Col xl={2} className="text-center">
                                    <h6>{research.category}</h6>
                                </Col>
                                <Col xl={2} className="text-center">
                                    <h6>?</h6>
                                </Col>
                                <Col xl={2} className="text-center">
                                    <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                        <Col xl={4} className="d-flex justify-content-end p-0">
                                            <span className="view" onClick={() => window.open(`http://localhost:8080/${research.researchFile}`)}>
                                                <Image src={ViewIcon} />
                                            </span>
                                        </Col>
                                        <Col xl={4} className="d-flex justify-content-center p-0">
                                            <span className="edit" onClick={() => navigate(`/update-research/${research.id}`)}>
                                                <Image src={EditIcon} />
                                            </span>
                                        </Col>
                                        <Col xl={4} className="d-flex justify-content-start p-0">
                                            <span className="delete">
                                                <Image src={DeleteIcon} onClick={() => onDeleteResearch(research.id)}/>
                                            </span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                    </div>
                </Container>
            </div>
        </LecturerDashboardLayout>

    );

};

export default Research;