const logger = require('./logger')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else request.token = null

  next()
}

const userExtractor = (request, response, next) => {
  request.user = jwt.verify(request.token, process.env.SECRET)
  next()
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}