const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs');

var movieSchema = mongoose.Schema({
  title : {type: String, required: true},
  description : {type: String, required: true},
  genre : {
    name : String,
    description : String
  },
  director : {
    name : String,
    bio : String
  },
  imagepath : String,
  featured : Boolean
});

var userSchema = mongoose.Schema({
 username : {type: String, required: true},
 password : {type: String, required: true},
 email : {type: String, required: true},
 birthday : Date,
 favoritemovies : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Movies' }]
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
