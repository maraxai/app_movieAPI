const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesDB', {useNewUrlParser: true});

// body parser needed for POST request that use json files
app.use(bodyParser.json());

// morgan log of requests
app.use(morgan('common'));

// documentation of API placed in public/documentation.html file
app.use(express.static('public'));

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

  ///////////////
 // REQUESTS //
//////////////

// MOVIES //

// ?????routes to index.html on root level
//app.get('/', function(req, res) {
//  res.send(index.html);
//});

// return json with all movies (mongoose)
app.get('/movies', function(req, res) {
  Movies.find()
  .then(function(movies) {
  res.status(201).json(movies);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500),send('Error ' + err);
  });
});

// return json of a single movie selected by title (mongoose)
app.get('/movies/:title', function(req, res) {
  Movies.findOne({title: req.params.title})
  .then(function(movie) {
    res.json(movie);
  })
  .catch(function(movie) {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

// get movie's genre by title (mongoose)
app.get('/movies/:title/genre', function(req, res) {
  Movies.findOne({title: req.params.title})
  .then(function(movie) {
    res.json(movie.genre);
  })
  .catch(function(movie) {
    console.error(err);
    res.status(500).send('There is an error with your request. Please check the ' + req.params.title + '.');
  });
});

// get movie description by title (mongoose)
app.get('/movies/:title/description', function(req, res) {
  Movies.findOne({title: req.params.title})
  .then(function(movie) {
    res.json(movie.description);
  })
  .catch(function(movie) {
    console.error(err);
    res.status(500).send('There is an error with your request. Please check the ' + req.params.title + '.');
  });
});

// get data of director by name (mongoose)
app.get('/movies/directors/:name', function(req, res) {
  Movies.findOne({'director.name': req.params.name})
  .then(function(movie) {
    res.json(movie.director);
  })
  .catch(function(err) {
    res.status(500).send('There is an error with your request. Please check your entry ' + req.params.name + '.');
  });
});


// USERS //

//get all users (mongoose)
app.get('/users', function(req, res) {
  Users.find()
  .then(function(users) {
    res.status(201).json(users);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send('Error ' + err);
  });
});

// get a user's data by username (name, id, username, password, email, dob)
app.get('/users/:username', function(req, res) {
  Users.findOne({username: req.params.username})
  .then(function(user){
    res.json(user);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// get a user's data by id
app.get('/users/:id', function(req, res) {
  Users.findById({_id: req.params.id})
  .then(function(user){
    res.json(user);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// new user registration (mongoose)
app.post('/users', function(req, res) {
  Users.findOne({username: req.body.username})
  .then(function(user) {
    if(user) {
      return res.status(400).send('The username ' + req.body.username + ' already exists.');
    }
    else {
      Users
      .create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday,
        favoritemovies: req.body.favoritemovies
      })
      .then(function(user) {
        res.status(201).json(user)
      })
      .catch(function(error){
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// update user info (username, password, email, dob) by id (Mongoose)
app.put('/users/:username', function(req, res) {
  Users.update({username : req.params.username}, {$set:
  {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email,
    birthday : req.body.birthday
  }},
  {new : true}, //This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    }
    else {
      res.json(updatedUser)
    }
  })
});

// get a user's list of favorite movies by username (mongoose)
app.get('/users/:username/favoritemovies', function(req,res) {
  Users.findOne({username: req.params.username})
  .then(function(user) {
    res.json(user.favoritemovies);
  })
  .catch(function(err) {
    res.status(500).send('There is an error with your request. Please check your entry ' + req.params.username + '.')
  });
});

// add movie by id to a user's list of favorite movies (Mongoose)
app.put('/users/:username/favoritemovies/:id', function(req, res) {
  Users.findOneAndUpdate({username : req.params.username}, {
    $push: {favoritemovies : req.params.id}
  },
  {new : true}, // returns updated document
  function(err, updatedlist) {
    if (err) {
      console.error(err);
      res.status(500).send('Error' + err);
    }
    else {
      res.json(updatedlist)
    }
  });
});

// delete a user from the user list (Mongoose)
app.delete('/users/:username', function(req, res) {
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

// remove movie in list of favoriteMovies of a user selected by username (Mongoose)
app.delete('/users/:username/favoritemovies/:movieid', function(req,res) {
  Users.findOneAndDelete({username : req.params.username}, {
    $pull: {[favoritemovies.movieid] : req.params.movieid}
  },
  {new : true}, // returns updated document
  function(err, updatedMovieList) {
    if (err) {
      console.error(err);
      res.status(500).send('Error' + err);
    }
    else {
      res.json(updatedMovieList)
    }
  })
});

app.listen(3000, () => {
  console.log('This app is listening on port 3000.');
});
