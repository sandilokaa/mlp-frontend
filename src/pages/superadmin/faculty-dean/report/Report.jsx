import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Image,
    Pagination
} from "react-bootstrap";
import axios from "axios";
import moment from "moment-timezone";

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";
import DropdownPeriod from "../../../../components/dropdown/DropdownPeriod";

import ViewIcon from "../../../../assets/images/icons/eye.svg";

import "../../../../assets/css/style.css";

const DeanReport = () => {


    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();

    /* -------------------- End Global Variable -------------------- */

    /* ================ Get Report Data ================ */

    const [reportData, setReportData] = useState([]);
    const [searchPeriodTerm, setSearchPeriodTerm] = useState('Ganjil 2024');

    const handleSearchPeriodChange = (selectedValue) => {
        setSearchPeriodTerm(selectedValue);
    };

    const getReportData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/superadmin/report`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    },
                    params: {
                        reportPeriod: searchPeriodTerm.split(' ')[0],
                        academicYear: searchPeriodTerm.split(' ')[1]
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

        getReportData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchPeriodTerm]);

    /* ================ End Get Report Data ================ */


    /* ================ Pagination ================ */

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reportData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    /* ================ End Pagination ================ */

    /* ================ Format Date ================ */

    const formatDate = (dateString) => {
        const date = moment(dateString).tz('Asia/Jakarta');
        return date.format('D-M-YYYY HH:mm');
    };

    /* ================ End Format Date ================ */


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
                            <Col xl={12} className="mt-4 d-flex justify-content-end">
                                <DropdownPeriod
                                    onChange={handleSearchPeriodChange}
                                />
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
                                        <h6>Judul Laporan</h6>
                                    </Col>
                                    <Col xl={3} className="text-center">
                                        <h6>Kelompok Keahlian</h6>
                                    </Col>
                                    <Col xl={2} className="text-center">
                                        <h6>Last Updated</h6>
                                    </Col>
                                    <Col xl={1} className="text-center">
                                        <h6>Action</h6>
                                    </Col>
                                </Row>
                                <hr style={{ marginTop: '10px' }} />
                                {currentItems.map((report, index) => {

                                    const displayIndex = (index + 1).toString().padStart(2, '0');

                                    return (
                                        <Row className="table-body" key={report.id}>
                                            <div className="d-flex align-items-center" style={{ padding: '16px 15px', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                                                <Col xl={1}>
                                                    <h6>{displayIndex}</h6>
                                                </Col>
                                                <Col xl={5}>
                                                    <h6>{report.reportName}</h6>
                                                </Col>
                                                <Col xl={3} className="text-center" style={{ marginLeft: '5px' }}>
                                                    <h6>{report.SuperAdmin.groupName}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center" style={{ marginLeft: '5px' }}>
                                                    <h6>{formatDate(report.updatedAt)}</h6>
                                                </Col>
                                                <Col xl={1} className="text-center" style={{ marginLeft: '3px' }}>
                                                    <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                        <Col xl={12} className="d-flex justify-content-center p-0">
                                                            <span className="view" onClick={() => navigate(`/dean/report/detail/${report.id}`)}>
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

export default DeanReport;