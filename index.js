const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const Models = require('./models.js');

/**
* @description Index.js manages all HTTP requests
* @class Router
* @requires express, a server framework for Node.js
* @requires morgan, an HTTP request logger middleware for node.js that generates request logs
* @requires body-parser, a parsing middleware for node.js that is needed to read HTTP POST data which is stored in req.body
* @requires uuid, which generates user ids
* @requires mongoose, an object data modeling libray (ODM) for MongoDB database
* @requires password, authentication middleware for Node.js
* @requires dotenv, manages the environmental variables stored in .env
* @requires cors, Express middleware that manages the CORS settings (Cross-Origin-Resource-Sharing)
* @requires path, part of Node.js core, manages file and folder paths
* @requires models.js, contains the data schema for this application
*/
/** @const Movies data schema for Movies object  */
const Movies = Models.Movie;
/** @const Users data schema for Users object  */
const Users = Models.User;

const app = express();

require('./passport');

/** make environmental variables available with .env */
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

/** body parser needed for POST request that use json files */
app.use(bodyParser.json());

/** CORS implementation (Cross-Origin Resource Sharing) */
app.use(cors());

/** authorization (note: body-parser has to come before auth!) */
var auth = require('./auth')(app);

/** morgan log of requests */
app.use(morgan('common'));

/** documentation of API placed in public/documentation.html file */
app.use(express.static(path.join(__dirname+'/client-2/build')));

/** error handling */
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

/** @require express-validator, validation of form entries */
const validator = require('express-validator');
app.use(validator());

/**
* REQUESTS
*/

/** MOVIES */

/**
* return json with all movies
*/
app.get('/movies', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function GET /movies
  * @example response: JSON file, data of all movies:
  *[
  *   {
  *     "genre": {
  *       "name": " ",
  *       "description": " "
  *     },
  *     "director": {
  *       "name": " ",
  *       "bio": "
  *       "birth": "1970",
  *       "death": ""
  *     },
  *     "_id": "",
  *     "movieId": "",
  *     "title": "",
  *     "description": ".",
  *     "imagePath": "",
  *     "featured":
  *   },
  *   {},...
  *]
  */

  Movies.find()
  .then(function(movies) {
  res.status(201).json(movies);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).send('Error ' + err);
  });
});

/**
* return json of a single movie selected by title
*/
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), function(req, res) {
/**
* @function GET /movies/:title
* @param title {string} - movie title
* @example requests:
* @example response: JSON file with movie data:
*movie = [
*   {
*     "genre": {
*       "name": " ",
*       "description": " "
*     },
*     "director": {
*       "name": " ",
*       "bio": "
*       "birth": "1970",
*       "death": ""
*     },
*     "_id": "",
*     "movieId": "",
*     "title": "",
*     "description": ".",
*     "imagePath": "",
*     "featured":
*   }
*]
*/
  Movies.findOne({title: req.params.title})
  .then(function(movie) {
    res.json(movie);
  })
  .catch(function(movie) {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

/**
* get movie's genre by title
*/
app.get('/movies/:title/genre', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function GET /movies/:title/genre
  * @param title {string} title - movie title
  * @example request:
  * @example response JSON file, displaying genre of the selected movie:
  * {
  *   "name": " ",
  *   "description": " "
  * }
  */
  Movies.findOne({title: req.params.title})
  .then(function(movie) {
    res.json(movie.genre);
  })
  .catch(function(movie) {
    console.error(err);
    res.status(500).send('There is an error with your request. Please check the ' + req.params.title + '.');
  });
});

/**
* get movie description by title
*/
app.get('/movies/:title/description', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function GET /movies/:title/description
  * @param title {string} title - movie title
  * @example request:
  * @example response: JSON file, movie's description
  * [description of movie]
  */
  Movies.findOne({title: req.params.title})
  .then(function(movie) {
    res.json(movie.description);
  })
  .catch(function(movie) {
    console.error(err);
    res.status(500).send('There is an error with your request. Please check the ' + req.params.title + '.');
  });
});

/**
* get data of director by name
*/
app.get('/movies/directors/:name', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function GET /movies/directors/:name
  * @param title {string} name - movie director's name
  * @example request:
  * @example JSON file, director's data:
  * {
  *   "name": "",
  *   "bio": "",
  *   "birth": ,
  *   "death": ,
  * }
  */
  Movies.findOne({'director.name': req.params.name})
  .then(function(movie) {
    res.json(movie.director);
  })
  .catch(function(err) {
    res.status(500).send('There is an error with your request. Please check your entry ' + req.params.name + '.');
  });
});


/** USERS */

/**
* get all users' data
*/
app.get('/users', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function GET /users
  * @param title {string} name - movie director's name
  * @example request:
  * @example response: JSON file, displaying all users' data:
  *[
  *   {
  *     "username": "",
  *     "password": "",
  *     "email": "",
  *     "birthday": "",
  *     "favoritemovies": ["movie1", "movie2", ...]
  *   },
  *   {}, ...
  * ]
  */
  Users.find()
  .then(function(users) {
    res.status(201).json(users);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

/**
* get a user by username (name, id, username, password, email, dob)
*/
app.get('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function GET /users/:username
  * @param title {string} username - movie director's name
  * @example request:
  * @example response: JSON file, displaying selected user's data:
  *   {
  *     "username": "",
  *     "password": "",
  *     "email": "",
  *     "birthday": "",
  *     "favoritemovies": ["movie1", "movie2", ...]
  *   }
  */
  Users.findOne({username: req.params.username})
  .then(function(user){
    res.json(user);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

/**
* get a user's data by id
 */
app.get('/users/id/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function GET /users/id/:id
  * @param title {number} id - user's id
  * @example request:
  * @example response: JSON file, displaying selected user's data:
  *   {
  *     "username": "",
  *     "password": "",
  *     "email": "",
  *     "birthday": "",
  *     "favoritemovies": ["movie1", "movie2", ...]
  *   }
  */
  Users.findById({_id: req.params.id})
  .then(function(user){
    res.json(user);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

/**
* register new user
*/
app.post('/users', function(req, res) {
  /**
  * @function POST /users
  * @example request body format JSON file:
  * {
  *   "username": "",
  *   "password": "",
  *   "email": "",
  *   "birthday": "",
  * }
  */
  /** validation for this POST request */
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('username', 'Username can only contain alphanumeric characters.').isAlphanumeric();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email does not appear to be valid').isEmail();

  /** check the validation object for errors */
  var errors = req.validationErrors();

  if(errors) {
    return res.status(422).json({errors: errors});
  }

  var hashedPassword = Users.hashPassword(req.body.password);
  /**
  * check if username already exists
  * @ function findOne
  *
  */
  Users.findOne({username: req.body.username})
  .then(function(user) {
    if(user) {
      return res.status(400).send('The username ' + req.body.username + ' already exists.');
    }
    else {
      Users
      .create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        birthday: req.body.birthday,
        favoritemovies: req.body.favoritemovies
      })
      .then(function(user) {
        res.status(201).json(user);
      })
      .catch(function(error){
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

/**
* update user info (username, password, email, dob) by id (Mongoose)
*/
app.put('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function PUT /users/:username
  * @param username {string} username - username
  * @example request body format JSON file:
  * {
  *   "username": "",
  *   "password": "",
  *   "email": "",
  *   "birthday": "",
  * }
  */
  /** validation for this PUT request */
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('username', 'Username can contain only alphanumeric characters.').isAlphanumeric();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email does not appear to be valid').isEmail();

  /** check validation object for errors */
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({errors: errors});
  }

  var hashedPassword = Users.hashPassword(req.body.password);

  Users.update({username : req.params.username}, {$set:
  {
    username : req.body.username,
    password : hashedPassword,
    email : req.body.email,
    birthday : req.body.birthday
  }},
  /**This line makes sure that the updated document is returned */
  {new : true},
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    }
    else {
      res.json(updatedUser);
    }
  });
});

/**
* get a user's list of favorite movies by username
*/
app.get('/users/:username/favoritemovies', passport.authenticate('jwt', {session: false}), function(req,res) {
  /**
  * @function GET /users/:username/favoritemovies
  * @param username {string} username - username
  * @example response: JSON file with user's favorite movies:
  * ["5c8b7e727c01607703ab6bd5"]
  */
  Users.findOne({username: req.params.username})
  .then(function(user) {
    res.json(user.favoritemovies);
  })
  .catch(function(err) {
    res.status(500).send('There is an error with your request. Please check your entry ' + req.params.username + '.');
  });
});

/**
* add movie by id to a user's list of favorite movies
*/
app.put('/users/:username/favoritemovies/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function PUT /users/:username/favoritemovies/:id
  * @param username {string} username - username
  * @param id {string} id - user's id
  * @example JSON file:
  * {
  *   "favoritemovies": [],
  *   "_id": "",
  *   "username": "",
  *   "password": "",
  *   "email": "",
  *   "birthday": "",
  *   "__v": 0
  * }
  */
  Users.findOneAndUpdate({username : req.params.username}, {
    $push: {favoritemovies : req.params.id}
  },
  /** returns updated document */
  {new : true},
  function(err, updatedlist) {
    if (err) {
      console.error(err);
      res.status(500).send('Error' + err);
    }
    else {
      res.json(updatedlist);
    }
  });
});

/**
* delete a user from the user list
*/
app.delete('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
  /**
  * @function DELETE /users/:username
  * @param username {string} username - username
  * @example  response:
  * message:
  * The account with the username: [username] is deleted.'
  */
  Users.findOneAndDelete({username : req.params.username})
  .then(function(user) {
    if(!user) {
      res.status(400).send(req.params.username + ' was not found.');
    }
    else {
      res.status(200).send(req.params.username + ' was deleted.');
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

/**
* remove movie in list of favoriteMovies of a user selected by username
*/
app.delete('/users/:username/favoritemovies/:id', passport.authenticate('jwt', {session: false}), function(req,res) {
  /**
  * @function DELETE /users/:username/favoritemovies/:id
  * @param username {string} username - username
  * @param id {string} id - movie's id
  * @example  response:
  * message:
  * The account with the username: [username] is deleted.'
  */
  Users.update({username : req.params.username}, {
    $pull: {favoritemovies : req.params.id}
  },
  /** returns updated document */
  {new : true},
  function(err, updatedfavoritemovies) {
    if (err) {
      console.error(err);
      res.status(500).send('Error' + err);
    }
    else {
      res.json(updatedfavoritemovies);
    }
  });
});

/** as instructed by Dave Ceddia
* The "catchall" handler: for any request that doesn't
* match one above, send back React's index.html file.
*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client-2/build/index.html'));
});

/** routes to index.html on root level */
app.get('/', function(req, res) {
  res.send(index.html);
});

var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function() {
  console.log(`Listening on ${port}`);
});
