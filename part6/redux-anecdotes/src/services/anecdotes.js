import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAllEntries = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const servicesAnecdotes = { getAllEntries, createNewAnecdote }
export default servicesAnecdotes