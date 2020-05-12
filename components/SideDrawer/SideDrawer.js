import React from 'react';

import './SideDrawer.css';
const SideDrawer = props => {
    let drawerClasses = 'side-drawer'
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li><a href="/">Poll</a></li>
                <li><a href="/">Contact</a></li>
                <li><a href="/">Login</a></li>
                <li><a href="/">NEWS</a></li>
                <li><a href="/">EVENTS</a></li>
                <li><a href="/">MEDIA</a></li>
                <li><a href="/">ABOUT</a></li>
            </ul>
        </nav>
    );
};

export default SideDrawer;