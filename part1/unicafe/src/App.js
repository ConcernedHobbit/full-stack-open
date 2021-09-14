import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total <= 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = total > 0 ? (good - bad) / total : 0
  const positivePercentage = total > 0 ? ((good) / total) * 100 : 0

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positivePercentage + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
