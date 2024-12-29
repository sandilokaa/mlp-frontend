import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Image
} from "react-bootstrap";
import {
    Sidebar,
    Menu,
    MenuItem
} from 'react-pro-sidebar';
import axios from "axios";

import LogoTelkom from "../../assets/images/logo.png";

import { ReactComponent as LogoutIcon } from "../../assets/images/icons/logout.svg";
import { ReactComponent as DevotionIcon } from "../../assets/images/icons/briefcase.svg";
import { ReactComponent as ResearchIcon } from "../../assets/images/icons/task-square.svg";
import { ReactComponent as ListLecturerIcon } from "../../assets/images/icons/profile-2user.svg";
import { ReactComponent as ProfileIcon } from "../../assets/images/icons/profile.svg";
import { ReactComponent as ReportIcon } from "../../assets/images/icons/document-text.svg";
import { ReactComponent as Dashboard } from "../../assets/images/icons/home-2.svg";
import { ReactComponent as ClaimIcon } from "../../assets/images/icons/claim.svg";

import '../../assets/css/style.css';

const LeaderSideBar = () => {

    /* ================ Get Current User ================ */

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(true);
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

                setIsLoggedIn(false);

            }

        };

        validateLogin();

        setIsRefresh(false);

    }, [isRefresh]);

    /* ================ Get Current User ================ */



    /* ================ Active Side Bar ================ */

    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/expertisegroup/profile')) {
            setActiveItem('superadmin-profile');
        } else if (path.includes('/expertisegroup/dashboard')) {
            setActiveItem('superadmin-dashboard');
        } else if (path.includes('/expertisegroup/devotion')) {
            setActiveItem('superadmin-devotion');
        } else if (path.includes('/expertisegroup/research')) {
            setActiveItem('superadmin-research');
        } else if (path.includes('/expertisegroup/publication')) {
            setActiveItem('superadmin-publication');
        } else if (path.includes('/expertisegroup/ipright')) {
            setActiveItem('superadmin-ipright');
        } else if (path.includes('/expertisegroup/patent')) {
            setActiveItem('superadmin-patent');
        } else if (path.includes('/expertisegroup/report')) {
            setActiveItem('superadmin-report');
        } else if (path.includes('/expertisegroup/lecturer/list')) {
            setActiveItem('superadmin-lecturer');
        } else if (path.includes('/dean/lecturer/list')) {
            setActiveItem('superadmin-lecturer');
        } else if (path.includes('/dean/dashboard')) {
            setActiveItem('superadmin-dashboard');
        } else if (path.includes('/dean/profile')) {
            setActiveItem('superadmin-profile');
        } else if (path.includes('/dean/report')) {
            setActiveItem('superadmin-report');
        } else {
            setActiveItem(null);
        }
    }, [location]);

    const handleClick = (item, path) => {
        setActiveItem(item);
        navigate(path);
    };

    /* ================ Active Side Bar ================ */

    const onLogout = () => {

        localStorage.removeItem('token');

        navigate('/superadmin/login')

    };

    return isLoggedIn ? (

        <div style={{ height: '100%', position: 'relative', background: '#FFFFFF' }}>
            <Sidebar id='side-bar-content' style={{ height: '100%', border: 'none' }}>
                <Menu className='menu-content p-3' style={{ height: '100%', border: 'none', backgroundColor: '#FFFFFF' }}>
                    <Image src={LogoTelkom} alt='logoImage' style={{ width: '180px' }} />
                    <div className='sub-menu'>
                        <span>Menu</span>
                    </div>
                    <div>
                        <div className='side-bar-menu-item'>
                            {superadmin.role === 'expertiseGroup' && (
                                <>
                                    <MenuItem
                                        className={`superadmin-dashboard ${activeItem === 'superadmin-dashboard' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-dashboard', '/expertisegroup/dashboard')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <Dashboard className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Dashboard </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-lecturer ${activeItem === 'superadmin-lecturer' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-lecturer', '/expertisegroup/lecturer/list')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ListLecturerIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Dosen </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-research ${activeItem === 'superadmin-research' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-research', '/expertisegroup/research')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ResearchIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Penelitian </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-publication ${activeItem === 'superadmin-publication' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-publication', '/expertisegroup/publication')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ResearchIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Publikasi </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-devotion ${activeItem === 'superadmin-devotion' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-devotion', '/expertisegroup/devotion')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <DevotionIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Pengabdian </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-ipright ${activeItem === 'superadmin-ipright' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-ipright', '/expertisegroup/ipright')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ClaimIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> HAKI </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-patent ${activeItem === 'superadmin-patent' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-patent', '/expertisegroup/patent')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ClaimIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Hak Paten </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-report ${activeItem === 'superadmin-report' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-report', '/expertisegroup/report')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ReportIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Laporan </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-profile ${activeItem === 'superadmin-profile' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-profile', '/expertisegroup/profile')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ProfileIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> My profile </span>
                                        </div>
                                    </MenuItem>
                                </>
                            )}

                            {superadmin.role === 'facultyDean' && (
                                <>
                                    <MenuItem
                                        className={`superadmin-dashboard ${activeItem === 'superadmin-dashboard' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-dashboard', '/dean/dashboard')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <Dashboard className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Dashboard </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-lecturer ${activeItem === 'superadmin-lecturer' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-lecturer', '/dean/lecturer/list')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ListLecturerIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Daftar Dosen </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-report ${activeItem === 'superadmin-report' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-report', '/dean/report')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ReportIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> Laporan </span>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        className={`superadmin-profile ${activeItem === 'superadmin-profile' ? 'active' : ''}`}
                                        onClick={() => handleClick('superadmin-profile', '/dean/profile')}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <ProfileIcon className='sidebar-icon' />
                                            <span style={{ marginLeft: '6%' }}> My profile </span>
                                        </div>
                                    </MenuItem>
                                </>
                            )}
                        </div>
                    </div>
                </Menu>
            </Sidebar>
            <div
                className='d-flex align-items-center'
                style={{ cursor: 'pointer', padding: '15px 40px', backgroundColor: '#FFFFFF', width: '100%', position: 'absolute', bottom: '20px', zIndex: '999' }}
                onClick={onLogout}
            >
                <LogoutIcon className='logout-icon' />
                <span style={{ marginLeft: '13px', fontSize: '14px', color: '#989898' }}>Log out</span>
            </div>
        </div>

    ) : (navigate("/superadmin/login"));

};

export default LeaderSideBar;