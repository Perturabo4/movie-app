import React, {useState} from 'react';
import './Search.css';


const styles = {
    input: {
        padding: '0 4px'
    }
}
const Search = (props) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue("");
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input 
                type="text"
                value={searchValue}
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