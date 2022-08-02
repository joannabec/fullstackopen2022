import { createSlice } from "@reduxjs/toolkit"

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
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

export default anecdoteReducer.reducer
export const { createAnecdote, addVote, setAnecdotesList } = anecdoteReducer.actions