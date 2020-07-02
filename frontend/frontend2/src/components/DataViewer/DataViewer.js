import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
import ReactPaginate from 'react-paginate';
import Navbars from "../Navbar"
import axios from 'axios';
import './DataViewer.css'
import { Navbar, Nav, Form, Button, Table } from "react-bootstrap"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DataViewer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage] = useState(10);

  //input get
  const [state, setState] = React.useState({
    input1: "",
    input2: "",    
    pagination: 10,
    attribute1: "",
    attribute2: "",
    link: 'http://10.0.2.2/basic/result',
    // link2: 'http://192.168.1.204:8011/basic/result',
    link2: 'http://localhost:8011/basic/result',
    searchLink: 'http://10.0.2.2:8011/search',
    // searchLink2: 'http://192.168.1.204:8011/search'
    searchLink2: 'http://localhost:8011/search',
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
      pagination: state.pagination,
      attribute1: state.attribute1,
      input1: state.input1,
      attribute2: state.attribute2,
      input2: state.input2,
    }
    // console.log(info)
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
    axios.post(state.searchLink2, info)
      .then(res => {
        var data = res.data
        if (res.data.length == 0) {
          console.log("There is no data here")
          setState({
            ...state,
            ["arrayLength"]: 0
          })
        }
        setPosts(res.data)
      })
    // }
  }

  //Get all inputs
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      // try{
      //    res = await axios.get(state.link);
      // }catch(err){
      console.log(state.link2)
      var res = await axios.get(state.link2);
      console.log(res.data)

      // }      
      // const res2 = await axios.get('http://10.0.2.2/basic/result');   
      if (res.data.length == 0) {
        setState({
          ...state,
          ["arrayLength"]: 0
        })
      }
      setPosts(res.data);
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
    <div id='body'>
      <div class='container'>
        <h1>Data Viewer</h1>
        {/* <h1 class='text-primary table-title mb-3'>Data Viewer</h1> */}

        <Nav activeKey="/DataViewer">
          <Navbars></Navbars>
        </Nav>
        <Form.Control as="select" name="pagination" value={state.pagination} placeholder="test" onChange={handleChange} >
          <option value="10">Click here to change the number of posts per page</option>
          <option value="5">5</option>
          <option value="15">15</option>
          <option value="25">25</option>
        </Form.Control>

        {/* Navbar header Code */}
        <Navbar bg="light" expand="lg ">
          <Navbar.Brand href="#home">Music-Db Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            {/* <Navbar className=""> */}
            <Form className="row containerforfilterbox d-flex justify-content-center"> {/*apparently the naming schemes for here and result viewer affect each other if u didnt know, so dun make them the same name can alr */}
              {/* <Form.Row> */}
              <Form.Row>
                <div class="filtersection"> {/*here as well^ */}
                <form onSubmit={handleSubmit}>
                  <Form.Group as={Col} controlId="categories">
                    <Form.Row> {/*row for categories*/}
                      <Form.Group as={Col} controlId="category1">
                        <Form.Control as="select" value="Choose..." name="attribute1" size="5" value={state.attribute1} onChange={handleChange}>
                          <option></option>
                          <option value="performanceId">performanceId</option>
                          <option value="festivalId">festivalId</option>
                          <option value="startTime">startTime</option>
                          <option value="endTime">endTime</option>
                          <option value="popularity">popularity</option>
                          <option value="dataInserted">dataInserted</option>
                        </Form.Control>
                      </Form.Group> {/* end group for category1 */}
                      <Form.Group as={Col} controlId="category2">
                        <Form.Control as="select" value="Choose..." name="attribute2" size="5" value={state.attribute2} onChange={handleChange}>
                          <option></option>
                          <option value="performanceId">performanceId</option>
                          <option value="festivalId">festivalId</option>
                          <option value="startTime">startTime</option>
                          <option value="endTime">endTime</option>
                          <option value="popularity">popularity</option>
                          <option value="dataInserted">dataInserted</option>
                        </Form.Control>
                      </Form.Group> {/* end group for category2 */}
                    </Form.Row> {/*end row for categories*/}

                    <Form.Row> {/*row for searchid*/}
                      <Form.Group as={Col} controlId="searchid1">
                        <input type="number" placeholder="Search" name="input1" size="5" value={state.input1} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group as={Col} controlId="searchid2">
                        <input type="number" placeholder="Search" name="input2" size="5" value={state.input2} onChange={handleChange} />
                      </Form.Group>
                    </Form.Row> {/*end row for searchid*/}
                  </Form.Group>
                </form>
                </div>
                <Form.Group as={Col} controlId="searchbutton">
                  <div className="d-block justify-content-center">
                    <Button variant="outline-success" type="submit">Search</Button>
                  </div>
                </Form.Group>
              </Form.Row>
            </Form>
            {/* </Navbar> */}
          </Navbar.Collapse>
        </Navbar>
        {/* <Header /> */}

        {/* output Code */}
        <div id="smallcontainer">
          <Posts posts={currentPosts} loading={loading} noOfPosts={posts.length} id="three" />
          {/* <div className="pgnt"> */}
          <Pagination
            currentPage={currentPage}
            postsPerPage={state.pagination}
            totalPosts={posts.length}
            paginate={paginate}
          />
          {/* </div> */}
        </div>
      </div>
    </div >
  );



};

export default DataViewer;