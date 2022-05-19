const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'is required']
  },
  author: {
    type: String,
    required: [true, 'is required']
  },
  url: {
    type: String,
    required: [true, 'is required']
  },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)