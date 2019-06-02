import React from 'react';
import Button from 'react-bootstrap/Button';

export class FavMovieButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAdd : true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      toggleAdd : !prevState.toggleAdd
    }));
  }

  render () {
    return (
      <Button onClick={this.handleClick} variant="outline-secondary" size="sm">{this.state.toggleAdd
        ? 'Add the movie'
        : 'Remove the movie'}
      </Button>
    );
  }
}

export default Button
