import React, { useState, useEffect } from 'react';
import Posts from './Posts';
import Pagination from './Pagination';
//import ReactPaginate from 'react-paginate';
import Navbars from "../Navbar"
import axios from 'axios';
import './DataViewer.css'
import { Navbar, Nav, Form, Button } from "react-bootstrap"
//import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import functions from './functions';

//
import { isMobile } from "react-device-detect";
import { Plugins } from '@capacitor/core'
// import { url } from 'inspector';
//import Inspector from 'react-inspector'
//import { isCompositeComponent } from 'react-dom/test-utils';

const { Storage } = Plugins;
//

const DataViewer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, refreshpage] = useState([])
  var [postsPerPage] = useState(10);
  var globalLink = "testing";

  //input get
  const [state, setState] = React.useState({
    input1: "",
    input2: "",
    pagination: 10,
    attribute1: "",
    attribute2: "",
    link: 'http://10.0.2.2/basic/data',
    link2: 'http://localhost:8011/basic/data',
    searchLink: 'http://10.0.2.2/search',
    searchLink2: 'http://localhost:8011/search',

    //cache data
    cacheData: [],
    testData: []
  })


  //function get set data
  const setData = async (url, data) => {
    console.log(data)
    await Storage.set({      
      key: "AllData",
      value: JSON.stringify(data)
    })
  };
  //
  //getting the data from storage
  async function getAllData() {
    // const  data  = await 
    // console.log(data)
    return Storage.get({ key: "AllData" }).then((data) => { return data })
    
  }

  const keys = async () => {
    const { keys } = await Storage.keys()
    console.log(keys)
    return keys
    // return data;
  }


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
  const searchSubmit = (event) => {
    event.preventDefault()
    var info = {
      pagination: state.pagination,
      attribute1: state.attribute1,
      input1: state.input1,
      attribute2: state.attribute2,
      input2: state.input2,
    }
    //console.log(info)
    var link;
    if (isMobile) {
      link = state.searchLink;
    } else {
      link = state.searchLink2;
    }

    //getting the cached data        
    getAllData().then(data => {
      var resultArray = functions.search(data.value, info);
      setState({
        ...state,
        ["arrayLength"]: 0
      })

      setState({
        ...state,
        ["testData"]: resultArray
      })
      setPosts(resultArray);

    });
  }

  

  //Get all inputs
  useEffect(() => {    
    //if connection is good, always get from database 1st
    try {
      const fetchPosts = async () => {
        console.log("not using cache data")
        setLoading(true);
        var res;
        var link;
        if (isMobile) {
          res = await axios.get(state.link);
          link = state.link;
          globalLink = state.link;
        } else {
          res = await axios.get(state.link2);
          link = state.link2;
          globalLink = state.link2;
        }        
        console.log(res.data);
        if (res.data.length == 0) {
          setState({
            ...state,
            ["arrayLength"]: 0
          })
        }
        //caching    
        console.log(link)
        setData(link, res.data)
        console.log("here")
        //
        setPosts(res.data);
        setLoading(false);
      };
      fetchPosts();
    } catch (error) {
      //else use the cache data from the previous connection        
      console.log("using cache data");
      // async function getAllData() {
      //   const data = await Storage.get({ key: "testing" })
      //   return Promise.resolve(data);
      // }

      getAllData().then(data => {        
        var cacheData = data.value;
        if (cacheData.length == 0) {
          setState({
            ...state,
            ["arrayLength"]: 0
          })
          setPosts()
        }
        setLoading(true);
        setPosts(cacheData);
        setLoading(false);
      });      
    }    
    // }
  }, []);

  function renderMobile() {
    if (isMobile) {
      return <div> This content is available on mobile</div>
    } else {
      return <div>This content is unavailable on mobile</div>
    }
  }

  // Get current posts
  var indexOfLastPost = currentPage * state.pagination;
  var indexOfFirstPost = indexOfLastPost - state.pagination;
  var currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  function refreshPage() {
    window.location.reload(false);
  }

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //////////////////////

  return (
    <div id='body'>
      <div class='container'>

        <h1>{renderMobile()}</h1>
        <h1>{JSON.stringify(state.testData)}</h1>

        <h1>Data Viewer</h1>
        {/* <h1 class='text-primary table-title mb-3'>Data Viewer</h1> */}

        <Nav activeKey="/DataViewer">
          <Navbars
            allData={posts}
            cacheData={state.cacheData}
          ></Navbars>
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
          <button onClick={refreshPage}>Click to reload!</button>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            {/* <Navbar className=""> */}
            <Form className="row containerforfilterbox d-flex justify-content-center"> {/*apparently the naming schemes for here and result viewer affect each other if u didnt know, so dun make them the same name can alr */}
              {/* <Form.Row> */}
              <form onSubmit={searchSubmit}>
                <Form.Row>
                  <div className="filtersection"> {/*here as well^ */}

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
                  </div>
                  <Form.Group as={Col} controlId="searchbutton">
                    <div className="d-block justify-content-center">
                      <Button variant="outline-success" type="submit">Search</Button>
                    </div>
                  </Form.Group>
                </Form.Row>
              </form>
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