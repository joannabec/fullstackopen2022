import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setMsg, removeMsg } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const term = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdote.filter(item => 
    item.content.indexOf(term) !== -1
  ))
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    const { content } = anecdotes.find(item => item.id === id)
    dispatch(setMsg(`you voted ${content}`))
    setTimeout(() => {
      dispatch(removeMsg())
    }, 5000);
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