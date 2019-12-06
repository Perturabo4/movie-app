import React, { useReducer, useEffect } from 'react';
import Header from './Header';
import Movie from './Movie';
import Search from './Search/';
import Loader from './Loader/';
import './App.css';

const MOVIE_API_URL = 'http://www.omdbapi.com/?s=man&apikey=44fdb66b';

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
}

const reducer = (state, action) => {

  switch (action.type) {
    case "SEARCH_MOVIE_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIE_SUCCESS":
        return {
          ...state,
          loading: false,
          movies: action.payload
        };
    case "SEARCH_MOVIE_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
    default: 
        return state;
  }

}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
          dispatch({
            type: "SEARCH_MOVIE_SUCCESS",
            payload: jsonResponse.Search
          });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIE_REQUEST"
    })

    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=44fdb66b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if(jsonResponse.Response === 'True') {
          dispatch({
              type: "SEARCH_MOVIE_SUCCESS",
              payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIE_SUCCESS",
            error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

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
    </div>
  );
}

export default App;
