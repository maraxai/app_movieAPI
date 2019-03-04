const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

app.get('/movies', function(req, res) {
  // json contains top 10 movies
  res.json(topTenMovies);
  console.log('under construction, soon you will see something')
})

app.get('/', function(req, res) {
  res.send('Do you like movies?');
})

app.get('/', function(req, res) {
  res.send('Do you like movies?');
})

app.get('/', function (req, res) {
  res.send('Greetings from Morgan!')
})

app.use(express.static('public'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Oops!');
});

let topTenMovies = [{
  title: 'movie A',
},
{
  title: 'movie B',
},
{
  title: 'movie C',
}];

app.listen(3000, () => {
  console.log('Seems to work if you read this! this app is listening on port 3000.');
})
