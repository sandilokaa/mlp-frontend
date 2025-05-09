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
import { ReactComponent as DevotionIcon } from "../../assets/images/icons/briefcase.svg";
import { ReactComponent as AssignmentIcon } from "../../assets/images/icons/task-square.svg";
import { ReactComponent as ListLecturerIcon } from "../../assets/images/icons/profile-2user.svg";
import { ReactComponent as ProfileIcon } from "../../assets/images/icons/profile.svg";
import { ReactComponent as ClaimIcon } from "../../assets/images/icons/claim.svg";

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
        } else if (path.includes('/lecturer/research')) {
            setActiveItem('lecturer-research');
        } else if (path.includes('/lecturer/publication')) {
            setActiveItem('lecturer-publication');
        } else if (path.includes('/lecturer/list')) {
            setActiveItem('lecturer-list');
        } else if (path.includes('/lecturer/ipright')) {
            setActiveItem('lecturer-ipright');
        } else if (path.includes('/lecturer/patent')) {
            setActiveItem('lecturer-patent');
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

        <div style={{ height: '100%', position: 'relative', background: '#FFFFFF' }}>
            <Sidebar id='side-bar-content' style={{ border: 'none' }}>
                <Menu className='menu-content p-3' style={{ height: '100%', border: 'none', backgroundColor: '#FFFFFF' }}>
                    <Image src={LogoTelkom} alt='logoImage' style={{ width: '180px' }} />
                    <div className='sub-menu'>
                        <span>Menu</span>
                    </div>
                    <div>
                        <div className='side-bar-menu-item'>
                            <MenuItem
                                className={`lecturer-list ${activeItem === 'lecturer-list' ? 'active' : ''}`}
                                onClick={() => handleClick('lecturer-list', '/lecturer/list')}
                            >
                                <div className='d-flex align-items-center'>
                                    <ListLecturerIcon className='sidebar-icon' />
                                    <span style={{ marginLeft: '13px' }}> Daftar Dosen </span>
                                </div>
                            </MenuItem>
                            <MenuItem
                                className={`lecturer-research ${activeItem === 'lecturer-research' ? 'active' : ''}`}
                                onClick={() => handleClick('lecturer-research', '/lecturer/research')}
                            >
                                <div className='d-flex align-items-center'>
                                    <AssignmentIcon className='sidebar-icon' />
                                    <span style={{ marginLeft: '13px' }}> Penelitian </span>
                                </div>
                            </MenuItem>
                            <MenuItem
                                className={`lecturer-publication ${activeItem === 'lecturer-publication' ? 'active' : ''}`}
                                onClick={() => handleClick('lecturer-publication', '/lecturer/publication')}
                            >
                                <div className='d-flex align-items-center'>
                                    <AssignmentIcon className='sidebar-icon' />
                                    <span style={{ marginLeft: '13px' }}> Publikasi </span>
                                </div>
                            </MenuItem>
                            <MenuItem
                                className={`lecturer-devotion ${activeItem === 'lecturer-devotion' ? 'active' : ''}`}
                                onClick={() => handleClick('lecturer-devotion', '/lecturer/devotion')}
                            >
                                <div className='d-flex align-items-center'>
                                    <DevotionIcon className='sidebar-icon' />
                                    <span style={{ marginLeft: '13px' }}> Pengabdian </span>
                                </div>
                            </MenuItem>
                            <MenuItem
                                className={`lecturer-ipright ${activeItem === 'lecturer-ipright' ? 'active' : ''}`}
                                onClick={() => handleClick('lecturer-ipright', '/lecturer/ipright')}
                            >
                                <div className='d-flex align-items-center'>
                                    <ClaimIcon className='sidebar-icon' />
                                    <span style={{ marginLeft: '13px' }}> HAKI </span>
                                </div>
                            </MenuItem>
                            <MenuItem
                                className={`lecturer-patent ${activeItem === 'lecturer-patent' ? 'active' : ''}`}
                                onClick={() => handleClick('lecturer-patent', '/lecturer/patent')}
                            >
                                <div className='d-flex align-items-center'>
                                    <ClaimIcon className='sidebar-icon' />
                                    <span style={{ marginLeft: '13px' }}> Hak Paten </span>
                                </div>
                            </MenuItem>
                            <MenuItem
                                className={`lecturer-profile ${activeItem === 'lecturer-profile' ? 'active' : ''}`}
                                onClick={() => handleClick('lecturer-profile', '/lecturer/profile')}
                            >
                                <div className='d-flex align-items-center'>
                                    <ProfileIcon className='sidebar-icon' />
                                    <span style={{ marginLeft: '13px' }}> My Profile </span>
                                </div>
                            </MenuItem>
                        </div>
                    </div>
                </Menu>
            </Sidebar>
            <div
                className='d-flex align-items-center'
                style={{ cursor: 'pointer', padding: '15px 40px', backgroundColor: '#FFFFFF', width: '100%', position: 'absolute', bottom: '20px' }}
                onClick={onLogout}
            >
                <LogoutIcon className='logout-icon' />
                <span style={{ marginLeft: '13px', fontSize: '14px', color: '#989898' }}>Log out</span>
            </div>
        </div>

    );

};

export default MySideBar;