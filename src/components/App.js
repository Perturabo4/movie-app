import React, {useEffect, useReducer} from 'react';
import Header from './Header';
import MoviesContainer from './Movies-container';
import Search from './Search/';
import Loader from './Loader/';
import Pages from './Pages';
import Footer from './Footer';
import {reducer, initialState, ContextApp} from './reducer/';
import './App.css';


const MOVIE_API_URL = 'http://www.omdbapi.com/?s=man&page=1&apikey=44fdb66b';


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
          dispatch({
            type: "SEARCH_MOVIE_SUCCESS",
            payload: {
              search: jsonResponse.Search,
              totalResults: jsonResponse.totalResults
            }
          });
      });
  }, []);

  const search = (searchValue, page) => {
    dispatch({
      type: "SEARCH_MOVIE_REQUEST"
    })

    fetch(`http://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=44fdb66b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if(jsonResponse.Response === 'True') {
          dispatch({
              type: "SEARCH_MOVIE_SUCCESS",
              payload: {
                search: jsonResponse.Search,
                totalResults: jsonResponse.totalResults
              }
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIE_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;


  return (
    <ContextApp.Provider value={{state, dispatch}}>
      <div className="App">
        <Header text="Поиск фильмов" />
        <Search search={search} />
            <p className="App-intro">
              Несколько популярных фильмов
            </p>
          {
          loading && !errorMessage 
            ? <Loader />
            : errorMessage 
                ? <div className="errorMessage">{errorMessage}</div>
                : <MoviesContainer movies={movies}/>
          }
        </div> 
        <Pages search={search} />
        <Footer />
    </ContextApp.Provider>
  );
}

export default App;
