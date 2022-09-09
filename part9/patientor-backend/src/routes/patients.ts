import express from 'express';
import { getPublicPatientsInfo, createPatient } from '../services/patientService';
import valNewPatientInfo from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPublicPatientsInfo());
});

router.post('/', (req, res) => {
  try {
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

export default router;