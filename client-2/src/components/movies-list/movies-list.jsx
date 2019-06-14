import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from '../../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if(visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(m => m.title.includes(visibilityFilter));
  }

  return { movies: moviesToShow };
};

function MoviesList(props) {
  const { movies, addToFavMovieList, removeFromFavMovieList, userdata } = props;
  const favorite = userdata.favoritemovies || [];

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <VisibilityFilterInput />
    {movies.map(m => <MovieCard
      key={m._id}
      movie={m}
      addToFavMovieList={addToFavMovieList}
      removeFromFavMovieList={removeFromFavMovieList}
      favorite={favorite.indexOf(m._id) > -1}/>)}
  </div>;
}

export default connect(mapStateToProps)(MoviesList);
