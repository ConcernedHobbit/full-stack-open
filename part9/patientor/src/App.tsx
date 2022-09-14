import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, AppBar, Toolbar } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { setDiagnoses, setPatientList, useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./pages/PatientListPage";
import { Typography } from "@material-ui/core";
import PatientPage from "./pages/PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h4" style={{ marginRight: "1em" }}>
                Patientor
              </Typography>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
            </Toolbar>
          </AppBar>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<PatientPage />} />
            <Route path="/" element={<PatientListPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
