const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const noteObject = new Blog(blog)
    await noteObject.save()
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
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('should have id as the unique identifier', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
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

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogList = await api.get('/api/blogs')
    expect(newBlogList.body).toHaveLength(helper.initialBlogs.length + 1)

    const contents = newBlogList.body.map(b => b.title)
    expect(contents).toContain('Type wars')
  })

  test('with no likes property, should created by default with the value of 0', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogList = await api.get('/api/blogs')
    const blogLikes = newBlogList.body.filter(item => item.id === response.body.id)
    expect(blogLikes[0].likes).toBe(0)
  })

  test('should fail with status code 400 if the title is missing', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
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

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogList = await api.get('/api/blogs')
    expect(blogList.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('should succeed with a valid id', async () => {
    const allBlogsBefore = await api.get('/api/blogs')
    const blogToDelete = allBlogsBefore.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const allBlogsAfter = await api.get('/api/blogs')
    expect(allBlogsAfter.body).toHaveLength(allBlogsBefore.body.length - 1)

    const blogsId = allBlogsAfter.body.map(b => b.id)
    expect(blogsId).not.toContain(blogToDelete.id)
  })
})

describe('updating likes of a blog', () => {
  test('should succeed if the data is correct', async () => {
    const allBlogsBefore = await api.get('/api/blogs')
    const blogToUpdate = allBlogsBefore.body[0]

    const blog = { likes: 5 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const allBlogsAfter = await api.get('/api/blogs')
    expect(allBlogsAfter.body[0].likes).toBe(blog.likes)
  })

  test('should fail if the data is invalid', async () => {
    const allBlogs = await api.get('/api/blogs')
    const blogToUpdate = allBlogs.body[0]

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

afterAll(() => {
  mongoose.connection.close()
})