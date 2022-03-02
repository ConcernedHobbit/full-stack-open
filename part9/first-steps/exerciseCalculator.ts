interface ExercisePeriod {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const descriptions = [
  "you can do better than that",
  "not too bad but could be better",
  "great success!",
];

function calculateExercises(
  dailyExerciseHours: Array<number>,
  target: number
): ExercisePeriod {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  const differenceFromTarget = target - average;

  // Could be improved and made more dynamic
  let rating = 3;
  if (differenceFromTarget > 1) {
    rating = 1;
  } else if (differenceFromTarget > 0) {
    rating = 2;
  }

  const ratingDescription = descriptions[rating - 1];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
