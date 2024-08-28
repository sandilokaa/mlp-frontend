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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import SuperadminDashboardLayout from "../../../../layouts/dashboard/SuperadminDashboardLayout";
import { usePeriod } from "../../../../PeriodProvider";

import LogoImage from "../../../../assets/images/logo.png";
import ViewIcon from "../../../../assets/images/icons/eye.svg";
import ExportIcon from "../../../../assets/images/icons/export.svg";

import "../../../../assets/css/style.css";

const ExpertiseGroupAssignment = () => {


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


    /* ================ Get Assignment Data ================ */

    const [assignmentData, setAssignmentData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { selectedPeriod } = usePeriod();
    const [assignmentPeriod, academicYear] = selectedPeriod.split(' ');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const getAssignmentData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/superadmin/${superadmin.id}/assignment`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allo-Origin": "*"
                    },
                    params: {
                        assignmentName: searchTerm,
                        assignmentPeriod: assignmentPeriod,
                        academicYear: academicYear
                    }
                }
            );

            const getDataResponse = await getDataRequest.data.data.getAssignment;

            setAssignmentData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        getAssignmentData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, selectedPeriod, superadmin.id]);

    /* ================ End Get Devotion Data ================ */


    /* ================ Export Assignment Data ================ */

    const exportAssignmentData = async () => {

        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('id-ID', options);

        if (assignmentData) {

            const doc = new jsPDF();

            /* ------ Set Title ------ */

            const marginTop = 20;

            const imgData = LogoImage;
            const imgWidth = 50;
            const imgHeight = 30;
            doc.addImage(imgData, 'PNG', 12, marginTop, imgWidth, imgHeight);

            const textXPosition = 20 + imgWidth + 10;

            doc.setFont('Times-Bold');
            doc.setFontSize(16);
            doc.text('Laporan Penugasan Dosen', textXPosition, marginTop + 10);

            doc.setFont('Times-Roman');
            doc.setFontSize(12);
            doc.text('Jalan Bandung Raya, Kota Bandung', textXPosition, marginTop + 18);

            doc.setFont('Times-Italic');
            doc.setFontSize(12);
            doc.text(formattedDate, textXPosition, marginTop + 25);

            /* ------ End Set Title ------ */

            /* ------ Set Table ------ */

            const tableData = []

            tableData.push(['No', 'Judul Pengabdian', 'Nama Dosen', 'Email', 'Skor']);

            assignmentData.map((item, index) => {
                return tableData.push([index + 1, item.assignmentName, item.Lecturer.name, item.Lecturer.email, item.assignmentValue]);
            });

            const startY = 60;

            doc.autoTable({
                head: tableData.slice(0, 1),
                body: tableData.slice(1),
                startY: startY,
                margin: { top: startY + 15 },
                theme: 'grid',
                headStyles: { fillColor: [0, 0, 0] },
                alternateRowStyles: { fillColor: [235, 235, 235] },
            });

            /* ------ End Set Table ------ */

            /* ------ Unduh dokumen PDF ------ */

            doc.save('data-penugasan.pdf', { autoDownload: false });

        }
    };

    /* ================ End Export Devotion Data ================ */


    /* ================ Pagination ================ */

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = assignmentData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(assignmentData.length / itemsPerPage); i++) {
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
                                <h1 style={{ fontSize: '16px', fontWeight: '700' }}>Daftar Penugasan</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={2} className="mt-4">
                                <Button
                                    style={{ width: '120px', height: '100%', fontSize: '14px' }}
                                    onClick={exportAssignmentData}
                                >
                                    Export <Image src={ExportIcon} style={{ marginLeft: '8px', width: '20px', }} />
                                </Button>
                            </Col>
                            <Col xl={10} className="mt-4 d-flex justify-content-end">
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
                    {currentItems && currentItems.length > 0 ? (
                        <>
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
                                {currentItems.map((assignment, index) => {

                                    const displayIndex = (index + 1).toString().padStart(2, '0');

                                    return (
                                        <Row className="table-body" key={assignment.id} style={{ padding: '12px' }}>
                                            <div className="d-flex align-items-center" style={{ padding: '16px 20px', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                                                <Col xl={1}>
                                                    <h6>{displayIndex}</h6>
                                                </Col>
                                                <Col xl={4}>
                                                    <h6>{assignment.assignmentName}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center">
                                                    <h6>{assignment.Lecturer.name}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center" style={{ marginLeft: '8px' }}>
                                                    <h6>{assignment.Lecturer.email}</h6>
                                                </Col>
                                                <Col xl={2} className="text-center" style={{ marginLeft: '5px' }}>
                                                    {assignment && assignment.assignmentValue ? (
                                                        <h6>{assignment.assignmentValue}</h6>
                                                    ) : (
                                                        <h6><span style={{ color: '#EA4D55' }}>*</span> Perlu dinilai</h6>
                                                    )}
                                                </Col>
                                                <Col xl={1} className="text-center" style={{ marginLeft: '4px' }}>
                                                    <Row style={{ display: 'flex', padding: '0', margin: '0' }}>
                                                        <Col xl={12} className="d-flex justify-content-center p-0">
                                                            <span className="view" onClick={() => navigate(`/expertisegroup/assignment/detail/${assignment.id}`)}>
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
                                    <h1 style={{ fontSize: '16px', color: '#989898', marginTop: '220px' }}>Belum ada penugasan yang ditambahkan pada periode ini.</h1>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>
            </div>
        </SuperadminDashboardLayout>

    );

};

export default ExpertiseGroupAssignment;