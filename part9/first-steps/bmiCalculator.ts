type BMICategory =
  | "Underweight (Severe thinness)"
  | "Underweight (Moderate thinness)"
  | "Underweight (Mild thinness)"
  | "Normal range"
  | "Overweight (Pre-obese)"
  | "Obese (Class I)"
  | "Obese (Class II)"
  | "Obese (Class III)";

class BMIMapping {
  category: BMICategory;
  start: number | undefined;
  stop: number | undefined;

  constructor(
    category: BMICategory,
    start: number | undefined,
    stop: number | undefined
  ) {
    this.category = category;
    this.start = start;
    this.stop = stop;
  }

  contains(bmi: number): boolean {
    if (this.start !== undefined && bmi < this.start) return false;
    if (this.stop !== undefined && bmi >= this.stop) return false;

    return true;
  }
}

const mappings: Array<BMIMapping> = [
  new BMIMapping("Underweight (Severe thinness)", undefined, 16),
  new BMIMapping("Underweight (Moderate thinness)", 16, 17),
  new BMIMapping("Underweight (Mild thinness)", 17, 18.5),
  new BMIMapping("Normal range", 18.5, 25),
  new BMIMapping("Overweight (Pre-obese)", 25, 30),
  new BMIMapping("Obese (Class I)", 30, 35),
  new BMIMapping("Obese (Class II)", 35, 40),
  new BMIMapping("Obese (Class III)", 40, undefined),
];

function calculateBmi(height: number, weight: number): BMICategory {
  const meterHeight = height / 100;
  const bmi = weight / (meterHeight * meterHeight);

  for (const mapping of mappings) {
    if (mapping.contains(bmi)) {
      return mapping.category;
    }
  }

  throw new Error(`Unclassified BMI of ${bmi}`);
}

// CLI handling
interface BMIValues {
  height: number;
  weight: number;
}

function parseBMIArguments(args: Array<string>): BMIValues {
  if (args.length < 4) throw new Error("Too few arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(weight) && !isNaN(height)) {
    return {
      height,
      weight,
    };
  }

  throw new Error("Invalid values provided");
}

try {
  const { weight, height } = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.error(error.message);
  console.error(`Usage:
    bmiCalculator <height (cm)> <weight (kg)>`);
}
