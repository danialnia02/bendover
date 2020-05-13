import React from 'react';
import './dataViewer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap"
import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DataViewer extends React.Component {
  // Select * from database put into code
  //-------------------------------------
  state = {
    products: [],
    entries: "",
    handleChange = this.handleChange.bind(this)

  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = _ => {
    fetch('http://localhost:8011/advance/results2')
      .then(response => response.json())
      // .then(({ recordset }) => {
      //   console.log(recordset)
      // })
      .then(response => this.setState({ products: response.recordset }))
      .catch(err => console.error(err))
  }
  renderProduct = ({ performanceId, festivalId, startTime, endTime, popularity, dataInserted }, index) => {
    return (
      <tr key={index}>
        <td>{performanceId}</td>
        <td>{festivalId}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>{popularity}</td>
        {/* <td>{dataInserted}</td> */}
      </tr>
    )
  }

  //-------------------------------------

  render() {
    const { products } = this.state;
    //
    return (
      <div className="contain">
        <div className="cover">
          <Col >
            <th>MusicDb</th>
          </Col>
          <div className="container">
            {/* Header ------------------------------------------ */}
            <Row>

              <Col xs={2}>
                <div className="entries_length"><label>Show
                <select id="entry_length" aria-controls="example"
                    className="custom-select custom-select-sm form-control-sm">
                    <option value="5">5</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                  </select> entries
              </label></div>
              </Col>
              <Col sm={1}>
                <div id="Search">Search</div>
              </Col>
              <Col sm={3}>
                <div className="entries_length" id="size">
                  <select name="attribute" aria-controls="example" className="form-control" id="attribute">
                    <option value="performanceId">performanceId</option>
                    <option value="festivalId">festivalId</option>
                    <option value="startTime">startTime</option>
                    <option value="endTime">endTime</option>
                    <option value="popularity">popularity</option>
                    <option value="dataInserted">dataInserted</option>
                  </select></div>
              </Col>
              <Col sm={1}>

                <div className="entries_length" id="size">
                  <select name="operation" aria-controls="example" className="form-control" id="operation">
                    <option value="null">all</option>
                    <option value="=">==</option>
                    <option value="=">&gt;=</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value="<=">&lt;=</option>
                  </select></div>

              </Col>
              <Col sm={3}>
                <div className="entries_length" id="size">
                  <input type="text" placeholder="Search" id="navBaruserInput"></input>
                </div>


              </Col>
              <Col sm={1}>
                <div id="size">
                  <button type="button" id="searchButton">Filter</button>
                </div>
              </Col>
            </Row>
            {/* ------------------------------------------ */}


            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>performanceId</th>
                  <th>festivalId</th>
                  <th>startTime</th>
                  <th>endTime</th>
                  <th>popularity</th>
                </tr>
              </thead>
              <tbody>
                {products.map(this.renderProduct)}
              </tbody>
            </ReactBootStrap.Table>
          </div>
        </div>

      </div>
    )
  }
}

export default DataViewer;
