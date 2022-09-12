import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useStateValue } from "../state";
import { apiBaseUrl } from '../constants';
import { Patient } from "../types";
import { setPatient } from '../state/reducer';

import { Typography } from '@mui/material';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from '@mui/icons-material/Male';

const PatientInfo = () => {
  const [ { patient }, dispatch ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    const fetchPatient = async (userId: string) => {
      try {
        const { data:patientInfo } = await axios.get<Patient>(`${apiBaseUrl}/patients/${userId}`);
        dispatch(setPatient(patientInfo));
      } catch (error: unknown) {
        console.log(error);
      }
    };

    if(id && patient?.id !== id) void fetchPatient(id);
  }, [dispatch]);

  let element;
   if(patient) element = 
   <div>
      <Typography mt={3} mb={1} variant="h5" component="h2">{patient.name}
        {patient.gender === 'female' && <FemaleIcon />}
        {patient.gender === 'male' && <MaleIcon />}
      </Typography>
      <Typography variant="body1" component="p">{patient.ssn}</Typography>
      <Typography variant="body1" component="p">{patient.occupation}</Typography>
   </div>;
   else element = <p>Not found</p>;

  return element;
};

export default PatientInfo;