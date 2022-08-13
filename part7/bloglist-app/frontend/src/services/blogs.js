import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newNote = async blog => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const newBlog = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  return newBlog
}

const updateBlog = async (blog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const removeBlog = async id => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  return response
}

const blogService = { getAll, newNote, updateBlog, removeBlog }
export default blogService
