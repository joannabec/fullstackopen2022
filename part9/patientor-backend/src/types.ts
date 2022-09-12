export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export interface Entry {
  description:string;
  creationDate:string;
  specialist:string;
}

export interface Patient {
  id:string;
  name:string;
  dateOfBirth:string;
  ssn:string;
  gender:Gender;
  occupation:string;
  entries: Entry[]
}

export interface NewPatientInfo {
  name:string;
  dateOfBirth:string;
  ssn:string;
  gender:Gender;
  occupation:string;
}

export interface Diagnose {
  code:string;
  name:string;
  latin?:string;
}

export type publicPatientInfo = Omit<Patient, 'ssn' | 'entries'>;
