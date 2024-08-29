import React, { useState } from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import ArrowIcon from "../../assets/images/icons/arrow-down.svg";

import '../../assets/css/style.css';

const CustomDropdown = ({ onChange }) => {

    /* ================ Dropdown ================ */



    const [selectedOption, setSelectedOption] = useState()
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

    /* ================ End Dropdown ================ */



    return (
        <div className="dropdown">
            <button onClick={handleDropdownClick} className="dropdown-button" style={{ width: '305px' }}>
                <Row>
                    <Col xl={11} className='d-flex justify-content-start align-items-center'>
                        {selectedOption || "Digital Enterprise System and Technology"}
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