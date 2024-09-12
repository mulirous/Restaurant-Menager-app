import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';  // Ajuste o caminho conforme necessário

function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={styles.wrapper}>
            <Sidebar toggleSidebar={handleSidebarToggle} isOpen={isSidebarOpen} />
            <div style={{ ...styles.container, marginLeft: isSidebarOpen ? '200px' : '60px' }}>
                {children}
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
    },
    container: {
        margin: '0px',
        padding: '20px',
        transition: 'margin-left 0.3s ease-in-out',
        width: '100%',
    },
};

export default Layout;
