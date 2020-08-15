import React, {useEffect, useReducer} from 'react';
import Header from './Header';
import MoviesContainer from './Movies-container';
import Search from './Search/';
import AppIntro from './App-intro';
import Loader from './Loader/';
import Pages from './Pages';
import Footer from './Footer';
import {reducer, initialState, ContextApp} from './reducer/';
import './App.css';

const START_VALUE = 'man';
const MOVIE_API_URL = `http://www.omdbapi.com/?s=${START_VALUE}&page=1&apikey=44fdb66b`;


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

          dispatch({
            type: "SET_CASHED_VALUE",
            payload: START_VALUE
          });
      });
  }, []);

  const search = (searchValue, page) => {
    dispatch({
      type: "SEARCH_MOVIE_REQUEST",
    });

    dispatch({
      type: "SET_CASHED_VALUE",
      payload: searchValue
    });

    fetch(`http://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=44fdb66b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if(jsonResponse.Response === 'True') {
          dispatch({type: "INCREASE_SEARCH_COUNT"});
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


  const { movies, errorMessage, loading, searchCount, cashedSearchValue } = state;

  return (
    <ContextApp.Provider value={{state, dispatch}}>
      <div className="wrapper">
      <Header text="Поиск фильмов" />
        <div className="App">
            <Search search={search} />
              <AppIntro 
                searchCount={searchCount}
                cashedSearchValue={cashedSearchValue}
              />
              {
              loading && !errorMessage 
                ? <Loader />
                : errorMessage 
                    ? <div className="errorMessage">{errorMessage}</div>
                    : <MoviesContainer movies={movies}/>
              }
            </div>
          </div> 
          {!errorMessage && <Pages search={search} />}
          <Footer />
    </ContextApp.Provider>
  );
}

export default App;
