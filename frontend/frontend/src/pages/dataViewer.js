import React from 'react';
import './dataViewer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap"

class DataViewer extends React.Component {
  // Select * from database put into code
  //-------------------------------------
  state = {
    products: []
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
        <div>
          <div className="container" id="container">
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
