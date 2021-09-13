import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.title} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => <Part key={part.title} part={part}/>)}
    </div>
  )
}

const Total = (props) => {
  const exercises = props.parts.map((part) => part.exercises).reduce((a, b) => a + b)

  return (
    <p>Number of exercises {exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { title: 'Fundamentals of React', exercises: 10 },
    { title: 'Using props to pass data', exercises: 7 },
    { title: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App;