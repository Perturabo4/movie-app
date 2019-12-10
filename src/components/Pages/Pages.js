import React from 'react';
import {Pagination} from 'antd';
import 'antd/dist/antd.css';
import './Pages.css';

const Pages = ({page, totalResults, onChange}) => {
    const count = Math.ceil(totalResults * 1 / 10);
    
    return (
        <div>
            {`Page ${page} of ${count}`}
            <Pagination showQuickJumper defaultCurrent={page} total={count} onChange={(pageNumber) => onChange(pageNumber)} />
        </div>
    )
}

export default Pages;