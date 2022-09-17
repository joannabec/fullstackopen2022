import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useStateValue } from "../state";
import { apiBaseUrl } from '../constants';
import { Patient, Entry, Diagnosis } from '../types';
import { setDiagnosis, setPatient } from '../state/reducer';

import { Typography } from '@mui/material';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from '@mui/icons-material/Male';
import NewEntry from './Entry';

const PatientInfo = () => {
  const [ { patient, diagnosis }, dispatch ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    const fetchPatient = async (userId: string) => {
      try {
        const { data:patientInfo } = await axios.get<Patient>(`${apiBaseUrl}/patients/${userId}`);
        const { data:diagnosisInfo } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setPatient(patientInfo));
        dispatch(setDiagnosis(diagnosisInfo));
      } catch (error: unknown) {
        console.log(error);
      }
    };

    if(id && patient?.id !== id) void fetchPatient(id);
  }, [dispatch]);
  let element;
   if(patient && diagnosis) element = 
   <div>
      <Typography mt={3} mb={1} variant="h5" component="h2">{patient.name}
        {patient.gender === 'female' && <FemaleIcon />}
        {patient.gender === 'male' && <MaleIcon />}
      </Typography>
      <Typography variant="body1" component="p">{patient.ssn}</Typography>
      <Typography variant="body1" component="p">{patient.occupation}</Typography>
      <Typography mt={3} mb={1} variant="h4" component="h3">Entries</Typography>
      { patient.entries.length ?
        patient.entries.map((entry: Entry) => 
          <NewEntry key={entry.id} entry={entry} diagnosis={diagnosis} />
        ) :
        <Typography>No entries found</Typography>
      }
   </div>;
   else element = <p>Not found</p>;

  return element;
};

export default PatientInfo;