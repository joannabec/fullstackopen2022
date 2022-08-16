import axios from 'axios'
const baseUrl = '/api/users'

export const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const getUser = async id => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response
  } catch (error) {
    return error.response
  }
}
