interface results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculate = (weekDays: Array<number>, goal: number): results => {
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

const parseArg = (args: Array<string>): data => {
  let goal = 0;
  const arr: Array<number> = [];
  for(let i = 2; i < args.length; i++) {
    if(isNaN(+args[i])) throw Error('You should provide valid numbers');
    else if (i === 2) goal = +args[i];
    else arr.push(+args[i]);
  }
  // if(args.length !== 4) throw Error('Numbers of arguments is incorrect');

  // let arr:Array<number>;
  // try {
  //   arr = JSON.parse(args[2]);
  // } catch {
  //   throw Error('You should provide an array with valid numbers');
  // }
  // if(!Array.isArray(arr)) throw Error('You should provide an array with the hours of exercises');
  
  // const goal = +args[3];
  // if(isNaN(goal)) throw Error('You should provide a valid number for the goal');

  return {
    weekDays: arr,
    goal
  };
};

try {
  const {weekDays, goal } = parseArg(process.argv);
  console.log(calculate(weekDays, goal));
} catch (error: unknown) {
  if(error instanceof Error) console.log('Error: ' + error.message);
  else console.log('Something went wrong');
}
