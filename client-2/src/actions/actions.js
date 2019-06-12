/*
Actions define the type of change that will be performed on the data.
They can be called from anywhere within the application.
Data is packed into an Action object literal that contains the action type and
the new field of data. An action changes the state by changing the according property.
*/


// initializes the movies list
export const SET_MOVIES = 'SET_MOVIES';
// sets search filter based on value
export const SET_FILTER = 'SET_FILTERS';
// sets sort filter
export const SET_SORT_COLUMN = 'SET_SORT_COLUMN';
// log for testing
export const LOG_TEST = 'LOG_TEST';


/* additional actions, check if correctly
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
*/

//
export function setMovies(value) {
  return {type: SET_MOVIES, value};
}

//
export function setFilter(value) {
  return {type: SET_FILTER, value};
}

//
export function setSortColumn(value) {
  return {type: SET_SORT_COLUMN, value};
}

export function logTest(text) {
  return {type: LOG_TEST, text: 'test'};
}

/*
//
export function updateProfile(value) {
  return {type: UPDATE_PROFILE, value};
}

//
export function deletePROFILE(value) {
  return {type: DELETE_PROFILE, value};
}
*/
