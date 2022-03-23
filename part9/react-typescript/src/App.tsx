import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
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