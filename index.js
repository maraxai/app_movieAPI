const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();

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

// routes to index.html on root level
app.get('/', function(req, res) {
  res.send(index.html);
});

// return json with all movies
app.get('/movies', (req, res) => {
  res.json(Movies);
});

// return json of a single movie selected by title
app.get('/movies/:title', (req, res) => {
  res.json(Movies.find((movie) => {
    return movie.title === req.params.title;
  }));
});

// get movie genres by title
app.get('/movies/:title/genres', (req, res) => {
  let movie = Movies.find((movie) => {
    return movie.title === req.params.title;
  });

  if (movie) {
    let genresArray = Object(movie.genres);
    res.status(201).send(genresArray);
  }
  else {
    res.status(404).send('Genres of ' + req.params.title + ' were not found.');
  }
});

// get movie description by title
app.get('/movies/:title/description', (req, res) => {
  let movie = Movies.find((movie) => {
    return movie.title === req.params.title;
  });
if (movie) {
  let description = movie.description;
  res.status(201).send(description);
}
else {
  res.status(404).send('No description available for the movie ' + req.params.title);
}
});

// get data of director by name
app.get('/movies/directors/:name', (req, res) => {
  let movie = Movies.find((movie) => {
    return movie.director.name === req.params.name;
});

  if (movie) {
    let director = Object(movie.director);
    res.status(201).send(director);
  }
  else {
    res.status(404).send('No information available about ' + req.params.name + '.');
  }
});

// new user registration
app.post('/users', (req, res) => {
  let newUser = req.body;
  if (!newUser.username || !newUser.password || !newUser.email || !newUser.dob) { const message = 'Information is not complete in request body';
  res.status(400).send(message);
} else {
  newUser.id = uuid.v4();
  Users.push(newUser);
  res.status(201).send(newUser);
}
});

// update user info (username, password, email, dob) by id
app.put('/users/:name/:username/:password/:email', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });
  if (user) {
    user.username = req.params.username;
    user.password = req.params.password;
    user.email = req.params.email;
    res.status(201).send(''+ req.params.name + '\'s information is updated.');
  } else {
    res.status(404).send('The user with the name ' + req.params.name + ' has not been found.');
  }
});

// add movie to list of favoriteMovies
app.put('/users/:user/favoriteMovies/:title', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });
  if (user) {
    let title = Movies.find((title) => {
      return Movies.title === req.params.title;

      if (title) {
        let newFavMovie = user.favoriteMovies;
        newFavMovie.push(req.params.title);
        return newFavMovie;
        res.status(201).send('The movie ' +  req.params.title + ' has been added to your list of favorite movies.');
      }
    });
  }
  else {
    res.status(404).send('Doesn\'t work!')
  }
});

// delete a user from the user list
app.delete('/users/:name', (req, res) => {
  let user = Users.find((user) => { return user.name === req.params.name });
  if (user) {
    let newUsers = Users.filter(function(obj) {
      return obj.name !== req.params.name });
      Users = newUsers;
      res.status(201).send('User ' + req.params.name + ' was deleted.')
  }
  else {
    res.status(404).send('Did not work, keep trying.');
  }
});

// remove movie in list of favoriteMovies
app.delete('/users/:user/favoriteMovies/:title', (req, res) => {
  let user = Users.find((user) => {
    return user.name === req.params.name;
  });
  if (user) {
    let updMovie = Users.favoriteMovies.filter(function(obj) {
      return obj.favoriteMovies !== req.params.title });
      Users.favoriteMovies = updMovie;
      res.status(201).send('Delete request will remove the movie ' + req.params.title + ' from the list of favorite movies.');
  }
  else {
    res.status(404).send('Keep trying! Deletion of movie from the favorites has not been successful!');
  }
});

///////////////////////////////// SVENJA'S CODE
// The favorite Movies issue :)

let user = {
    name: 'Mike',
    id: 1,
    username: 'mikedietz',
    password: 'test8test',
    email: 'here@there.com',
    dob: '11.11.1919',
    favoriteMovies : [ 'War Room', 'Bird', 'Round Midnight' ]
}

// What do we want to do? We want to add a string to our favoriteMovies Array.
// So, first of all, we need a title. Let's declare it:

let newTitle = 'Rotkaeppchen'
console.log(newTitle + ' (line:183)');

// Now, we need a JavaScript method to push something into an array. Sometimes
// it's quite lovely as the method has a very semantic name. In this case, it's push().
// More information here: https://appdividend.com/2018/10/08/javascript-array-push-example-array-prototype-tutorial/

let newTitleForFavoriteMoviews = user.favoriteMovies.push(newTitle + ' und der Wolf');

// To see if we have been successfull, log the favoriteMovies array:
console.log(user.favoriteMovies + ' (line:192)')

// The output will be: [ 'War Room', 'Bird', 'Round Midnight', 'Rotkaeppchen' ]

// As you can see, for one user it's quite easy. But, we have more than one user:

let group = [{
  name: 'Mike',
  id: 1,
  username: 'mikedietz',
  password: 'test8test',
  email: 'here@there.com',
  dob: '11.11.1919',
  favoriteMovies : [ 'War Room', 'Bird', 'Round Midnight' ]
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
]

// So, this time, we first have to find the correct user inside our group variable. For
// simplicity we'll use the id as identification. As the name (find) suggests, the
// find() method is an option: More information: https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/

let findCorrectUser = group.find(user => user.id === 1);


// Again, let's check the if we found 'Mike':
console.log(findCorrectUser);

// The output is:
// { name: 'Mike',
//   id: 1,
//   username: 'mikedietz',
//   password: 'test8test',
//   email: 'here@there.com',
//   dob: '11.11.1919',
//   favoriteMovies: [ 'War Room', 'Bird', 'Round Midnight' ] }

// But we want more. We want Mikes' favorite movies. And it's quite simple:
console.log(findCorrectUser.favoriteMovies)

// output: [ 'War Room', 'Bird', 'Round Midnight' ]

// Awesome. Now, we have to combine both methods. First, we find the correct user and
// after that we want to add a new favorite movie:

let newFavoriteMoviewForMike = findCorrectUser.favoriteMovies.push(newTitle)

// Again, log to be safe:
console.log(findCorrectUser)

// output:
// { name: 'Mike',
//   id: 1,
//   username: 'mikedietz',
//   password: 'test8test',
//   email: 'here@there.com',
//   dob: '11.11.1919',
//   favoriteMovies: [ 'War Room', 'Bird', 'Round Midnight', 'Rotkaeppchen' ] }

// So, what did we do? We found a user and add new properties to this user.
// Let's try to use this knowledge for our express application.

// We start with finding a single user by its id:

app.get('/users/:id', (req, res) => {
  res.json(Users.find((user) => {
    // First we loop through our Users collection, to find the user with id: 1
    // To see, what kind of request params we get, ALWAYS log them. :)
    console.log(req.params + ' line 268')
    // the output is: { id: '1' }
    // Now, we want to RETURN the user with this id. The users id has a type
    // of an Integer, but the request is a string. So, we need to find a method
    // which converts a string into an integer. Very semantic again: parseInt().
    // More information: https://www.w3schools.com/jsref/jsref_parseint.asp
    return user.id === parseInt(req.params.id);
    // the output is:
    // {
    //   "name": "Mike",
    //   "id": 1,
    //   "username": "mikedietz",
    //   "password": "test8test",
    //   "email": "here@there.com",
    //   "dob": "11.11.1919",
    //   "favoriteMovies": [
    //       "War Room",
    //       "Bird",
    //       "Round Midnight"
    //   ]
    // }
  }));
});

// Okay, the user is here, but we want his favorite movies.
// Have a look: don't use capital letters in your URL, please. :)
// More information: https://www.quora.com/Should-URLs-ever-have-capital-letters
app.get('/users/fav-movies/:id', (req,res) => {
  // first we find the correctUser and set it to an variable
  let findCorrectUser = Users.find((user) => {
    return user.id === parseInt(req.params.id);
  });
  if (findCorrectUser) {
    // if we find the user, let's find the favorite movies.
    usersFavMovies = findCorrectUser.favoriteMovies;
    // And finally, output the favorite movies. Just
    // like the example above.
    res.json(usersFavMovies);
    // The output is:
    // [
    //   "War Room",
    //   "Bird",
    //   "Round Midnight"
    // ]
  }
})

// Next step, adding a new title to the favorite movies:
app.put('/users/fav-movies/:id/:movie', (req, res) => {
  // again, first we need the correct user
  let correctUser = Users.find((user) => {
    return user.id === parseInt(req.params.id);
  });
  if (correctUser) {
    // after that, let's check the status of the favoriteMovies array
    console.log("Before adding new movie", correctUser.favoriteMovies)
    // we use the method from earlier, push()
    correctUser.favoriteMovies.push(req.params.movie);
    // and check again, if the new movie was added
    console.log("After adding new movie", correctUser.favoriteMovies)
    // we send a lovely note, which movie was added. You could add the name of the user or
    // whatever message you want. Play around with the parameters to get a feeling on how
    // to access the different parameters.
    res.status(201).send(req.params.movie + " was added.")
  } else {
    res.status(404).send("So sorry, but the favorite movies couldn't get updated.");
  }
})

// Finally, we want to remove an item from an array. There are different options,
// you could use filter(), but this would return a copy of the array. It wouldn't
// really remove the item. Some methods manipulate the array, others not.
// More information: https://lorenstewart.me/2017/01/22/javascript-array-methods-mutating-vs-non-mutating/
// Okay, we'll use the splice() method. The first option is for array, where you want to
// remove the first match. Afterwards, we'll use a loop to remove all items in case your
// array has double items.
app.delete('/users/fav-movies/:id/:movie', (req,res) => {
  let correctUser = Users.find((user) => {
    return user.id === parseInt(req.params.id);
  });
  if (correctUser) {
    console.log("Before removing existing movie", correctUser.favoriteMovies)
    // for readability we declare a variable for our favorite movies
    favMovies = correctUser.favoriteMovies
    // now, we want to know where movie is located in our array
    // More information: https://www.w3schools.com/jsref/jsref_indexof.asp
    getIndex = favMovies.indexOf(req.params.movie)
    // If the movie is included (-1 means, not part of our array. An array starts with position 0)
    if (getIndex !== -1) {
      // we manipulate the original array and remove the movie
      // More information: https://medium.freecodecamp.org/lets-explore-slice-splice-spread-syntax-in-javascript-e242a6f21e60
      favMovies.splice(getIndex, 1);
    }
    console.log("After removing existing movie", correctUser.favoriteMovies)
    res.status(201).send(req.params.movie + " was deleted.")
  } else {
    res.status(404).send("Sorry, couldn't delete the movie.");
  }
})

// And now, the version if we have more than one "Bird" for example:
app.delete('/users/fav-movies/:id/:movie', (req,res) => {
  let correctUser = Users.find((user) => {
    return user.id === parseInt(req.params.id);
  });
  if (correctUser) {
    console.log("Before removing existing movie", correctUser.favoriteMovies)
    favMovies = correctUser.favoriteMovies
    // the main difference is, that we don't use indexOf(), but a
    // classic for loop which iterates over each movie.
    for (var i=favMovies.length-1; i>=0; i--) {
      if (favMovies[i] === req.params.movie) {
        favMovies.splice(i, 1);
      }
    }
    console.log("After removing existing movie", correctUser.favoriteMovies)
    res.status(201).send(req.params.movie + " was deleted.")
  } else {
    res.status(404).send("Sorry, couldn't delete the movie.");
  }
})

// Remember, you can log everything, so use this tool whenever you write code. When you
// know your parameters and you know what your result should look like, coding
// gets much easier. :)
// Happy coding!
//////////////////////////////////

//get all users
app.get('/users', (req, res) => {
  res.json(Users);
});

// get a user's data by name (name, id, username, password, email, dob)
app.get('/users/:name', (req, res) => {
  res.json(Users.find((user) => {
    return user.name === req.params.name;
  }));
});

let Movies = [
{
title: 'War Room',
description: 'The family-friendly movie explores the transformational role prayer plays in the lives of the Jordan family. Tony and Elizabeth Jordan, a middle-class couple who seemingly have it all – great jobs, a beautiful daughter, their dream home. But appearances can be deceiving. In reality, the Jordan\'s marriage has become a war zone and their daughter is collateral damage. With the help of Miss Clara, an older, wiser woman, Elizabeth discovers she can start fighting for her family instead of against them. Through a newly energized faith, Elizabeth and Tony\'s real enemy doesn\'t have a prayer.',
genres: ['drama', 'romance'],
director:
{
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
director:
{
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
director:
{
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
]

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
]

app.listen(3000, () => {
  console.log('This app is listening on port 3000.');
})
