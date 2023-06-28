import React from 'react';

const SidebarToggleButton = ({img, isOpen, toggleSidebar}) => {
    return (
        <img 
            onClick={toggleSidebar}
            className="sidebar_image standard_image"
            src={img}
            alt="Toggle" />
    );
};

export default SidebarToggleButton;

