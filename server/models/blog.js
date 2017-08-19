const mongoose = require('mongoose')
const Schema = mongoose.Schema


//Define the model
const blogSchema = new Schema({
  title: String,
  categories: String,
  content: String
})


//Create the model class
const ModelClass = mongoose.model('blog', blogSchema)

//Export the model
module.exports = ModelClass