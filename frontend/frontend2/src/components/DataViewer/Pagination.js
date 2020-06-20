import React from 'react';
import './DataViewer.css'
const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const maxPage = Math.ceil(totalPosts / postsPerPage)
  for (let i = 1; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  //limit the user from reaching the earliest and last page
  function test(number) {
    var currentPaging = (currentPage - number)
    // console.log(currentPaging)
    console.log(maxPage)
    if (currentPaging < 1) {
      currentPaging++
      console.log(currentPaging)
      alert("You have reached the first page!")
    } else if (currentPaging > (maxPage)) {
      currentPaging--
      console.log(currentPaging)
      alert("You have reached the max page!")
    } else {
      paginate(currentPage - number)
    }
  }
  // console.log(pageNumbers);
  return (
    <div class="row">
      <button>{<a onClick={() => test(1)} class='page-link'>&lt;&lt;</a>}</button>


      {pageNumbers.map(number => (<a onClick={() => paginate(number)} class='page-link'>{number}</a>))}

      <button>{<a onClick={() => test(-1)} class='page-link'>>></a>}</button>
    </div>
  );
};

export default Pagination;