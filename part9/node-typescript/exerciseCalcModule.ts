interface results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calcExercises = (weekDays: Array<number>, goal: number): results => {
  let totalHours = 0;
  let trainingDays = 0;

  weekDays.forEach(day => {
    if(day > 0) trainingDays++;
    totalHours += day;
  });

  const average = totalHours / weekDays.length;

  let rating = 1;
  let ratingDescription = '';
  
  if(Math.round(average) === goal) {
    rating = 2;
    ratingDescription = 'Good enough, good job';
  } 
  if(Math.round(average) < goal) {
    rating = 1;
    ratingDescription = 'Come on! you can do it better';
  }
  if(Math.round(average) > goal) {
    rating = 3;
    ratingDescription = 'Better than expected! congrats :)';
  }

  return {
    periodLength: weekDays.length,
    trainingDays,
    success: average >= goal,
    rating,
    ratingDescription,
    target: goal,
    average
  };
};

interface data {
  weekDays: Array<number>;
  goal: number
}

const parseArgs = (args: Array<number>, goal: number): data => {
  if(!args.length || !goal || goal < 0 || isNaN(+goal)) throw Error('malformatted parameters');
  for(let i = 2; i < args.length; i++) {
    if(isNaN(+args[i])) throw Error('malformatted parameters');
  }

  return {
    weekDays: args,
    goal
  };
};

export const exercisesCalculator = (days: Array<number>, target: number) => {
  const { weekDays, goal } = parseArgs(days, target);
  return calcExercises(weekDays, goal);
};

// try {
//   const {weekDays, goal } = parseArgs(process.argv);
//   console.log(calcExercises(weekDays, goal));
// } catch (error: unknown) {
//   if(error instanceof Error) console.log('Error: ' + error.message);
//   else console.log('Something went wrong');
// }
