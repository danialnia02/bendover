import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataViewer from './pages/dataViewer'

class App extends React.Component {
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
      <div className="App">
        <DataViewer />

      </div>
    )
  }
}

export default App;
