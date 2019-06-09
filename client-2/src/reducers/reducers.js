/*
A Store is defined by it's reducer.
A reducer takes a previous state and an action and returns a new state.
*/

import { combineReducers } from 'redux';

//add additional actions UPDATE_PROFILE, DELETE_PROFILE, see end of file
import { SET_MOVIES, SET_FILTER, SET_SORT_COLUMN { /* ,UPDATE_PROFILE, DELETE_PROFILE */ } } from '../actions/actions';

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
function sortColumn(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

// 'combined reducer' groups all that sum
const moviesApp = combinedReducers({
  visibilityFilter,
  sortColumn,
  movies
});

/* additional reducers
// this reducer changes the profile property
function changeProfile(state = {}, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return action.value;
    default:
      return state;
  }
}

// this reducer removes a profile
function removeProfile(state = [], action) {
  switch (action.type) {
    case DELETE_PROFILE:
      return action.value;
    default:
      return state;
  }
}

*/

export default moviesApp;
