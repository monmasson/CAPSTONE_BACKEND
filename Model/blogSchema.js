
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },

  
},);

const blog = mongoose.model('blog', blogSchema);

module.exports = blog