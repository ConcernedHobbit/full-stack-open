import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { courseParts } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const totalParts = courseParts.map(part => part.exerciseCount)
                                .reduce((sum, curr) => sum + curr, 0)
  return (
    <>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total count={totalParts} />
    </>
  );
};

export default App;