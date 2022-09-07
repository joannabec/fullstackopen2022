import express from 'express';
import cors from 'cors';
const app = express();
import diagnosesRoute from './routes/diagnoses';
import patientsRoute from './routes/patients';

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientsRoute);

app.listen(PORT, () => {
  console.log('Listening', PORT);
});