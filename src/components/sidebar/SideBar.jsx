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

import LogoTelkom from "../../assets/images/logo.png";
import { ReactComponent as LogoutIcon } from "../../assets/images/icons/logout.svg";
import { ReactComponent as ProfileIcon } from "../../assets/images/icons/briefcase.svg";
import { ReactComponent as DashboardIcon } from "../../assets/images/icons/home-2.svg";

import '../../assets/css/style.css';

const MySideBar = () => {

    const navigate = useNavigate();

    /* ================ Active Side Bar ================ */

    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/lecturer/profile')) {
            setActiveItem('lecturer-profile');
        } else if (path.includes('/lecturer/devotion')) {
            setActiveItem('lecturer-devotion');
        } else if (path.includes('/lecturer/assignment')) {
            setActiveItem('lecturer-assignment');
        } else if (path.includes('/lecturer/list')) {
            setActiveItem('lecturer-list');
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

        navigate('/lecturer/login')

    };

    return (

        <Sidebar id='side-bar-content' style={{ height: '100%', border: 'none' }}>
            <Menu className='menu-content p-3' style={{ height: '100%', border: 'none', backgroundColor: '#FFFFFF' }}>
                <Image src={LogoTelkom} alt='logoImage' style={{ width: '180px' }} />
                <div className='sub-menu'>
                    <span>Menu</span>
                </div>
                <div>
                    <div className='side-bar-menu-item'>
                        <MenuItem
                            className={`lecturer-profile ${activeItem === 'lecturer-profile' ? 'active' : ''}`}
                            onClick={() => handleClick('lecturer-profile', '/lecturer/profile')}
                        >
                            <div className='d-flex align-items-center'>
                                <ProfileIcon className='sidebar-icon' />
                                <span style={{ marginLeft: '13px' }}> My Profile </span>
                            </div>
                        </MenuItem>
                        <MenuItem
                            className={`lecturer-devotion ${activeItem === 'lecturer-devotion' ? 'active' : ''}`}
                            onClick={() => handleClick('lecturer-devotion', '/lecturer/devotion')}
                        >
                            <div className='d-flex align-items-center'>
                                <ProfileIcon className='sidebar-icon' />
                                <span style={{ marginLeft: '13px' }}> Pengabdian </span>
                            </div>
                        </MenuItem>
                        <MenuItem
                            className={`lecturer-assignment ${activeItem === 'lecturer-assignment' ? 'active' : ''}`}
                            onClick={() => handleClick('lecturer-assignment', '/lecturer/assignment')}
                        >
                            <div className='d-flex align-items-center'>
                                <ProfileIcon className='sidebar-icon' />
                                <span style={{ marginLeft: '13px' }}> Penugasan </span>
                            </div>
                        </MenuItem>
                        <MenuItem
                            className={`lecturer-list ${activeItem === 'lecturer-list' ? 'active' : ''}`}
                            onClick={() => handleClick('lecturer-list', '/lecturer/list')}
                        >
                            <div className='d-flex align-items-center'>
                                <ProfileIcon className='sidebar-icon' />
                                <span style={{ marginLeft: '13px' }}> Daftar Dosen </span>
                            </div>
                        </MenuItem>
                        <div className='d-flex align-items-center' style={{ cursor: 'pointer', padding: '15px 0', backgroundColor: '#FFFFFF', width: '100%' }} onClick={onLogout}>
                            <LogoutIcon className='logout-icon' />
                            <span style={{ marginLeft: '13px', fontSize: '14px', color: '#989898' }}>Log out</span>
                        </div>
                    </div>
                </div>
            </Menu>
        </Sidebar>

    );

};

export default MySideBar;