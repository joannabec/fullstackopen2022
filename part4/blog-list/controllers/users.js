const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const repeatedUsername = await User.findOne({ username })
  if (repeatedUsername) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  if (password.length <= 3) {
    response.status(400).send({ error: 'password must be at least 3 characters long' })
  }
  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter