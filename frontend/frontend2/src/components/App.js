import React, { useState, useEffect, useCallback } from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
import ReactPaginate from 'react-paginate';
// import Header from './Header2';
import axios from 'axios';
import './App.css'
import { Navbar, Nav, Form, Button, Table } from "react-bootstrap"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage] = useState(10);

  //input get
  const [state, setState] = React.useState({
    input: "",
    operation: "",
    pagination: 10,
    attribute: "",
  })



  function handleChange(evt) {
    indexOfLastPost = currentPage * state.pagination;
    indexOfFirstPost = indexOfLastPost - state.pagination;
    currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    })
  }

  // Get custom input
  const handleSubmit = (event) => {
    event.preventDefault()
    var info = {
      input: state.input,
      operation: state.operation,
      pagination: state.pagination,
      attribute: state.attribute
    }
    console.log(info)
    axios.post('http://localhost:8011/advance/result/individual', info)
      .then(res => {
        console.log(res.data)
        setPosts(res.data)
      })
  }

  //Get all inputs
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      const res = await axios.get('http://localhost:8011/advance/result');
      setPosts(res.data);
      console.log(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  var indexOfLastPost = currentPage * state.pagination;
  var indexOfFirstPost = indexOfLastPost - state.pagination;
  var currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //////////////////////



  return (
    <div class='container'>
      <h1>Data Viewer</h1>
      {/* <h1 class='text-primary table-title mb-3'>Data Viewer</h1> */}

      <Nav activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Data</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Result</Nav.Link>
        </Nav.Item>
        <Form.Control as="select" name="pagination" value={state.pagination} placeholder="test" onChange={handleChange} >
          <option value="10">Click here to change the number of posts per page</option>
          <option value="5">5</option>
          <option value="15">15</option>
          <option value="25">25</option>
        </Form.Control>
      </Nav>
      {/* Navbar header Code */}
      <Navbar bg="light" expand="lg "> 
        <Navbar.Brand href="#home">Music-Db</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-center">


          {/* <Form.Control as="select" value="Choose..." name="pagination" value={state.pagination} onChange={handleChange} >
                <option></option>
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="30">30</option>
          </Form.Control> */}

          {/* <Form.Label>Search</Form.Label> */}

          <Form className="row">
            <Form.Row>
              <form onSubmit={handleSubmit}>
                <Form.Row> {/*row for categories*/}
                  <Form.Group as={Col} controlId="category1">
                    <Form.Control as="select" value="Choose..." name="attribute" size="5" value={state.attribute} onChange={handleChange}>
                      <option></option>
                      <option value="performanceId">performanceId</option>
                      <option value="festivalId">festivalId</option>
                      <option value="startTime">startTime</option>
                      <option value="endTime">endTime</option>
                      <option value="popularity">popularity</option>
                      <option value="dataInserted">dataInserted</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="category2">
                    <Form.Control as="select" value="Choose..." name="attribute" size="5" value={state.attribute} onChange={handleChange}>
                      <option></option>
                      <option value="performanceId">performanceId</option>
                      <option value="festivalId">festivalId</option>
                      <option value="startTime">startTime</option>
                      <option value="endTime">endTime</option>
                      <option value="popularity">popularity</option>
                      <option value="dataInserted">dataInserted</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row> {/*end row for categories*/}
                <Form.Row> {/*row for searchid*/}

                  {/*searchbox*/}
                  <Form.Group as={Col} controlId="searchid1">
                    <input type="number" placeholder="Search" name="input" size="5" value={state.input} onChange={handleChange} />
                  </Form.Group>
                  {/*searchbox*/}
                  <Form.Group as={Col} controlId="searchid2">
                    <input type="number" placeholder="Search" name="input" size="5" value={state.input} onChange={handleChange} />
                  </Form.Group>
                </Form.Row> {/*end row for searchid*/}
              </form>
            </Form.Row>
            <div className="d-block ml-5 mt-4 justify-content-center">
                  <Button variant="outline-success" type="submit">Search</Button>
                </div>
          </Form>
        </Navbar.Collapse>
      </Navbar>


      {/* <Header /> */}

      {/* output Code */}
      <div id="smallcontainer">
        <Posts posts={currentPosts} loading={loading} id="three" />
        <div className="pgnt">
          <Pagination
            currentPage={currentPage}
            postsPerPage={state.pagination}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );



};

export default App;