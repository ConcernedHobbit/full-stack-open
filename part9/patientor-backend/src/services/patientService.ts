import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient } from "../types";
import { toNonSensitive } from "../util/patientUtil";
import uuid = require("uuid");

export function getPatients(): Array<NonSensitivePatient> {
  return patients.map(toNonSensitive);
}

export function findById(id: NonSensitivePatient["id"]): NonSensitivePatient | undefined {
  const patient = patients.find(p => p.id === id);
  if (!patient) return undefined;
  return toNonSensitive(patient);
}

export function addPatient(patient: NewPatient): NonSensitivePatient {
  const id: string = uuid.v4();
  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
}