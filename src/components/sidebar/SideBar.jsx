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
        if (path.includes('/lecturer/dashboard')) {
            setActiveItem('lecturer-dashboard');
        } else if (path.includes('/lecturer/profile')) {
            setActiveItem('lecturer-profile');
        } else if (path.includes('/lecturer/research')) {
            setActiveItem('lecturer-research');
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

        <Sidebar id='side-bar-content' style={{ height: '100%', border: 'none', position: 'relative' }}>
            <Menu className='menu-content p-3' style={{ height: '100%', border: 'none', backgroundColor: '#FFFFFF' }}>
                <Image src={LogoTelkom} alt='logoImage' style={{ width: '180px' }} />
                <div className='sub-menu'>
                    <span>Menu</span>
                </div>
                <div className='side-bar-menu-item'>
                    <MenuItem
                        className={`dashboard ${activeItem === 'lecturer-dashboard' ? 'active' : ''}`}
                        onClick={() => handleClick('lecturer-dashboard', '/lecturer/dashboard')}
                    >
                        <div className='d-flex align-items-center'>
                            <DashboardIcon className='sidebar-icon' />
                            <span style={{ marginLeft: '13px' }}> Dashboard </span>
                        </div>
                    </MenuItem>
                    <MenuItem
                        className={`lecturer-profile ${activeItem === 'lecturer-profile' ? 'active' : ''}`}
                        onClick={() => handleClick('lecturer-profile', '/lecturer/profile')}
                    >
                        <div className='d-flex align-items-center'>
                            <ProfileIcon className='sidebar-icon' />
                            <span style={{ marginLeft: '13px' }}> Profile Dosen </span>
                        </div>
                    </MenuItem>
                    <MenuItem
                        className={`lecturer-research ${activeItem === 'lecturer-research' ? 'active' : ''}`}
                        onClick={() => handleClick('lecturer-research', '/lecturer/research')}
                    >
                        <div className='d-flex align-items-center'>
                            <ProfileIcon className='sidebar-icon' />
                            <span style={{ marginLeft: '13px' }}> Penelitian </span>
                        </div>
                    </MenuItem>
                    <div className='logout d-flex align-items-center' style={{ cursor: 'pointer' }} onClick={onLogout}>
                        <LogoutIcon className='sidebar-icon' />
                        <span style={{ marginLeft: '13px' }}>Log out</span>
                    </div>
                </div>
            </Menu>
        </Sidebar>

    );

};

export default MySideBar;