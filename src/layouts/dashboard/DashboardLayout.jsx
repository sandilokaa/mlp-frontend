import React from "react";

import MySideBar from "../../components/sidebar/SideBar";
import NavbarDashboard from "../../components/navbar/Navbar";

const DashboardLayout = ({ children }) => {

    return (

        <div style={{ display: 'flex' }}>
            <div>
                <MySideBar />
            </div>
            <div style={{ width: '100%', backgroundColor: '#FAFAFA' }}>
                <div style={{ backgroundColor: '#FFFFFF' }}>
                    <NavbarDashboard />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>

    );

};

export default DashboardLayout;