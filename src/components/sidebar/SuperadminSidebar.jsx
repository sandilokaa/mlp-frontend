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
        if (path.includes('/superadmin/dashboard')) {
            setActiveItem('superadmin-dashboard');
        } else if (path.includes('/superadmin/profile')) {
            setActiveItem('superadmin-profile');
        } else if (path.includes('/superadmin/research')) {
            setActiveItem('superadmin-research');
        } else if (path.includes('/superadmin/report')) {
            setActiveItem('superadmin-report');
        } else if (path.includes('/superadmin/lecturer/list')) {
            setActiveItem('superadmin-lecturer');
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
                                    className={`dashboard ${activeItem === 'superadmin-dashboard' ? 'active' : ''}`}
                                    onClick={() => handleClick('superadmin-dashboard', '/superadmin/dashboard')}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Image className='icon' />
                                        <span style={{ marginLeft: '6%' }}> Dashboard </span>
                                    </div>
                                </MenuItem>
                                <MenuItem
                                    className={`superadmin-lecturer ${activeItem === 'superadmin-lecturer' ? 'active' : ''}`}
                                    onClick={() => handleClick('superadmin-lecturer', '/superadmin/lecturer/list')}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Image className='icon' />
                                        <span style={{ marginLeft: '6%' }}> Dosen </span>
                                    </div>
                                </MenuItem>
                                <MenuItem
                                    className={`superadmin-research ${activeItem === 'superadmin-research' ? 'active' : ''}`}
                                    onClick={() => handleClick('superadmin-research', '/superadmin/research')}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Image className='icon' />
                                        <span style={{ marginLeft: '6%' }}> Penelitian </span>
                                    </div>
                                </MenuItem>
                                <MenuItem
                                    className={`superadmin-profile ${activeItem === 'superadmin-profile' ? 'active' : ''}`}
                                    onClick={() => handleClick('superadmin-profile', '/superadmin/profile')}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Image className='icon' />
                                        <span style={{ marginLeft: '6%' }}> My profile </span>
                                    </div>
                                </MenuItem>
                                <MenuItem
                                    className={`superadmin-report ${activeItem === 'superadmin-report' ? 'active' : ''}`}
                                    onClick={() => handleClick('superadmin-report', '/superadmin/report')}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Image className='icon' />
                                        <span style={{ marginLeft: '6%' }}> Laporan </span>
                                    </div>
                                </MenuItem>
                                <div className='logout d-flex align-items-center' style={{ cursor: 'pointer', padding: '15px 0' }} onClick={onLogout}>
                                    <LogoutIcon className='sidebar-icon' />
                                    <span style={{ marginLeft: '13px' }}>Log out</span>
                                </div>
                            </>
                        )}
                        
                        {superadmin.role === 'facultyDean' && (
                            <>
                                <MenuItem
                                    className={`superadmin-profile ${activeItem === 'superadmin-profile' ? 'active' : ''}`}
                                    onClick={() => handleClick('superadmin-profile', '/superadmin/profile')}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Image className='icon' />
                                        <span style={{ marginLeft: '6%' }}> Dashboard </span>
                                    </div>
                                </MenuItem>
                                <MenuItem
                                    className={`superadmin-profile ${activeItem === 'superadmin-profile' ? 'active' : ''}`}
                                    onClick={() => handleClick('superadmin-profile', '/superadmin/profile')}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Image className='icon' />
                                        <span style={{ marginLeft: '6%' }}> Daftar Dosen </span>
                                    </div>
                                </MenuItem>
                                <MenuItem
                                    className={`superadmin-profile ${activeItem === 'superadmin-profile' ? 'active' : ''}`}
                                    onClick={() => handleClick('superadmin-profile', '/superadmin/profile')}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Image className='icon' />
                                        <span style={{ marginLeft: '6%' }}> My profile </span>
                                    </div>
                                </MenuItem>
                                <MenuItem
                                    className={`superadmin-profile ${activeItem === 'superadmin-profile' ? 'active' : ''}`}
                                    onClick={() => handleClick('superadmin-profile', '/superadmin/profile')}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Image className='icon' />
                                        <span style={{ marginLeft: '6%' }}> Laporan </span>
                                    </div>
                                </MenuItem>
                            </>
                        )}
                    </div>
                </div>
            </Menu>
        </Sidebar>

    ) : (navigate("/superadmin/login"));

};

export default LeaderSideBar;