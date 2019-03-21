const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      uuid = require('uuid'),
      mongoose = require('mongoose'),
      passport = require('passport');

const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const app = express();

require('./passport');

//mongoose.connect('mongodb://localhost:27017/moviesDB', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://AdminMike:test4thisDB@mdmovies-nhncn.mongodb.net/moviesDB?retryWrites=true', {useNewUrlParser: true});

var auth = require('./auth')(app);

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

// CORS implementation (Cross-Origin Resource Sharing)
const cors = require('cors');
app.use(cors());

// create a list of allowed domains
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1) {
      var message = 'The CORS policy for this application does not allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

//create list of allowed domains that are allowed to have access to your app
var allowedOrigins = ['http:localhost:3000'];

const validator = require('express-validator');
app.use(validator());

  ///////////////
 // REQUESTS //
//////////////

// MOVIES //

// ?????routes to index.html on root level
app.get('/', function(req, res) {
  res.send(index.html);
});

// return json with all movies (mongoose)
app.get('/movies', passport.authenticate('jwt', {session: false}), function(req, res) {
  Movies.find()
  .then(function(movies) {
  res.status(201).json(movies);
  }).catch(function(err) {
    console.log(err);
    res.status(500).send('Error ' + err);
  });
});

// return json of a single movie selected by title (mongoose)
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), function(req, res) {
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
app.get('/movies/:title/genre', passport.authenticate('jwt', {session: false}), function(req, res) {
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
app.get('/movies/:title/description', passport.authenticate('jwt', {session: false}), function(req, res) {
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
app.get('/movies/directors/:name', passport.authenticate('jwt', {session: false}), function(req, res) {
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
app.get('/users', passport.authenticate('jwt', {session: false}), function(req, res) {
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
app.get('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
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
app.get('/users/id/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
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
  // validation for this POST request
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('username', 'Username can only contain alphanumeric characters.').isAlphanumeric();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();

  if(errors) {
    return res.status(422).json({errors: errors});
  }

  var hashedPassword = Users.hashPassword(req.body.password);
  Users.findOne({username: req.body.username}) //check if username already exists
  .then(function(user) {
    if(user) {
      return res.status(400).send('The username ' + req.body.Username + ' already exists.');
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

// update user info (username, password, email, dob) by id (Mongoose)
app.put('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
  // validation for this PUT request
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('username', 'Username can contain only alphanumeric characters.').isAlphanumeric();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email does not appear to be valid').isEmail();

  // check validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({errors: errors});
  }

  Users.update({username : req.params.username}, {$set:
  {
    username : req.body.username,
    password : hashedPassword,
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
      res.json(updatedUser);
    }
  });
});

// get a user's list of favorite movies by username (mongoose)
app.get('/users/:username/favoritemovies', passport.authenticate('jwt', {session: false}), function(req,res) {
  Users.findOne({username: req.params.username})
  .then(function(user) {
    res.json(user.favoritemovies);
  })
  .catch(function(err) {
    res.status(500).send('There is an error with your request. Please check your entry ' + req.params.username + '.');
  });
});

// add movie by id to a user's list of favorite movies (Mongoose)

app.put('/users/:username/favoritemovies/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
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
      res.json(updatedlist);
    }
  });
});

// delete a user from the user list (Mongoose)
app.delete('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
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
app.delete('/users/:username/favoritemovies/:id', passport.authenticate('jwt', {session: false}), function(req,res) {
  Users.update({username : req.params.username}, {
    $pull: {favoritemovies : req.params.id}
  },
  {new : true}, // returns updated document
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

var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function() {
  console.log("Vous ecoutez en port 3000");
});
