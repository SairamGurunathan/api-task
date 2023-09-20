import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagenate = ({totalPage,handlePageClick}) => {
  return (
    <>
    <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          renderOnZeroPageCount={null}
        />
    </>
  )
}

export default Pagenate