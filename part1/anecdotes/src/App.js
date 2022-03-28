import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(7).fill(0));
  const [idxmax, setIdxmax] = useState(null);

  const Button = ({event, text}) => 
    <button onClick={event}>{ text }</button>
  

  const handleAnecdote = () => {
    let randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 7);
    setSelected(randomNumber);
  }

  const handleVote = (index) => {
    const arr = [...points];
    arr[index] += 1;
    setPoints(arr);
    const max = Math.max(...arr);
    setIdxmax(arr.indexOf(max));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="vote" event={() => handleVote(selected)} />
      <Button text="next anecdote" event={handleAnecdote} />
      <h2>Anecdote with most votes</h2>
      { idxmax !== null
        ? <p>{anecdotes[idxmax]}</p> 
        : <p>All anecdotes have 0 votes</p>
      }
    </div>
  )
}

export default App;
