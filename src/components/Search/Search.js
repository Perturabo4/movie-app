import React, {useContext} from 'react';
import {ContextApp} from '../reducer/';
import './Search.css';


const styles = {
    input: {
        padding: '0 4px'
    }
}
const Search = (props) => {
    const {state, dispatch} = useContext(ContextApp);

    const handleSearchInputChanges = (e) => {
        dispatch({type: "SET_SEARCH_VALUE", payload: e.target.value})
    }

    const resetPages = () => {
        dispatch({type: "SET_PAGE", payload: 1});
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        resetPages();
        props.search(state.searchValue);
    }

    return (
        <form className="search">
            <input 
                type="text"
                value={state.searchValue}
                placeholder={'Type name of movie'}
                onChange={handleSearchInputChanges}
                style={styles.input}
            />
            <input 
                type="submit"
                value="SEARCH"
                onClick={callSearchFunction}
            />
        </form>
    )
}

export default Search;