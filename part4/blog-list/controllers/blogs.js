const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { id: userId } = request.user
  const blog = request.body

  const user = await User.findById(userId)

  const newBlog = new Blog({
    title: blog.title,
    author: blog. author,
    url: blog.url,
    likes: blog.likes,
    user: user._id
  })

  const result = await newBlog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { id: userId } = request.user
  const blog = await Blog.findById(request.params.id)

  if(userId === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)

    const user = await User.findById(userId)
    user.blogs = user.blogs.filter(id => id === request.params.id)
    await user.save()

    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'token or user are invalid' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const likes = request.body.likes

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter