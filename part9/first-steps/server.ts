import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  const category = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi: category,
  });
});

interface ExerciseRequest extends Express.Request {
  body: { daily_exercises: Array<number>; target: number };
}

app.post("/exercises", (req: ExerciseRequest, res) => {
  const body = req.body;
  const dailyExerciseHours = body.daily_exercises;

  if (dailyExerciseHours === undefined || body.target === undefined) {
    res.status(400).json({
      error: "parameters missing",
    });
    return;
  }

  const target = Number(body.target);

  if (
    isNaN(target) ||
    !(dailyExerciseHours instanceof Array) ||
    dailyExerciseHours.some((num) => isNaN(num))
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  const exercisePeriod = calculateExercises(dailyExerciseHours, target);
  res.json(exercisePeriod);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open: http://localhost:${PORT}/hello`);
});
