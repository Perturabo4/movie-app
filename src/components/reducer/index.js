import {createContext} from 'react';

const ContextApp = createContext();

const initialState = {
    loading: true,
    movies: [],
    errorMessage: null,
    page: 1,
    totalResults: 0,
    searchValue: 'man',
    year: null
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
            movies: action.payload.search,
            totalResults: action.payload.totalResults
          };
      case "SEARCH_MOVIE_FAILURE":
          return {
            ...state,
            loading: false,
            errorMessage: action.error
          };
      case "SET_PAGE":
        return {
          ...state,
          page: action.payload
        }
      case "SET_SEARCH_VALUE":
        return {
          ...state,
          searchValue: action.payload
        }
      case "SET_YEAR_VALUE":
        return {
          ...state,
          year: action.payload
        }
      default: 
          return state;
    }
  
  }

  export {reducer, initialState, ContextApp};