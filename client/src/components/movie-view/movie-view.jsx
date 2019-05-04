import React from 'react';
import { MainView } from '../main-view/main-view';
import { MovieCard } from '../movie-card/movie-card';

// exports the stateful class component which in inherited from the React component
export class MovieView extends React.Component {
  // constructer function, super refers to the 'Super' object of the React component
  // 'this' refers to the function's object, which is internally mutable
  constructor(props) {
    super(props);
    this.state = {view: MovieView}
    this.ReturnToMainView = this.ReturnToMainView.bind(this);
    };

  ReturnToMainView () {
    this.setState({view: MainView});
   }

    // render function displays the props
  render() {
    const { movie } = this.props;

    if (!movie) {
      return null;
    }

    if (this.state.view == MainView) {
      return (
        <div className="movie-view">
          <MainView />
        </div>
      )
    } else {
      <MovieView />
    }

    return (
    <div className="movie-view">
      <div className="movie-title">
        <div className="label">Title</div>
        <div className="value">{movie.title}</div>
      </div>
      <div className="movie-description">
        <div className="label">Description</div>
        <div className="value">{movie.description}</div>
      </div>
      <img className="movie-poster" src={movie.imagePath} />
      <div className="movie-genre">
        <div className="label">Genre</div>
        <div className="value">{movie.genre.name}</div>
      </div>
      <div className="movie-director">
        <div className="label">Director</div>
        <div className="value">{movie.director.name}</div>
      </div>
      <button onClick={this.ReturnToMainView}>Back to Main View</button>
    </div>
    );
  }
}
