// get the files we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var sunglassSchema = new Schema({
  name: String,
  description: String,
  size: String,
  type: String,
  brand: String,
  gender: String,
  frame: String, 
  rating: Number,
  price: Number
 });

module.exports = mongoose.model('Appsunglass', sunglassSchema);
