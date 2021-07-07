import React from 'react';
import './sidebarRow.css';
const SidebarRow = ({Icon,title,selected}) => {
    return (
        <div className={`sidebarRow ${selected && 'selected'}`}>
            <Icon className='sidebarRow__icon'/>
            <h1>{title}</h1>
        </div>
    )
}

export default SidebarRow;
