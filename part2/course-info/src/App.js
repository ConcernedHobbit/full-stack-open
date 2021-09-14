import React from 'react'

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} ({part.exercises} exercises)</p>
  )
}

const Content = ({parts}) => {
  const totalExercises = parts.map((part) => part.exercises).reduce((a, b) => a + b)

  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part} />)}
      <strong>Total exercises: {totalExercises}</strong>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        { name: 'Fundamentals of React', exercises: 10, id: 1 },
        { name: 'Using props to pass data', exercises: 7, id: 2 },
        { name: 'State of a component', exercises: 14, id: 3 },
        { name: 'Advanced stuff for advanced people', exercises: 2, id: 4 }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Available courses</h1>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App