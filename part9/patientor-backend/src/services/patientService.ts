import patientsList from "../data/patiens";
import { publicPatientInfo, Patient, NewPatientInfo } from "../types";
import { v4 as uuidv4 } from 'uuid';

export const getPublicPatientsInfo = (): Array<publicPatientInfo> => {
  return patientsList.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export const createPatient = (newInfo: NewPatientInfo): Patient => {
  const id: string = uuidv4();
  const newPatient = {  id, ...newInfo, entries: [] };
  patientsList.push(newPatient);
  return newPatient;  
};

export const getPatientInfo = (id: string): Patient | undefined => {
  return patientsList.find(patient => patient.id === id);
};
