import React, { Component } from 'react';
import axios from 'axios';
import { Nav } from "react-bootstrap"
import './Navbar.css'

const Navbars = () => {
    return (
        <div className="nav">
            {/* Nav bar */}
            {/* <Nav activeKey="/home"> */}
            <Nav.Item>
                <Nav.Link href="/home">Data</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Result</Nav.Link>
            </Nav.Item>
            {/* </Nav> */}
        </div>
    )
}

export default Navbars