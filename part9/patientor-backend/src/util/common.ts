import { Gender } from "../types";

export function isString(text: unknown): text is string {
  return typeof text === "string" || text instanceof String;
}

export function isGender(param: unknown): param is Gender {
  return Object.values(Gender).includes(param as Gender);
}