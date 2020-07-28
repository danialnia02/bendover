import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts"
import axios from 'axios';
import './ResultViewer.css'
import { Navbar, Nav, Form, Button, InputGroup, FormControl } from "react-bootstrap"
import Navbars from "../Navbar"
import Col from 'react-bootstrap/Col';

import {isMobile } from "react-device-detect";

var data = require('./data.js')

var link2 = "null"


const ResultViewer = () => {
  const [newData, setnewData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [state, setState] = React.useState({
    width: '100%',
    height: '400px',
    chartType: 'Gantt',
    loader: <div><h1>Loading Chart..</h1></div>,
    data: null,
    festivalInput: "",
    festivals: "",    
    web: 'http://localhost:8011/',
    mobile:'http://10.0.2.2/',
    testLink:null

  })


  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    })
  }
  

  // Get custom input
  const handleSubmit = (event) => {
    setLoading(true)
    event.preventDefault()
    var festival = state.festivals
    var link;    
    
    if(isMobile){
      link=state.mobile;
    }else{
      link=state.web;
    }

    var link2 = link + festival + "/result/" + state.festivalInput
    setState({
      ...state,
      ["testLink"]: link2
    })
    console.log(link2)

    axios.get(link2)
      .then(res => {
        var data = res.data
        console.log(data)
        if (res.data.length == 0) {
          console.log("There is no data here")
        } else {
          setState({
            ...state,
            ["data"]: data
          })
          setnewData(data)
        }
      })
  }

  function getData() {
    if (newData == null || newData == "") {
      console.log(state.data)
      return state.data;
    } else {
      var newArray = newData;
      for (var i = 1; i < newArray.length; i++) {
        newArray[i][3] = new Date(newData[i][3])
        newArray[i][4] = new Date(newData[i][4])
      }
      console.log(newArray)

      return newArray
    }
  }

  //
  //Get all inputs
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      setState({
        ...state,
        ["data"]: null //data.exportTime()
      })
      setTimeout('', 3000)
      console.log(console.log(data.exportTime()))
      setLoading(false);
    };

    fetchPosts();
  }, []);


  return (
    <div id='body'>
      <div class='container'>
        <h1>Result Viewer</h1>
        <h1>{state.testLink}</h1>
        {/* <h1 class='text-primary table-title mb-3'>Data Viewer</h1> */}

        <Nav activeKey="/ResultViewer">
          <Navbars></Navbars>
        </Nav>
        {/* Navbar header Code */}
        <Navbar bg="light" expand="lg ">
          <Navbar.Brand href="#home">Music-Db</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            {/* <Navbar className=""> */}
            {/* <Form className="row containerforfilterbox2 d-flex justify-content-center">
              <div className="filtersection2">
                <form onSubmit={handleSubmit}>
                  <Form.Row> 

                    <Form.Group as={Col} controlId="category1">
                      <Form.Control as="select" value="Choose..." name="festivals" size="5" value={state.festivals} onChange={handleChange}>
                        <option></option>
                        <option value="basic">basic</option>
                        <option value="advance">advance</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="searchid1">
                      <input type="number" min="1" placeholder="Search" name="festivalInput" size="5" value={state.festivalInput} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="searchbutton">
                      <div className="d-block justify-content-center">
                        <Button variant="outline-success" type="submit">Search</Button>
                      </div>
                    </Form.Group>
                    
                  </Form.Row>
                </form>
              </div>

            </Form> */}
            <form onSubmit={handleSubmit}>
              <Form inline>

                <InputGroup className="mb-3 mr-sm-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Type of Result</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control as="select" value="Choose..." name="festivals" size="5" value={state.festivals} onChange={handleChange}>
                    <option></option>
                    <option value="basic">basic</option>
                    <option value="advance">advance</option>
                  </Form.Control>
                </InputGroup>


                <InputGroup className="mb-3 mr-sm-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>FestivalID</InputGroup.Text>
                  </InputGroup.Prepend>
                  <input type="number" min="1" placeholder="Search" name="festivalInput" size="5" value={state.festivalInput} onChange={handleChange} />
                </InputGroup>
                <Button type="submit" className="mb-2">
                  Submit
            </Button>
              </Form>
            </form>

            {/* </Navbar> */}
          </Navbar.Collapse>
        </Navbar>
        {/* <Header /> */}

        {/* output Code */}
        <div id="smallcontainer">
          <div id="chart">
            <Chart
              width={state.width}
              height={state.height}
              chartType={state.chartType}
              loader={state.loader}
              data=
              {getData()}
              options={{
                height: 400,
                gantt: {
                  trackHeight: 30,
                },
              }}
              rootProps={{ 'data-testid': '2' }}
            />
          </div>
        </div>
      </div>
    </div >
  )
}

export default ResultViewer