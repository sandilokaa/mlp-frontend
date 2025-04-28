import React from "react";

const CardDashboard = ({title, children}) => {
    return (
        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '8px', height: 'auto', width: '100%' }}>
            <p style={{ fontWeight: 'bold' }}>Grafik Pengumpulan Laporan - {title}</p>
            <div className="mt-3">
                {children}
            </div>
            <div className="d-flex justify-content-center mt-2 gap-2" style={{fontSize: '8px', padding: '0 0 0 45px'}}>
                <div className="d-flex align-items-center gap-2">
                    <span style={{ backgroundColor: "#2181E8", height: '16px', width: '20px', borderRadius: '4px' }}></span>
                    <span>Digital Enterprise System and Technology</span>
                </div>
                <div className="d-flex align-items-center gap-2" style={{ marginLeft: '16px'}}>
                    <span style={{ backgroundColor: "#D62C35", height: '16px', width: '20px', borderRadius: '4px' }}></span>
                    <span>Manufacturing & Process Engineering</span>
                </div>
                <div className="d-flex align-items-center gap-2" style={{ marginLeft: '20px'}}>
                    <span style={{ backgroundColor: "#24A560", height: '16px', width: '20px', borderRadius: '4px' }}></span>
                    <span>Enterprise and Industrial Management System</span>
                </div>
            </div>
        </div>
    );
};

export default CardDashboard;