import { ReactNode } from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";


const Title = ({ part }: { part: CoursePart }) => (
  <p>
    <strong>{part.name}</strong> {part.exerciseCount}
  </p>
)

const Link = ({ href, children }: { href: string, children: ReactNode }) => (
  <a href={href} rel="noreferrer noopener">
    {children}
  </a>
)

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <>
          <Title part={part} />
          <em>{part.description}</em>
        </>
      )

    case "groupProject":
      return (
        <>
          <Title part={part} />
          {part.groupProjectCount} group projects
        </>
      )
    
    case "submission":
      return (
        <>
          <Title part={part} />
          <em>{part.description}</em>
          <p>Submit to <Link href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</Link></p>
        </>
      )
    
    case "special":
      return (
        <>
          <Title part={part} />
          <em>{part.description}</em>
          <p>Requirements: {part.requirements.join(', ')}</p>
        </>
      )

    default:
      assertNever(part);
  }

  return <></>;
}

export default Part;