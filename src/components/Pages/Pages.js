import React, {useContext} from 'react';
import {ContextApp} from '../reducer/';
import {Pagination} from 'antd';

import 'antd/dist/antd.css';
import './Pages.css';

const Pages = ({search}) => {

    const {state, dispatch} = useContext(ContextApp);
    const {searchValue, page, totalResults} = state;
    const count = Math.ceil(totalResults * 1 / 10);
    const onChange = (pageNumber) => {
        dispatch({type: "SET_PAGE", payload: pageNumber});
        dispatch({type: "SEARCH_MOVIE_REQUEST"});
        search(searchValue, page);
    }
    
    return (
        <div>
            {`Page ${page} of ${count}`}
            <Pagination 
                showQuickJumper 
                defaultCurrent={page} 
                total={count} 
                onChange={onChange} 
            />
        </div>
    )
}

export default Pages;