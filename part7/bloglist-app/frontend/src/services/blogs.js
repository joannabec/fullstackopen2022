import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newblog = async blog => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  try {
    const response = await axios.post(baseUrl, blog, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    return response
  } catch (error) {
    return error.response
  }
}

const updateBlog = async (blog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const removeBlog = async id => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    return response
  } catch (error) {
    return error.response
  }
}

const blogService = { getAll, newblog, updateBlog, removeBlog }
export default blogService
