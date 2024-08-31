import React, { useState, useEffect } from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import ArrowIcon from "../../assets/images/icons/arrow-down.svg";

import '../../assets/css/style.css';

const CustomDropdown = ({ onChange }) => {

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

    /* ================ End Get Current User ================ */


    /* ================ Dropdown ================ */



    const [selectedOption, setSelectedOption] = useState(superadmin.groupName)
    const [isOpen, setIsOpen] = useState(false);

    const options = ["Digital Enterprise System and Technology", "Manufacturing & Process Engineering", "Enterprise and Industrial Management System"]; 

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };

    useEffect(() => {
        if (superadmin && superadmin.groupName) {
            setSelectedOption(superadmin.groupName);
            if (onChange) {
                onChange(superadmin.groupName);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [superadmin]);

    /* ================ End Dropdown ================ */



    return (
        <div className="dropdown">
            <button onClick={handleDropdownClick} className="dropdown-button" style={{ width: '100%' }}>
                <Row>
                    <Col xl={11} className='d-flex justify-content-start align-items-center'>
                        {selectedOption || superadmin.groupName}
                    </Col>
                    <Col xl={1} className='d-flex justify-content-end align-items-center'>
                        <Image src={ArrowIcon} style={{ width: '14px' }} />
                    </Col>
                </Row>
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option) => (
                        <li key={option} onClick={() => handleOptionClick(option)} className="dropdown-menu-item">
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

};

export default CustomDropdown;