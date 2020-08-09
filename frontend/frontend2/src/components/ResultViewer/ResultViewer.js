import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts"
import axios from 'axios';
import './ResultViewer.css'
import { Navbar, Nav, Form, Button, InputGroup, FormControl } from "react-bootstrap"
import Navbars from "../Navbar"
import Col from 'react-bootstrap/Col';
import functions from './functions';


import { isMobile } from "react-device-detect";
import { Plugins } from '@capacitor/core'
import { resultsArray } from '../DataViewer/functions';

const { Storage } = Plugins;

var data = require('./data.js')
var link2 = "null"

const ResultViewer = () => {
  const [newData, setnewData] = useState([]);
  const [allData, setallData] = useState([]);
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
    mobile: 'http://10.0.2.2/',
    links: null,

    allData: null,
    description: "Currently showing nothing, enter your input above to retrive your data."
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
    var dataType = state.festivals
    var festivalInput = state.festivalInput;
    console.log(dataType);    

    getAllData().then(data => {      
      var testData = JSON.parse(data.value);           
      var resultArray = functions.resultArray(dataType, festivalInput, testData)

      if(resultArray!=null){
        setState({
          ...state,
          ["data"]: resultArray
        })
        setState({
          ...state,
          ["description"]: ""
        })
        setnewData(resultArray);
      }else{
        console.log("There is no data here");

        setState({
          ...state,
          ["description"]: "Entered an invalid input!"
        })
      }      
              
    })



  }

  function getData() {
    if (newData == null || newData == "") {
      //console.log(state.data)
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

  //setting the data in storage
  const setData = async (data) => {
    console.log(data);
    await Storage.set({
      key: "allData",
      value: JSON.stringify(data)
    })
  }
  //getting the data from storage
  async function getAllData() {
    return Storage.get({ key: "AllData" }).then((data) => { return data })
  }
  //Get all inputs
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      var res;
      var link;
      //check which platform is the user on
      if (isMobile) {
        console.log("im on mobile")
        link = state.mobile
      } else {
        console.log("im on web")
        link = state.web
      }
      console.log(link)
      axios.get(link + "advance/data")
        .then(res => {
          var data = res.data

          if (res.data.length == 0) {
            console.log("There is no data here")
          } else {
            console.log(data);
            setData(data);
            setallData(data);

            setState({
              ...state,
              ["allData"]: data //data.exportTime()
            })

            //caching


          }
        })

      setState({
        ...state,
        ["data"]: null //data.exportTime()
      })
      setTimeout('', 3000)
      //console.log(console.log(data.exportTime()))
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
          <h1>{state.description}</h1>
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