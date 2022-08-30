const calculateBmi = (h: number, w: number): string => {
  const hMeters:number = h / 100;
  const bmi:number = (w / (hMeters * hMeters));

  if(bmi < 16) return 'Underweight (Severe thinness)';
  if(bmi >= 16 && bmi <= 16.9) return 'Underweight (Moderate thinness)';
  if(bmi >= 17 && bmi <= 18.4) return 'Underweight (Mild thinness)';
  if(bmi >= 18.5 && bmi <= 24.9) return 'Normal (healthy weight)';
  if(bmi >= 25 && bmi <= 29.9) return 'Overweight (Pre-obese)';
  if(bmi >= 30 && bmi <= 34.9) return 'Obese (Class I)';
  if(bmi >= 35 && bmi <= 39.9) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

interface measures {
  h: number;
  w: number;
}

const parseArguments = (height: string, weight: string): measures => {
  if(!height.length || !weight.length) throw Error('malformated parameters');

  const num1 = +height;
  const num2 = +weight;

  if(!isNaN(num1) && !isNaN(num2)) return { h: num1, w: num2 };
  else throw Error('malformated parameters');
};

export const bmiCalculator = ( height: string, weight: string ) => {
  const { h, w } = parseArguments(height, weight);
  const bmi = calculateBmi(h, w);

  return {
    height: h,
    weight: w,
    bmi
  };
};
