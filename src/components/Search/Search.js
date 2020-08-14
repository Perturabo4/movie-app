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
            <label>
                Введите слово (только латинские символы)
                <input 
                        type="text"
                        value={state.searchValue}
                        placeholder={'Введите слово для поиска фильмов'}
                        onChange={handleSearchInputChanges}
                        style={styles.input}
                    />
            </label>
            <input 
                type="submit"
                value="Поиск"
                onClick={callSearchFunction}
            />
        </form>
    )
}

export default Search;