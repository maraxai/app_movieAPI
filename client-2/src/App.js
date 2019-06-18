import React, { Component } from 'react';

// create 'Store' in App, the top React file that will pass change to the other views and components
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// 'combined-reducers' with all available reducers
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

import './App.css';

const store = createStore(moviesApp);


class App extends Component {
  render() {
    console.log(store.getState());
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

export default App;
