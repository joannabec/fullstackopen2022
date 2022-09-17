export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
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


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
} 

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface sickLeaveDates {
  startDate:string;
  endDate:string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?:sickLeaveDates;
}

interface dischargeInfo {
  date:string;
  criteria:string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: dischargeInfo;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;