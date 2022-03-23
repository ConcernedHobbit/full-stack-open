import express from "express";
import { addPatient, findById, getPatients } from "../services/patientService";
import { toNewPatient } from "../util/patientUtil";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

router.get("/:id", (req, res) => {
  const patient = findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

interface PatientRequestBody extends Express.Request {
  body: {
    name: unknown,
    ssn: unknown,
    dateOfBirth: unknown,
    gender: unknown,
    occupation: unknown
  }
}

router.post("/", (req: PatientRequestBody, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred.');
    }
  }
});

export default router;
