import React from 'react'

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  const exercises = parts.map((part) => part.exercises).reduce((a, b) => a + b)

  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part}/>)}
      <p>Number of exercises {exercises}</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10, id: 1 },
      { name: 'Using props to pass data', exercises: 7, id: 2 },
      { name: 'State of a component', exercises: 14, id: 3 },
      { name: 'Advanced stuff for advanced people', exercises: 2, id: 4 }
    ]
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

export default App