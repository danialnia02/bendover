import React from 'react';
import './DataViewer.css';
  import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap"

const Posts = ({ posts, loading, noOfPosts }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  console.log(noOfPosts)
  if (noOfPosts == 0) {
    return (
      <div>The result is empty.</div>
    )
  } else {
    return (      
        <table class='list-group' id='three'>
          <ReactBootStrap.Table striped bordered hover>
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
  }
};


export default Posts;