const (express) = require('express');
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

////////////
// REQUESTS
////////////

// ?????routes to index.html on root level
//app.get('/', function(req, res) {
//  res.send(index.html);
//});

// return json with all movies (mongoose)
app.get('/movies', function(req, res) {
  Movies.find()
  .then(function(movies) {
  res.status(201).json(movies);
  });
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
  });
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
  });
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
  });
  .catch(function(function(movie) {
    console.error(err);
    res.status(500).send('There is an error with your request. Please check the ' + req.params.title + '.');
  });
});

// get data of director by name (mongoose)
app.get('/movies/directors/:name', function(req, res) {
  Movies.findOne({director.name: req.params.name})
  .then(function(movie) {
    res.json(movie.director);
  });
  .catch(function(err) {
    res.status(500).send('There is an error with your request. Please check your entry ' + req.params.name + '.');
  });
});

// get a user's list of favorite movies by username (mongoose)
app.get('/users/favoritemovies/:username', function(req,res) {
  Users.findOne({username: req.params.username})
  .then(function(user) {
    res.json(user.favoritemovies);
  });
  .catch(function(err) {
    res.status(500).send('There is an error with your request. Please check your entry ' + req.params.username + '.'')
  });
});

// new user registration (mongoose)
/* JSON is expected in this format
{
userid : ? either Integer or ObjectId
username : String,
password : String,
email : String,
birthday : date;
}
*/
app.post('/users', function(req, res) {
  Users.findOne({username: req.body.username})
  .then(function(user) {
    if(user) {
      return res.status(400).send('The username ' + req.body.name + ' already exists.');
    }
    else {
      Users
      .create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday
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
/* JSON is expected in this format
{
//userid : ? either Integer or ObjectId
username : String,
password : String,
email : String,
birthday : Date;
}
*/
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

// add movie to the list of favoriteMovies of a user identified by id (Mongoose)
app.post('/users/:username/favoritemovies/:movieid', function(req, res) {
  Users.findOneAndUpdate({username : req.params.username}, {
    $push: {favoritemovies : req.params.movieid}
  },
  {new : true}, // returns updated document
  function(err, UpdatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send('Error' + err);
    }
    else {
      res.json(updatedUser)
    }
  })
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
    $pull: {favoritemovies.movieid : req.params.movieid}
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

// get a user's data by name (name, id, username, password, email, dob)
app.get('/users/:name', function(req, res) {
  Users.findOne({username: req.params.username})
  .then(function(user){
      res.json(user);
  });
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// get a user's data by id (name, id, username, password, email, dob)
app.get('/users/:userId', (req, res) => {
  res.json(Users.find((user) => {
    console.log(req.params);
    return user.id === parseInt(req.params.id);
  }));
});

let Movies = [
{
title: 'War Room',
description: 'The family-friendly movie explores the transformational role prayer plays in the lives of the Jordan family. Tony and Elizabeth Jordan, a middle-class couple who seemingly have it all – great jobs, a beautiful daughter, their dream home. But appearances can be deceiving. In reality, the Jordan\'s marriage has become a war zone and their daughter is collateral damage. With the help of Miss Clara, an older, wiser woman, Elizabeth discovers she can start fighting for her family instead of against them. Through a newly energized faith, Elizabeth and Tony\'s real enemy doesn\'t have a prayer.',
genres: ['drama', 'romance'],
director: {
  name: 'Alex Kendrick',
  bio: 'former associate pastor at Sherwood Baptist Church, in Albany, Georgia, founded Sherwood Pictures, which produced Flywheel (2003), Facing the Giants (2006), Fireproof (2008), and Courageous (2011). Co-author of several best-selling books, including The Love Dare. Author of New York Times Best Seller The Resolution for Men and The Battle Plan for Prayer. Again with his brother, also appeared on the New York Times Best Seller list. In 2013, he founded Kendrick Brothers Productions with his brothers, Stephen and Shannon.',
  yearOfBirth: 1970,
  yearOfDeath: '',
},
imageUrl: 'img/warRoom.jpg'
},
{
title: 'Facing the Giants',
description: 'A losing coach with an underdog football team faces their giants of fear and failure on and off the field to surprising results.',
genres: ['drama'],
director: {
  name: 'Alex Kendrick',
  bio: 'former associate pastor at Sherwood Baptist Church, in Albany, Georgia, founded Sherwood Pictures, which produced Flywheel (2003), Facing the Giants (2006), Fireproof (2008), and Courageous (2011). Co-author of several best-selling books, including The Love Dare. Author of New York Times Best Seller The Resolution for Men and The Battle Plan for Prayer. again with his brother, also appeared on the New York Times Best Seller list. In 2013, he founded Kendrick Brothers Productions with his brothers, Stephen and Shannon.',
  yearOfBirth: 1970,
  yearOfDeath:'',
},
imageUrl: 'img/facingTheGiants.jpg'
},
{
title: 'Corageous',
description: 'As law enforcement officers, Adam Mitchell, Nathan Hayes, and their partners are confident and focused. They willingly stand up to the worst the streets have to offer. Yet at the end of the day, they face a challenge that none of them are truly prepared to tackle: fatherhood. They know that God desires to turn the hearts of fathers to their children, but their children are beginning to drift further and further away from them. When tragedy hits home, these men are left wrestling with their hopes, their fears, their faith, and their fathering. Can a new found urgency help these dads draw closer to God ... and to their children? COURAGEOUS is the fourth release of Sherwood Pictures, the movie making ministry of Sherwood Church in Albany, Georgia.',
genres: ['drama'],
director: {
  name: 'Alex Kendrick',
  bio: 'former associate pastor at Sherwood Baptist Church, in Albany, Georgia, founded Sherwood Pictures, which produced Flywheel (2003), Facing the Giants (2006), Fireproof (2008), and Courageous (2011). Co-author of several best-selling books, including The Love Dare. Author of New York Times Best Seller The Resolution for Men and The Battle Plan for Prayer. again with his brother, also appeared on the New York Times Best Seller list. In 2013, he founded Kendrick Brothers Productions with his brothers, Stephen and Shannon.',
  yearOfBirth: 1970,
  yearOfDeath:'',
},
imageUrl: 'img/courageous.jpg'
},
{
title: 'Paul, Apostle of Christ',
description: 'The story covers Paul going from the most infamous persecutor of Christians to Jesus Christ\'s most influential apostle.',
genres: ['adventure', 'biography', 'drama'],
director: {
  name: 'Andrew Hyatt',
  bio: 'Andrew Hyatt is the award-winning writer/director of "Paul, Apostle of Christ", "Full of Grace", "The Last Light", and "The Frozen". Hyatt\'s passion is in the creation of content that is deeply personal, seeking to tell stories that delve deeper into the drama of the human condition. Exploring good and evil, truth and beauty.',
  yearOfBirth: 1982,
  yearOfDeath:'',
},
imageUrl: 'img/paulTheApostleOfChrist.jpg'
},
{
title: 'Full of Grace',
description: 'Follows Mary of Nazareth in her last earthly days as she helps the fractious early Church regain their original encounter with The Lord.',
genres: ['drama', 'history'],
director: {
  name: 'Andrew Hyatt',
  bio: 'Andrew Hyatt is the award-winning writer/director of "Paul, Apostle of Christ", "Full of Grace", "The Last Light", and "The Frozen". Hyatt\'s passion is in the creation of content that is deeply personal, seeking to tell stories that delve deeper into the drama of the human condition. Exploring good and evil, truth and beauty.' ,
  yearOfBirth: 1982,
  yearOfDeath:'',
},
imageUrl: 'img/fullOfGrace'
},
{
title: 'The Passion of the Christ',
description: 'Depicts the final twelve hours in the life of Jesus of Nazareth, on the day of his crucifixion in Jerusalem.',
genres: ['drama'],
director: {
  name: 'Mel Gibson',
  bio: 'Mel Columcille Gerard Gibson was born January 3, 1956 in Peekskill, New York, USA, as the sixth of eleven children of Hutton Gibson, a railroad brakeman, and Anne Patricia (Reilly) Gibson (who died in December of 1990). His mother was Irish, from County Longford, while his American-born father is of mostly Irish descent.',
  yearOfBirth: 1956,
  yearOfDeath:'',
},
imageUrl: 'img/thePassionOfChrist.jpg'
},
{
title: 'Bird',
description: 'The troubled life and career of the jazz musician, Charlie "Bird" Parker.',
genres: ['biography', 'drama', 'music'],
director: {
  name: 'Clint Eastwood',
  bio: 'Clint Eastwood was born May 31, 1930 in San Francisco, the son of Clinton Eastwood Sr., a manufacturing executive for Georgia-Pacific Corporation, and Ruth Wood, a housewife turned IBM operator. He had a comfortable, middle-class upbringing in nearby Piedmont.',
  yearOfBirth: 1930,
  yearOfDeath:'',
},
imageUrl: 'img/bird.jpg'
},
{
title: 'Round Midnight',
description: 'A troubled, but talented musician flees the US to escape his problems, finding refuge and support in Paris.',
genres: ['drama', 'music'],
director: {
  name: 'Bertrand Tavernier',
  bio: 'Bertrand Tavernier was a law student that preferred write film criticisms. He also wrote a few books about American movies. Then his first film won a few awards in France and abroad and established his reputation.',
  yearOfBirth: 1941,
  yearOfDeath:'',
},
imageUrl: 'img/roundMidnight.jpg'
},
{
title: 'Chasing Trane: The John Coltrane Documentary',
description: 'The film explores the global power and impact of the music of John Coltrane and reveals the passions, experiences and forces that shaped his life and revolutionary sounds.',
genres: ['documentary', 'biography', 'music'],
director: {
  name: 'John Scheinfeld',
  bio: 'From pop culture to politics, sports to world religions, Venice and Toronto film festivals to PBS, Emmy®, Grammy® and Writers Guild Award nominee John Scheinfeld is a critically-acclaimed documentary filmmaker with a broad range of subjects and productions to his credit.',
  yearOfBirth:'' ,
  yearOfDeath:'',
},
imageUrl: 'img/Coltrane.jpg'
}
];

let Users = [
{
name: 'Mike',
id: 1,
username: 'mikedietz',
password: 'test8test',
email: 'here@there.com',
dob: '11.11.1919',
favoriteMovies : [ 'War Room', 'Bird', 'Round Midnight' ]
},
{
name: 'Quark',
id: 2,
username: 'peterquark',
password: 'peter8quark',
email: 'peter@quark.com',
dob: '12.12.2012',
favoriteMovies : ['Facing The Giant','Paul, the Apostle of Christ']
},
{
name: 'Quantino',
id: 3,
username: 'quantinto',
password: 'quantanto',
email: 'quant@quint.com',
dob: '22.11.1918',
favoriteMovies : ['Bird']
}
];

app.listen(3000, () => {
  console.log('This app is listening on port 3000.');
});
