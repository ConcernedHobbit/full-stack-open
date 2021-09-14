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

  export default Course