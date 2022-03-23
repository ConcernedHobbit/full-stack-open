import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: Array<CoursePart> }) => (
  <>
    {parts.map(
      part => 
        <Part part={part} key={part.name} />
    )}
  </>
)

export default Content;