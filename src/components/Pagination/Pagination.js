import React from 'react'
import './Pagination.css'

const Pagination = ({responseTotalresult}) => {
    const count = Math.ceil(responseTotalresult / 10);
    const pages = new Array(count);

    return (
        <div>
            {`Total pages count: ${pages}`}
        </div>
    )
}

export default Pagination;