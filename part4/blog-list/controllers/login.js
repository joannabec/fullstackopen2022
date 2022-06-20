const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  let correctPassword = false
  if(user) {
    correctPassword = await bcrypt.compare(password, user.passwordHash)
  } else {
    return response.status(401).json({
      error: 'username is invalid'
    })
  }

  if(!correctPassword) return response.status(401).json({
    error: 'password is incorrect'
  })

  const userForToken = {
    username,
    id: user.id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET
  )

  response.status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter