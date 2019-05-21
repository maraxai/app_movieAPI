import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MainView } from '../main-view/main-view';

import { Link } from 'react-router-dom'

// make it pretty
import './profile-view.scss'

export class ProfileView extends React.Component {

  render() {

    return (
    <Card>
    <Card.Text>So far, the profile component is only set up</Card.Text>
    <Link to={`/`}>
      <Button variant="link">Back</Button>
    </Link>
    </Card>
  )
  }
}
