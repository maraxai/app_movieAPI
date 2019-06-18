import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from '../../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn, users } = state;

  let moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if(visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(m => m.title.includes(visibilityFilter));
  }

  return { movies: moviesToShow, users: users };
};

function MoviesList(props) {
  const { movies, users } = props;
  const favMovies = users.favoritemovies || [];

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <VisibilityFilterInput />
    {movies.map(m => <MovieCard
      key={m._id}
      movie={m}
      addToFavMovieList={props.addToFavMovieList}
      removeFromFavMovieList={props.removeFromFavMovieList}
      favorite={favMovies.indexOf(m._id) > -1}/>)}
  </div>;
}

export default connect(mapStateToProps)(MoviesList);
