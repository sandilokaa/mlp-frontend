import React from "react";

import MySideBar from "../../components/sidebar/SideBar";
import Lecturer from "../../components/navbar/LecturerNavbar";

const DashboardLayout = ({ children }) => {

    return (

        <div style={{ display: 'flex' }}>
            <div>
                <MySideBar />
            </div>
            <div style={{ width: '100%', backgroundColor: '#FAFAFA' }}>
                <div style={{ backgroundColor: '#FFFFFF' }}>
                    <Lecturer />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>

    );

};

export default DashboardLayout;