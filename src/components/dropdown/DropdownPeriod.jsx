import React, { useState } from 'react';
import { Image } from 'react-bootstrap';

import ArrowDownBlack from "../../assets/images/icons/arrow-down-b.svg";

import '../../assets/css/style.css';

const DropdownPeriod = ({ onChange }) => {


    /* ================ Dropdown ================ */
    
    const [selectedOption, setSelectedOption] = useState()
    const [isOpen, setIsOpen] = useState(false);

    const options = ["Ganjil 2024", "Genap 2024", "Ganjil 2023", "Genap 2023"];

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
        <div className="dropdown-period">
            <div 
                onClick={handleDropdownClick}
                className="d-flex align-items-center" 
                style={{ margin: 'auto 0', padding: ' 5px 10px', background: '#EFEFEF', color: '#292929', borderRadius: '4px', gap: '13px', height: '45px', cursor: 'pointer' }}
            >
                <p style={{ margin: 'auto 0', fontSize: '14px' }}>{selectedOption || 'Ganjil 2024'}</p>
                <Image src={ArrowDownBlack} />
            </div>
            {isOpen && (
                <ul className="dropdown-period-menu">
                    {options.map((option) => (
                        <li key={option} onClick={() => handleOptionClick(option)} className="dropdown-period-menu-item">
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

};

export default DropdownPeriod;