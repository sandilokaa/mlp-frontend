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
import { usePeriod } from "../../../../PeriodProvider";

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";

import ViewIcon from "../../../../assets/images/icons/eye.svg";
import AddIcon from "../../../../assets/images/icons/add.svg";

import "../../../../assets/css/style.css";

const ExpertiseGroupReport = () => {


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


    /* ================ Get Report Data ================ */

    const [reportData, setReportData] = useState([]);
    const { selectedPeriod } = usePeriod();
    const [reportPeriod, academicYear] = selectedPeriod.split(' ');

    const getReportData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/superadmin/${superadmin.id}/report`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    },
                    params: {
                        reportPeriod: reportPeriod,
                        academicYear: academicYear
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getedReport;

            setReportData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        if (superadmin.id) {
            getReportData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [superadmin.id, selectedPeriod]);

    /* ================ End Get Report Data ================ */


    /* ================ Pagination ================ */

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reportData.length / itemsPerPage); i++) {
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
                                <h1 style={{ fontSize: '16px', fontWeight: '700' }}>Daftar Laporan</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={4} className="mt-4 d-flex align-items-center">
                                <Button
                                    style={{ width: '190px', height: '45px', fontSize: '14px' }}
                                    onClick={() => navigate('/expertisegroup/report/create')}
                                >
                                    Tambah Laporan
                                    <Image src={AddIcon} style={{ marginLeft: '20px' }} />
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
                                    <Col xl={3}>
                                        <h6>Judul Laporan</h6>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <h6>Periode</h6>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <h6>Tahun Ajaran</h6>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <h6>Jenis Laporan</h6>
                                    </Col>
                                    <Col xl={1} className="text-center">
                                        <h6>Status</h6>
                                    </Col>
                                    <Col xl={1} className="text-center">
                                        <h6>Action</h6>
                                    </Col>
                                </Row>
                                <hr style={{ marginTop: '10px' }} />
                                {currentItems.map((report, index) => {

                                    const displayIndex = (index + 1).toString().padStart(2, '0');

                                    return (
                                        <Row className="table-body" key={report.id} style={{ padding: '12px' }}>
                                            <div className="d-flex align-items-center" style={{ padding: '16px 15px', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                                                <Col xl={1}>
                                                    <h6>{displayIndex}</h6>
                                                </Col>
                                                <Col xl={3}>
                                                    <h6>{report.reportName}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center">
                                                    <h6>{report.reportPeriod}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center" style={{ marginLeft: '1px' }}>
                                                    <h6>{report.academicYear}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center" style={{ marginLeft: '3px' }}>
                                                    <h6>{report.reportType}</h6>
                                                </Col>
                                                <Col xl={1} className="text-center d-flex justify-content-center" style={{ marginLeft: '5px' }}>
                                                    {
                                                        report.reportStatus === "Selesai" ? (
                                                            <div style={{ backgroundColor: '#EEFBF2', padding: '10px' }}>
                                                                <h6 style={{ fontSize: '10px', color: '#24A560' }}>Selesai</h6>
                                                            </div>
                                                        ) :
                                                            report.reportStatus === "New Comment" ?
                                                                (
                                                                    <h6 style={{ fontSize: '10px', color: '#EA4D55', backgroundColor: '#FEF2F3', padding: '4px' }}>New Comment</h6>
                                                                ) :
                                                                report.reportStatus === "Dalam Review" ? (
                                                                    <div style={{ backgroundColor: '#F6F3FF', padding: '10px', borderRadius: '6px', width: 'fit-content' }}>
                                                                        <h6 style={{ fontSize: '10px', color: '#8951F0' }}>Dalam Review</h6>
                                                                    </div>
                                                                ) :
                                                                    null
                                                    }
                                                </Col>
                                                <Col xl={1} className="text-center" style={{ marginLeft: '0px' }}>
                                                    <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                        <Col xl={12} className="d-flex justify-content-center p-0">
                                                            <span className="view" onClick={() => navigate(`/expertisegroup/report/detail/${report.id}`)}>
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
                                        linkStyle={{ backgroundColor: number === currentPage ? '#D62C35' : '#FEF2F3', border: number === currentPage ? '1px solid #D62C35' : '1px solid #FEF2F3', color: '#FFFFFF' }}
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
                                    <h1 style={{ fontSize: '16px', color: '#989898', marginTop: '220px' }}>Belum ada laporan yang ditambahkan pada periode ini.</h1>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>
            </div>
        </SuperadminDashboardLayout>

    );

};

export default ExpertiseGroupReport;