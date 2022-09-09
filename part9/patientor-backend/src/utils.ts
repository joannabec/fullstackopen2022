import { NewPatientInfo, Gender } from './types';

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const valNewPatientInfo = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientInfo => {
  const newPatient: NewPatientInfo = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupacion(occupation)
  };

  return newPatient;
};

// ---------- Validations ----------
const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseName = (string: unknown): string => {
  if(!string || !isString(string)) {
    throw new Error('Name is missing or is invalid');
  }

  return string;
};

// ---------- Parse params ----------
const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Date is missing or is invalid');
  }

  return date;
};

const parseSsn = (string: unknown): string => {
  if(!string || !isString(string)) {
    throw new Error('ssn is missing or is invalid');
  }

  return string;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Gender is missing or is invalid');
  }

  return gender;
};

const parseOccupacion = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Occupation is missing or is invalid');
  }

  return occupation;
};

export default valNewPatientInfo;
