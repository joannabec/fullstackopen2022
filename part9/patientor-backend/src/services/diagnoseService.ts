import { Diagnose } from "../types";
import diagnosesList from "../data/diagnoses";

export const getAllDiagnoses = ():Array<Diagnose> => {
  return diagnosesList;
};