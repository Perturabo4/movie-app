import React from 'react';
import './App-intro.css';


const AppIntro = ({searchCount}) => {

    const text = searchCount > 0
            ? "Результаты поиска: " 
            : "Несколько популярных фильмов";

    return (
        <p className="App-intro">
            {text}
        </p>
    )
}

export default AppIntro;