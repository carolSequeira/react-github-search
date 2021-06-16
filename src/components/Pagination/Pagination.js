import React, { useState } from 'react';
import './Pagination.css';


function Pagination({ pages, page, maxPageNumberLimit, minPageNumberLimit, totalResults, goToNextPage, goToPreviousPage, onChangePage }) {
    console.log(totalResults, pages, page);


    const pageArr = [];
    for (let i = 1; i <= pages; i++) {
        pageArr.push(i);
    }

    const renderPageNumbers = pageArr.map((number) => {
        console.log('page', pages);
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={onChangePage}
                    className={page === number ? "active" : null}
                >
                    {number}
                </li>
            )
        } else {
            return null;
        }
    });

    let pageIncrementBtn = null;
    if (pageArr.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={goToNextPage}>&hellip;</li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={goToPreviousPage}>&hellip;</li>;
    }

    // const handleLoadMore = () => {
    //     setItemsPerPage(itemsPerPage + 5);
    // }

    // const getPaginationGroup = () => {
    //     if (totalResults > 0) {
    //         let start = Math.floor((page - 1) / 5) * 5;
    //         return new Array(5).fill().map((_, idx) => start + idx + 1);
    //     }
    //     return [' '];
    // };


    /* show the posts, 10 posts at a time */
    /*<div className="dataContainer">*/
    /*    {getPaginatedData().map((d, idx) => (*/
    /*        <RenderComponent key={idx} data={d} />*/
    /*    ))}*
    /*</div>*/

    /* show the pagiantion
it consists of next and previous buttons
along with page numbers, in our case, 5 page
numbers at a time
*/

    return (
        <>
            <ul className="pageNumbers">
                <li>
                    <button
                        onClick={goToPreviousPage}
                    >
                        Prev
                    </button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li>
                    <button
                        onClick={goToNextPage}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </>
    );
}

export default Pagination;