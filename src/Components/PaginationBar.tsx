import React from 'react'
import ReactPaginate from "react-paginate";

interface PaginationBarProps {
    maxPage: number,
    changeCurrentPage: (selectedItem: { selected: number; }) => void,
    
}

export const PaginationBar: React.FC<PaginationBarProps> = ({maxPage, changeCurrentPage}) => {
        return (
                <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={maxPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={changeCurrentPage}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        );
}