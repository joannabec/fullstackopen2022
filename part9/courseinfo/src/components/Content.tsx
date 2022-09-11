import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: {courseParts: Array<CoursePart>}) => {
  return (
    <div>
      { courseParts.map((course: CoursePart) =>
      <Part key={course.name} part={course} />)
      }
    </div>
  )
}

export default Content;