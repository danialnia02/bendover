import React from 'react';

import './Navbar.css';
const navbar = props => (
    <header className="navbar">
        <div className="layer1">
            <nav className="navbar_navigation">
                <div className="spacer" />
                <div className="navbar_navigation-items">
                    <ul>
                        <li><a href="/">Poll</a></li>
                        <li><a href="/">Contact</a></li>
                        <li><a href="/">Login</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className="layer2">
            <nav className="navbar_navigation2">
                <div></div>
                <div className="navbar_logo2"><a href ="/">THE LOGO</a></div>
                <div className="spacer2" />
                <div className="navbar_navigation-items2">
                    <ul>
                        <li><a href="/">NEWS</a></li>
                        <li><a href="/">EVENTS</a></li>
                        <li><a href="/">MEDIA</a></li>
                        <li><a href="/">ABOUT</a></li>
                    </ul>
                </div>
                <form className ="searchbar">
                    <label>
                        <input type="text" name="submit" />
                    </label>
                    <input type="submit" value="Search" />
                </form>
            </nav>
        </div>
    </header>
);

export default navbar;
