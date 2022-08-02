import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'

export default configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})