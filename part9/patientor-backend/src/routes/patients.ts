import express from 'express';
import { getPublicPatientsInfo } from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPublicPatientsInfo());
});

export default router;