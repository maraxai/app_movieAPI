/** MovieCard is ready for JSDoc documentation */
// declaration of variables for modules
import React from 'react';
//import PropTypes from 'prop-types';
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

  // lifecycle prevents error messages that could be caused by delay of state update due to synchronous behavior
  componentDidUpdate(prevProps) {
    if (this.props.favorite !== prevProps.favorite) {
      this.setState({
        fav: this.props.favorite
      });
    }
  }

  // toggle manages adding and removing of the selected movie from list
  toggleClass() {
    toggleClick = true;
    if (!this.state.fav) {
      this.addToFavMovieList(this.props.movie._id);
    } else {
      this.removeFromFavMovieList();
    }
  }

  // adds the selected movie._id to user.favoritemovies by axios PUT request
  addToFavMovieList(id) {
    console.log(id)
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  axios
  .put(`https://md-movie-app.herokuapp.com/users/${user}/favoritemovies/${id}`,
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
//    console.log('fav: ' + this.state.fav)
  })
  .catch(e => {
    console.log(e);
  });
}

  // removes the selected movie._id form user.favoritemovies by axios DELETE request
removeFromFavMovieList() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const id = this.props.movie._id
    axios
        .delete(`https://md-movie-app.herokuapp.com/users/${user}/favoritemovies/${id}`,
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
  //        console.log('fav: ' + this.state.fav)
        })
        .catch(e => {
          console.log(e);
        });
  }

  render() {

    // destructuring - assign 'movie' and 'onClick' as this component's object
    const { movie } = this.props;
    // returns the movie's data
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
          <Link to={`/mymovies/${movie._id}`}>
            <Button variant="outline-secondary" size="sm">read more...</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

/*
MovieCard.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
*/
