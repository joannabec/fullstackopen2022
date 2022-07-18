import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newNote = async (blog) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const newBlog = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    }
  })
  return newBlog  
}

const blogService = { getAll, newNote }
export default blogService