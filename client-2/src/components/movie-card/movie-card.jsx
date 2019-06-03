// declaration of variables for modules
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import axios from 'axios';

// make it pretty
import './movie-card.scss'

// initialization of toggle state
let toggleClick = false;

// class component
export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: props.favorite
    };
    this.toggleClass = this.toggleClass.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.favorite !== prevProps.favorite) {
      this.setState({
        fav: this.props.favorite
      })
    }
  }

  toggleClass() {
    toggleClick = true;
    if (!this.state.fav) {
      this.addToFavMovieList(this.props.movie._id);
    } else {
      this.removeFromFavMovieList();
    }
  }

  addToFavMovieList(id) {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  axios
  .put(`https://stark-headland-48507.herokuapp.com/users/${user}/favoritemovies/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  .then(response => {
    console.log(response);
    this.setState({
      fav: true
    });
    this.props.addToFavMovieList(id);
  })
  .catch(e => {
    console.log(e);
  });
}


removeFromFavMovieList() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const id = this.props.movie._id
    axios
        .delete(`https://stark-headland-48507.herokuapp.com/users/${user}/favoritemovies/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then(response => {
          console.log(response);
          this.setState({
            fav: false
          });
          this.props.removeFromFavMovieList(id);

        })
        .catch(e => {
          console.log(e);
        });
  }

  render() {

    // destructuring - assign 'movie' and 'onClick' as this components object
    const { movie } = this.props;
    // returns the movie title
    return (
      <Card bg="light" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Img style={{ width: '10%' }} variant="top" src={movie.imagePath} />
          <Card.Title>{movie.title}
            <span
              onClick={() => this.toggleClass()}
              className={this.state.fav ? "favme active" : "favme"}
            >
            &#x2605;
            </span>
          </Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-secondary" size="sm">read more...</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
