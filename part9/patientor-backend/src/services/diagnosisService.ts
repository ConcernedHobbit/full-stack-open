import diagnoses from "../../data/diagnoses";
import { Diagnose } from "../types";

export function getDiagnoses(): Array<Diagnose> {
  return diagnoses;
}
