import patientsList from "../data/patiens";
import { publicPatientInfo } from "../types";

export const getPublicPatientsInfo = (): Array<publicPatientInfo> => {
  return patientsList.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};