import { State } from "./state";
import { Patient, Diagnosis } from '../types';

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, d) => ({ ...memo, [d.code]: d }),
            {}
          ),
          ...state.diagnosis
        }
      };

    default:
      return state;
  }
};

export const setPatientList = (data: Array<Patient>): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: data
  };
};

export const addPatient = (data: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: data
  };
};

export const setPatient = (data: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: data
  };
};

export const setDiagnosis = (data: Array<Diagnosis>): Action => {
  return {
    type: 'SET_DIAGNOSIS',
    payload: data
  };
};
