import { useState } from 'react'

const Button = ({ handleClick, text }) => 
  <button onClick={handleClick}>{ text }</button>

const StatisticLine = ({text, value}) => 
  <tr>
    <td>{text}:</td> 
    <td>{value} {text === "Positive" && '%'}</td>
  </tr>

const Statistics = ({good, bad, neutral, total}) => {
  return (
    <>
      <h2>Statistics</h2>
      { total > 0 
      ?
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={(good + bad * -1) / total} />
          <StatisticLine text="Positive" value={good * 100 / total} />
        </tbody>
      </table>
      : <p>No feedback given</p>
      }
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // scores --> good: 1, neutral: 0, bad: -1
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={good + neutral + bad} />
    </div>
  )
}

export default App;