import { Typography } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Patient from "../components/Patient";
import { apiBaseUrl } from "../constants";
import { Patient as PatientType } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<PatientType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const { data: patientFromApi } = await axios.get<PatientType>(
          `${apiBaseUrl}/patients/${id ?? "null"}`
        );
        setPatient(patientFromApi);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    void fetchPatient();
  }, [id]);

  if (loading) {
    return (
      <Typography>Loading...</Typography>
    );
  }

  if (!patient) {
    return (
      <Alert severity="error">
        <AlertTitle>Not Found</AlertTitle>
        Whoops! We couldn&apos;t find a patient with that ID.
      </Alert>
    );
  }

  return (
    <div style={{ marginTop: "2em" }}>
      <Patient patient={patient} />
    </div>
  );
};

export default PatientPage;