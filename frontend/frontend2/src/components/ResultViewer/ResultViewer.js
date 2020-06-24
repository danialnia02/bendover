import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts"
import axios from 'axios';
import './ResultViewer.css'
import { Navbar, Nav, Form, Button, Table } from "react-bootstrap"
import Navbars from "../Navbar"
import Col from 'react-bootstrap/Col';

var data = require('./data.js')


const ResultViewer = () => {
  const [loading, setLoading] = useState(false);

  const [state, setState] = React.useState({
    width: '100%',
    height: '400px',
    chartType: 'Gantt',
    loader: <div>Loading Chart</div>,
    data: (data.exportTime()),
    festivalInput: "",
    festivals: "",
    link11: 'http://10.0.2.2/basic/result',
    link22: 'http://192.168.1.204:8011/',
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
    event.preventDefault()
    var festival=state.festivals    
    var url=state.link22+festival+"/result/"+state.festivalInput
    console.log(url)    
    // try{
    //   axios.post(state.searchLink, info)
    //   .then(res => {
    //     var data = res.data
    //     if (res.data.length == 0) {
    //       console.log("There is no data here")
    //       setState({
    //         ...state,
    //         ["arrayLength"]: 0
    //       })
    //     }
    //     setPosts(res.data)
    //   })
    // }catch(err){
    axios.get(url)
      .then(res => {
        var data = res.data
        if (res.data.length == 0) {
          console.log("There is no data here")          
        }else{
          setState({
            ...state,
            ["data"]: data
          })
          console.log(state.data)
        }
        // console.log(res.data)
      })
    // }
  }

  //
  //Get all inputs
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      setLoading(false);
    };

    fetchPosts();
  }, []);



  return (
    <div id='body'>
      <div class='container'>
        <h1>Data Viewer</h1>
        {/* <h1 class='text-primary table-title mb-3'>Data Viewer</h1> */}

        <Nav activeKey="/home">
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
            {state.data}
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