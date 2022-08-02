import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotificacion } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const term = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdote.filter(item => 
    item.content.indexOf(term) !== -1
  ))
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(item => item.id === id)
    dispatch(updateAnecdote(id))
    dispatch(setNotificacion(`you voted ${anecdote.content}`, 4))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList