/*
A Store is defined by it's reducer.
A reducer takes a previous state and an action and returns a new state.
*/

import { combineReducers } from 'redux';

//add additional actions UPDATE_PROFILE, DELETE_PROFILE, see end of file
import { SET_MOVIES, SET_FILTER, SET_SORT_COLUMN, SET_USERS, UPDATE_PROFILE, DELETE_PROFILE } from '../actions/actions';

// this reducer shows the movies
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
    return action.value;
    default:
    return state;
  }
}

// this reducer changes the visibility property of the state
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

// this reducer changes the sorting order of the movies
function sortColumn(state = 'title', action) {
  switch (action.type) {
    case SET_SORT_COLUMN:
      return action.value;
    default:
      return state;
  }
}

// 'combined reducer' groups all single reducers
const moviesApp = combineReducers({
  visibilityFilter,
  sortColumn,
  movies,
  users
});

export default moviesApp;
