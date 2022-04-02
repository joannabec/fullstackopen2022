const Course = ({ course }) => {

  const Header = ({name}) => <h1>{name}</h1>

  const Total = ({ exercises }) => {
    const sum = exercises.reduce((acc, item) => acc + item.exercises, 0);
    return <strong>Total of {sum} exercises</strong>
  }

  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>

  const Content = ({ parts }) => 
    <>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </>
  
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}

export default Course;