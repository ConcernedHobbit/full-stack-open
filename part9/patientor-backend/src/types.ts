export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type Entry = Record<string, never>;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NewPatient = Omit<Patient, "id">;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
