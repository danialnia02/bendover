import React from 'react';
import './DataViewer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap"

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  /* here */
  return (
    <table class='list-group' id='three' >

      <ReactBootStrap.Table striped bordered hover containerStyle={{ overflowX: "scroll", width: "200%" }}>
        <tr>
          <th class="list-header">performanceId</th>
          <th class="list-header">festivalId</th>
          <th class="list-header">startTime</th>
          <th class="list-header">endTime</th>
          <th class="list-header">popularity</th>

        </tr>

        {posts.map(post => (

          <tr key={post.id}>


            <td >{post.performanceId}</td>
            <td >{post.festivalId}</td>
            <td >{post.startTime}</td>
            <td >{post.endTime}</td>
            <td >{post.popularity}</td>



          </tr>

        ))}
      </ReactBootStrap.Table>
    </table>
  );

};
/* here */
export default Posts;