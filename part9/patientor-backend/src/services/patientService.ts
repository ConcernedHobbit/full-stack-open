import patients from "../../data/patients";
import { NonSensitivePatient } from "../types";

export function getPatients(): Array<NonSensitivePatient> {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }: NonSensitivePatient) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}
