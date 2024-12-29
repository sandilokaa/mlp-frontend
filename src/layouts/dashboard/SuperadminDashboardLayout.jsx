import React from "react";

import SuperadminSidebar from "../../components/sidebar/SuperadminSidebar";
import SuperadminNavbar from "../../components/navbar/SuperadminNavbar";

const SuperadminDashboardLayout = ({ children }) => {

    return (

        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div>
                <SuperadminSidebar />
            </div>
            <div className="d-flex" style={{ width: '100%', backgroundColor: '#FAFAFA', flexDirection: 'column' }}>
                <div style={{ backgroundColor: '#FFFFFF' }}>
                    <SuperadminNavbar />
                </div>
                <div style={{ flexGrow: 1, overflow: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>

    );

};

export default SuperadminDashboardLayout;