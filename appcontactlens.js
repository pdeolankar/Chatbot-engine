// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var contactlensSchema = new Schema({
  name: String,
  description: String,
  type: String,
  brand: String,
  color: String,
  ratings: Number,
  price: Number  
});

module.exports = mongoose.model('Appcontactlens', contactlensSchema);
