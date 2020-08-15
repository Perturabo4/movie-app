import React from 'react';
import './App-intro.css';


const AppIntro = ({searchCount, cashedSearchValue}) => {

    const text = searchCount > 0
            ? `Результаты поиска "${cashedSearchValue}" : ` 
            : "Несколько популярных фильмов";

    return (
        <p className="App-intro">
            {text}
        </p>
    )
}

export default AppIntro;