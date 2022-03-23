import express from "express";
import { getPatients } from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

export default router;
