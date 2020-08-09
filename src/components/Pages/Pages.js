import React, {useContext} from 'react';
import {ContextApp} from '../reducer/';
import {Pagination} from 'antd';
import 'antd/dist/antd.css';
import './Pages.css';

const Pages = ({search}) => {
    const styles = {div: {marginBottom: '20px'}}
    const {state, dispatch} = useContext(ContextApp);
    const {searchValue, page, totalResults} = state;
    const onChange = (pageNumber, pageCount) => {
        dispatch({type: "SET_PAGE", payload: pageNumber});
        dispatch({type: "SEARCH_MOVIE_REQUEST"});
        search(searchValue, pageNumber);
    }
    console.log(page);
    return (
        <div style={styles.div} className="pagination-container">
            <Pagination 
                showQuickJumper 
                defaultPageSize={10}
                defaultCurrent={page} 
                total={totalResults * 1} 
                onChange={onChange} 
            />
        </div>
    )
}

export default Pages;