import { CoursePart } from '../types';

const Part = ({ part }: {part: CoursePart}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (part.type) {
    case "normal":
      return (
        <div className="part">
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
        </div>
      )
    case "groupProject":
      return (
        <div className="part">
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div className="part">
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      )
      case "special":
        return (
          <div className="part">
            <h2>{part.name} {part.exerciseCount}</h2>
            <p>{part.description}</p>
            <p>required skills:
              {
                part.requirements.map((skill:string, i) => 
                  <span key={skill}> {skill}{i < part.requirements.length -1 ? ',':''}</span>)
              }            
            </p>
          </div>
        )
    default:
      return assertNever(part);
  }
}

export default Part;