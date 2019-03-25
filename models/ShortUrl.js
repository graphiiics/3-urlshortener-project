//Create Model
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var URLSchema = new Schema({
  original: { type: String, trim:true, default:'', unique: true, required: true },
  short_url: { type: String, trim:true, unique: true, required: true }
})

var ShortUrl = mongoose.model('ShortUrl', URLSchema)

module.exports = ShortUrl;