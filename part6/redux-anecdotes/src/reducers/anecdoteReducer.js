import { createSlice } from "@reduxjs/toolkit"
import servicesAnecdotes from "../services/anecdotes"

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      return state.map(item => item.id === action.payload ? ({...item, votes: item.votes + 1}) : item)
    },
    setAnecdotesList(_, action) {
      return action.payload
    }
  }
})
export const { addAnecdote, addVote, setAnecdotesList } = anecdoteReducer.actions

export const loadAnecdotes = () => {
  return async dispatch => {
    const allAnecdotes = await servicesAnecdotes.getAllEntries()
    dispatch(setAnecdotesList(allAnecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await servicesAnecdotes.createNewAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const updateAnecdote = id => {
  return (dispatch, getState) => {
    dispatch(addVote(id))
    const { anecdote } = getState()
    const newAnecdote = anecdote.find(item => item.id === id)
    servicesAnecdotes.updateAnecdote(newAnecdote, id)
  }
}

export default anecdoteReducer.reducer