const calculateBmi = (h: number, w: number): void => {
  const hMeters:number = h / 100;
  const bmi:number = (w / (hMeters * hMeters));

  if(bmi < 16) console.log('Underweight (Severe thinness)');
  if(bmi >= 16 && bmi <= 16.9) console.log('Underweight (Moderate thinness)');
  if(bmi >= 17 && bmi <= 18.4) console.log('Underweight (Mild thinness)');
  if(bmi >= 18.5 && bmi <= 24.9) console.log('Normal (healthy weight)');
  if(bmi >= 25 && bmi <= 29.9) console.log('Overweight (Pre-obese)');
  if(bmi >= 30 && bmi <= 34.9) console.log('Obese (Class I)');
  if(bmi >= 35 && bmi <= 39.9) console.log('Obese (Class II)');
  if(bmi >= 40) console.log('Obese (Class III)');
};

interface measures {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): measures => {
  if(args.length !== 4) throw Error('Numbers of arguments is incorrect');

  const num1 = +args[2];
  const num2 = +args[3];

  if(!isNaN(num1) && !isNaN(num2)) return { height: num1, weight: num2 };
  else throw Error('You should provide valid numbers');
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  if(error instanceof Error) console.log('Error: ' + error.message);
  else console.log('Something went wrong');
}
