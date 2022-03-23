import express from "express";
import patientRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
