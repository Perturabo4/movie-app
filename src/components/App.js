import React, {useEffect, useReducer} from 'react';
import Header from './Header';
import Movie from './Movie';
import Search from './Search/';
import Loader from './Loader/';
import Pages from './Pages';
import Footer from './Footer';
import {reducer, initialState} from './reducer/';
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

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIE_REQUEST"
    })

    fetch(`http://www.omdbapi.com/?s=${searchValue}&page=${state.page}&apikey=44fdb66b`)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
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

  const { movies, errorMessage, loading, page, totalResults } = state;

  return (
      <div className="App">
        <Header text="HOOKED" />
        <Search search={search} />
        <p className="App-intro">
          Sharing a few of our favorite movies
        </p>
        <div className="movies">
          {loading && !errorMessage 
            ? <Loader />
            : errorMessage 
                ? <div className="errorMessage">{errorMessage}</div>
                : movies.map((movie, index) => (
                  <Movie key={`${index}-${movie.Title}`} movie={movie} />
                ))}
        </div> 
        <Pages page={page} totalResults={totalResults} onChange={(n) => dispatch({type: "SET_PAGE", payload: n})} />
        <Footer />
      </div>
  );
}

export default App;
