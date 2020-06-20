import React, { useState, useEffect, useCallback } from 'react';
// import Header from './Header2';
import axios from 'axios';
import './DataViewer.css'
import { Navbar, Nav, Form, Button, Table } from "react-bootstrap"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { isCompositeComponent } from 'react-dom/test-utils';

const App = () => {

  const [state, setState] = React.useState({
    requestUrl: '',
    input1: "",
  })

  function handleChange(evt) {
    const value = evt.target.value;    
    setState({
      ...state,
      [evt.target.name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var info = {
      input1: state.input1
    }

    fetch(state.requestUrl)
      .then((response) => response.json())
      .then((data) => changeInputbox1(data))
  }

  function changeInputbox1(data) {
    var data2 = JSON.stringify(data)
    setState({
      ...state,
      ["input1"]: data2
    })
    console.log(state.input1)
  }

  function onGetPress(requestUrl) {
    //send the http request to the given url    

  }

  const { input } = state.requestUrl
  return (
    <div class='container'>
      <p> helo</p>
      <form onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="searchid1">
          <input type="text" placeholder="Search" name="requestUrl" value={state.requestUrl} onChange={handleChange} />
        </Form.Group>
        <div className="d-block justify-content-center">
          <Button variant="outline-success" type="submit" >Search</Button>
        </div>
        <input type="text" placeholder="Search" name="input1" value={state.input1} onChange={handleChange} />
      </form>

    </div>
  );



};

export default App;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
