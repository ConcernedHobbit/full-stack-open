import express from "express";
import { getDiagnoses } from "./services/diagnosisService";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(getDiagnoses());
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
