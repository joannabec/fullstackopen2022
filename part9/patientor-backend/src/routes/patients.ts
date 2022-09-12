import express from 'express';
import { getPublicPatientsInfo, createPatient, getPatientInfo } from '../services/patientService';
import valNewPatientInfo from '../utils';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPublicPatientsInfo());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = valNewPatientInfo(req.body);
    const addedPatient = createPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  const patient: Patient | undefined = getPatientInfo(id);
  if(!patient) res.status(404).json({ error: 'User not fount' });
  res.send(patient);
});

export default router;