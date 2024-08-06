import React from "react";

import SuperadminSidebar from "../../components/sidebar/SuperadminSidebar";
import SuperadminNavbar from "../../components/navbar/SuperadminNavbar";

const SuperadminDashboardLayout = ({ children }) => {

    return (

        <div style={{ display: 'flex' }}>
            <div>
                <SuperadminSidebar />
            </div>
            <div style={{ width: '100%', backgroundColor: '#FAFAFA' }}>
                <div style={{ backgroundColor: '#FFFFFF' }}>
                    <SuperadminNavbar />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>

    );

};

export default SuperadminDashboardLayout;