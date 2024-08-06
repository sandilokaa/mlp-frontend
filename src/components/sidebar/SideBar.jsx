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

import '../../assets/css/style.css';

const MySideBar = () => {

    const navigate = useNavigate();

    /* ================ Active Side Bar ================ */

    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/lecturer-dashboard')) {
            setActiveItem('lecturer-dashboard');
        } else if (path.includes('/lecturer-profile')) {
            setActiveItem('lecturer-profile');
        } else if (path.includes('/research')) {
            setActiveItem('research');
        } else {
            setActiveItem(null);
        }
    }, [location]);

    const handleClick = (item, path) => {
        setActiveItem(item);
        navigate(path);
    };

    /* ================ Active Side Bar ================ */

    return (

        <Sidebar id='side-bar-content' style={{ height: '100%', border: 'none' }}>
            <Menu className='menu-content p-3' style={{ height: '100%', border: 'none', backgroundColor: '#FFFFFF' }}>
                <Image src={LogoTelkom} alt='logoImage' style={{ width: '180px' }} />
                <div className='sub-menu'>
                    <span>Menu</span>
                </div>
                <div className='side-bar-menu-item'>
                    <MenuItem
                        className={`dashboard ${activeItem === 'lecturer-dashboard' ? 'active' : ''}`}
                        onClick={() => handleClick('lecturer-dashboard', '/lecturer-dashboard')}
                    >
                        <div className='d-flex align-items-center'>
                            <Image className='icon'/>
                            <span style={{ marginLeft: '6%' }}> Dashboard </span>
                        </div>
                    </MenuItem>
                    <MenuItem
                        className={`lecturer-profile ${activeItem === 'lecturer-profile' ? 'active' : ''}`}
                        onClick={() => handleClick('lecturer-profile', '/lecturer-profile')}
                    >
                        <div className='d-flex align-items-center'>
                            <Image className='icon'/>
                            <span style={{ marginLeft: '6%' }}> Profile Dosen </span>
                        </div>
                    </MenuItem>
                    <MenuItem
                        className={`research ${activeItem === 'research' ? 'active' : ''}`}
                        onClick={() => handleClick('research', '/research')}
                    >
                        <div className='d-flex align-items-center'>
                            <Image className='icon' />
                            <span style={{ marginLeft: '6%' }}> Penelitian </span>
                        </div>
                    </MenuItem>
                </div>
            </Menu>
        </Sidebar>

    );

};

export default MySideBar;