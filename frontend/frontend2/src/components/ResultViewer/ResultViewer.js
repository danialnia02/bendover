import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts"
import axios from 'axios';
import './ResultViewer.css'
import { Navbar, Nav, Form, Button, Table } from "react-bootstrap"
import Navbars from "../Navbar"
import Col from 'react-bootstrap/Col';

var data = require('./data.js')


const ResultViewer = () => {
  const [newData, setnewData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [state, setState] = React.useState({
    width: '100%',
    height: '400px',
    chartType: 'Gantt',
    loader: <div>Loading Chart</div>,
    data: null,
    festivalInput: "",
    festivals: "",    
    // link22: 'http://192.168.1.204:8011/',
    link22:'http://localhost:8011/'
    
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
    var url = state.link22 + festival + "/result/" + state.festivalInput
    console.log(url)

    axios.get(url)
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
      var newArray=newData;
      for(var i=1;i<newArray.length;i++){
        newArray[i][3]=new Date(newData[i][3])
        newArray[i][4]=new Date(newData[i][4])
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
        ["data"]: data.exportTime()
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
        <h1>Data Viewer</h1>
        {/* <h1 class='text-primary table-title mb-3'>Data Viewer</h1> */}

        <Nav activeKey="/ResultViewer">
          <Navbars></Navbars>
        </Nav>
        {/* Navbar header Code */}
        <Navbar bg="light" expand="lg ">
          {/* <Navbar.Brand href="#home">Music-Db</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            {/* <Navbar className=""> */}
            <Form className="row d-flex justify-content-center">
              <Form.Row>
                <form onSubmit={handleSubmit}>
                  <Form.Row> {/*row for categories*/}
                    <Form.Group as={Col} controlId="category1">
                      <Form.Control as="select" value="Choose..." name="festivals" size="5" value={state.festivals} onChange={handleChange}>
                        <option></option>
                        <option value="basic">basic</option>
                        <option value="advance">advance</option>
                      </Form.Control>
                    </Form.Group>
                  </Form.Row> {/*end row for categories*/}
                  <Form.Row> {/*row for searchid*/}
                    {/*searchbox*/}
                    <Form.Group as={Col} controlId="searchid1">
                      <input type="number" min="1" placeholder="Search" name="festivalInput" size="5" value={state.festivalInput} onChange={handleChange} />
                    </Form.Group>
                  </Form.Row> {/*end row for searchid*/}
                  <div className="d-block justify-content-center">
                    <Button variant="outline-success" type="submit">Search</Button>
                  </div>
                </form>
              </Form.Row>
            </Form>
            {/* </Navbar> */}
          </Navbar.Collapse>
        </Navbar>
        {/* <Header /> */}

        {/* output Code */}
        <div id="smallcontainer">
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
    </div >
  )
}

export default ResultViewer