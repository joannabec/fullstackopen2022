import express from 'express';
import { bmiCalculator } from './bmiCalcModule';
import { exercisesCalculator } from './exerciseCalcModule';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;
  
  try {
    const result = bmiCalculator(height, weight);
    res.send(result);
  } catch (error: unknown) {
    if (error instanceof Error) res.status(400).send({ error: error.message });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result:object =  exercisesCalculator(daily_exercises, target);
    res.send(result);
  } catch(error: unknown) {
    if (error instanceof Error) res.status(400).send({ error: error.message });
  }
});
  
const PORT = 3002;
app.listen(PORT, () => {
  console.log('app runing on port ' + PORT);
});
