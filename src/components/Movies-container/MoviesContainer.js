import React from 'react';
import Movie from '../Movie';

const MoviesContainer = ({movies}) => {
   return ( <div className="movies">
                { movies.map((movie, index) => <Movie key={`${index}-${movie.Title}`} movie={movie} /> ) }
            </div>
        )
}

export default MoviesContainer;