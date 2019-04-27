import React from 'react';
// export state-less class component
export class MovieCard extends React.Component {
  render() {

    // destructuring - assign 'movie' and 'onClick' as this components object
    const { movie, onClick } = this.props;
    // returns the movie title
    return (
      <div onClick={() => onClick(movie)} className='movie-card'>{movie.title}</div>
    );
  }
}
