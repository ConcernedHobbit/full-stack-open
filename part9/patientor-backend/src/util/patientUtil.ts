import { Gender, NewPatient, NonSensitivePatient, Patient } from "../types";
import { isGender, isString } from "./common";

export function toNonSensitive(patient: Patient): NonSensitivePatient {
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  };
}

function parseString(str: unknown): string {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing string");
  }

  return str;
}

function parseGender(gender: unknown): Gender {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
}

type Fields = {
  name: unknown,
  ssn: unknown,
  dateOfBirth: unknown,
  gender: unknown,
  occupation: unknown
};

export function toNewPatient({ name, ssn, dateOfBirth, gender, occupation }: Fields): NewPatient {
  const newPatient: NewPatient = {
    name: parseString(name),
    ssn: parseString(ssn),
    dateOfBirth: parseString(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
  };

  return newPatient;
}