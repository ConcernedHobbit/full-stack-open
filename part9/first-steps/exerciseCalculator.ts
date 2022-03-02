export interface ExercisePeriod {
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

export function calculateExercises(
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

// CLI handling
interface ExerciseValues {
  dailyExerciseHours: Array<number>;
  target: number;
}

function parseExerciseArguments(args: Array<string>): ExerciseValues {
  if (args.length < 4) throw new Error("Too few arguments");

  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map(Number);

  if (dailyExerciseHours.some((num) => isNaN(num))) {
    throw new Error("Invalid value in daily exercise hours");
  }

  return {
    dailyExerciseHours,
    target,
  };
}

try {
  const { dailyExerciseHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
  console.error(`Usage:
  calculateExercise <target (h)> <daily exercise hours, seperated by space>`);
}
