import React from 'react';
import { Nav } from "react-bootstrap"
import './Navbar.css'

const Navbars = ({allData,cacheData}) => {
    // console.log(allData);
    // console.log(cacheData)
    return (
        <div className="nav">
            {/* Nav bar */}
            {/* <Nav activeKey="/home"> */}
            <Nav.Item>
                <Nav.Link href="/DataViewer">Data</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/ResultViewer">Result</Nav.Link>
            </Nav.Item>
            {/* </Nav> */}
        </div>
    )
}

export default Navbars