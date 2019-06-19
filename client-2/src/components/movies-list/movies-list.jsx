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

  //

  if(visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(m => m.title.toLowerCase().includes(visibilityFilter));
    // these work as well:
    // moviesToShow = moviesToShow.filter(m => m.director.name.toLowerCase().includes(visibilityFilter));
    // moviesToShow = moviesToShow.filter(m => m.genre.name.toLowerCase().includes(visibilityFilter));

    // this should be the setup for the Form.Control with the <option> tags; a 'switch' would also work
    // but I did not get it running!
    /*
    var id;
    if (id == 'cat-title') {
      moviesToShow = moviesToShow.filter(m => m.title.toLowerCase().includes(visibilityFilter));
    }
    if (id == 'cat-director') {
      moviesToShow = moviesToShow.filter(m => m.director.name.toLowerCase().includes(visibilityFilter));
    }
    else if (id == 'cat-genre') {
      moviesToShow = moviesToShow.filter(m => m.genre.name.toLowerCase().includes(visibilityFilter));
    }
    */
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
