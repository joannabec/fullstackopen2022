const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require ('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const userObject = new User(helper.userForTesting)
  await userObject.save()

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: userObject._id
    })
    await blogObject.save()
  }

}, 100000)

describe('getting blogs from the app', () => {
  test('should be in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should have the correct amount', async () => {
    const res = await Blog.find({})
    expect(res).toHaveLength(helper.initialBlogs.length)
  })

  test('should have id as the unique identifier', async () => {
    const res = await Blog.find({})
    expect(res[0].id).toBeDefined()
  })
})

describe('adding a new blog', () => {
  test('should succeed if the data is valid', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    const user = await User.find({})
    const userForToken = user[0].toJSON()
    const token = helper.generateToken({ username: userForToken.username, id: userForToken.id })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogList = await Blog.find({})
    expect(newBlogList).toHaveLength(helper.initialBlogs.length + 1)

    const contents = newBlogList.map(b => b.title)
    expect(contents).toContain('Type wars')
  })

  test('with no likes property, should created by default with the value of 0', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    const user = await User.find({})
    const userForToken = user[0].toJSON()
    const token = helper.generateToken({ username: userForToken.username, id: userForToken.id })

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogList = await Blog.find({})
    const blogLikes = newBlogList.filter(item => item.id === response.body.id)
    expect(blogLikes[0].likes).toBe(0)
  })

  test('should fail with status code 400 if the title is missing', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 3
    }

    const user = await User.find({})
    const userForToken = user[0].toJSON()
    const token = helper.generateToken({ username: userForToken.username, id: userForToken.id })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogList = await api.get('/api/blogs')
    expect(blogList.body).toHaveLength(helper.initialBlogs.length)
  })

  test('should fail with status code 400 if the url is missing', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 3
    }

    const user = await User.find({})
    const userForToken = user[0].toJSON()
    const token = helper.generateToken({ username: userForToken.username, id: userForToken.id })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogList = await api.get('/api/blogs')
    expect(blogList.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('should succeed with a valid id', async () => {
    const allBlogsBefore = await Blog.find({})
    const blogToDelete = allBlogsBefore[0]

    const user = await User.find({})
    const userForToken = user[0].toJSON()
    const token = helper.generateToken({ username: userForToken.username, id: userForToken.id })

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const allBlogsAfter = await Blog.find({})
    expect(allBlogsAfter).toHaveLength(allBlogsBefore.length - 1)

    const blogsId = allBlogsAfter.map(b => b.id)
    expect(blogsId).not.toContain(blogToDelete.id)
  })
})

describe('updating likes of a blog', () => {
  test('should succeed if the data is correct', async () => {
    const allBlogsBefore = await Blog.find({})
    const blogToUpdate = allBlogsBefore[0]

    const blog = { likes: 5 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const allBlogsAfter = await Blog.find({})
    expect(allBlogsAfter[0].likes).toBe(blog.likes)
  })

  test('should fail if the data is invalid', async () => {
    const allBlogs = await Blog.find({})
    const blogToUpdate = allBlogs[0]

    const blog = { likes: 'notanumber' }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(400)
  })

  test('should fail if the id is invalid', async () => {
    const blog = { likes: 5 }

    await api
      .put('/api/blogs/123456')
      .send(blog)
      .expect(400)
  })
})

describe('creating an user', () => {
  test('should succeed if the data is valid', async () => {
    const user = {
      username: 'Juanito Nieves',
      name: 'Jhon Snow',
      password: 'contraseña'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersList = await User.find({})
    expect(usersList).toHaveLength(2)
    expect(usersList[1].username).toBe(user.username)
  })

  test('should fail if the username or password is invalid', async () => {
    const firstUsersList = await User.find({})
    const user = {
      username: 'So',
      name: 'Han Solo',
      password: 'contraseña'
    }

    const user2 = {
      username: 'Solo',
      name: 'Han Solo',
      password: 'co'
    }

    await api.post('/api/users')
      .send(user)
      .expect(400)

    await api.post('/api/users')
      .send(user2)
      .expect(400)

    const lastUsersList = await User.find({})
    expect(lastUsersList).toHaveLength(1)
    expect(lastUsersList).toEqual(firstUsersList)
  })

  test('should fail if data is missing', async () => {
    const firstUsersList = await User.find({})
    const user = {
      username: '',
      name: '',
      password: ''
    }
    await api.post('/api/users')
      .send(user)
      .expect(400)

    const lastUsersList = await User.find({})
    expect(lastUsersList).toHaveLength(1)
    expect(lastUsersList).toEqual(firstUsersList)
  })
})

afterAll(() => {
  mongoose.connection.close()
})