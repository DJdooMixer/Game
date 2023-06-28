import React, { useState } from 'react';
import './Sidebar.css'; // Assuming you have a CSS file for styling
import SidebarToggleButton from './SidebarToggleButton';

const Sidebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>

            <SidebarToggleButton img={props.mbi} isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <SidebarToggleButton img={props.mbi} isOpen={isOpen} toggleSidebar={toggleSidebar} />
               
                <img className="standard_image" src={props.normal} alt="normal" />
                <img className="standard_image" src={props.special} alt="special" />

            </div>
        </div>
    );
};

export default Sidebar;