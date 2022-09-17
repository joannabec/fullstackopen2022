import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from '../types';

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient },
  patient: null | Patient,
  diagnosis: { [code:string]: Diagnosis } | null
};

const initialState: State = {
  patients: {},
  patient: null,
  diagnosis: null
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
