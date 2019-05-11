//import modules and scss file
import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

// reminder that we need to bundle './index.scss'
import './index.scss';

// class component for app
export default class MyFlixApplication extends React.Component {

  render() {
    return (
      <div className='flix-view'><img src="../../img/MD_logo_abstract.png" />
      <p className="header">
        <span>[logo image]</span> <span>myFlix movie app</span> <span>login/logout</span> <span>registration</span>
      </p>
      <MainView />
      </div>
    );
  }
}

// find the root of your App
const container = document.getElementsByClassName('app-container')[0];

//render the app component in the DOM
// also: (<MyFlixApplication />, container)
ReactDOM.render(React.createElement(MyFlixApplication), container);
