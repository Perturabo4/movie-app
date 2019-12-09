const initialState = {
    loading: true,
    movies: [],
    errorMessage: null,
    page: 1,
    totalResults: 0
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
      default: 
          return state;
    }
  
  }

  export {reducer, initialState};