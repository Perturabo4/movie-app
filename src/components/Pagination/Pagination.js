import React from 'react'
import './Pagination.css'

const Pagination = ({page, totalResults}) => {
    const count = Math.ceil(totalResults * 1 / 10);
    // const pages = new Array(count).length;
    console.log(totalResults);
    return (
        <div>
            {`Total pages count: ${count}`}
        </div>
    )
}

export default Pagination;