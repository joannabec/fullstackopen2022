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
  return {
    id, ...newInfo
  };
};
