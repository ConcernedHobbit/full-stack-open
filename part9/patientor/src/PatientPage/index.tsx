import { Box, Card, CardContent, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
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
      <div>
        <Typography>Loading...</Typography>
      </div>
    );
  }

  if (!patient) {
    return (
      <div>
        <Typography>Patient not found</Typography>
      </div>
    );
  }

  return (
    <Card style={{ marginTop: '1rem' }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4" style={{ marginRight: "1rem" }}>
            {patient.name}
          </Typography>
          <Typography>
            {patient.gender}
          </Typography>
        </Box>

        <Typography gutterBottom>
          Born {patient.dateOfBirth}
        </Typography>

        <Typography>
          SSN: {patient.ssn}
        </Typography>

        <Typography>
          Occupation: {patient.occupation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PatientPage;