import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { Patient as PatientType } from "../types";
import WorkIcon from "@material-ui/icons/Work";
import CakeIcon from "@material-ui/icons/Cake";
import Diagnose from "./Diagnose";
import { useStateValue } from "../state";

const Patient = ({ patient }: { patient: PatientType }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar>{patient.name.charAt(0)}</Avatar>}
          disableTypography
          title={<Typography variant="h5">{patient.name}</Typography>}
          subheader={<Typography>{patient.ssn}</Typography>}
        />

        <CardContent>
          <Typography style={{ display: "flex", alignItems: "center" }}>
            <CakeIcon style={{ marginRight: ".5rem" }} aria-label="Birthday" />
            {patient.dateOfBirth}
          </Typography>

          <Typography style={{ display: "flex", alignItems: "center" }}>
            <WorkIcon
              style={{ marginRight: ".5rem" }}
              aria-label="Occupation"
            />
            {patient.occupation}
          </Typography>
        </CardContent>
      </Card>

      {patient.entries && (
        <Box sx={{ marginTop: "1rem" }}>
          <Grid container spacing={2}>
            {patient.entries.map((entry) => (
              <Grid item key={entry.id} xs>
                <Card>
                  <CardHeader
                    title={entry.date}
                    subheader={<Typography>{entry.specialist}</Typography>}
                  />
                  <CardContent>
                    <Typography>{entry.description}</Typography>
                    {entry.diagnosisCodes &&
                      entry.diagnosisCodes.map((code) => (
                        <Diagnose
                          key={code}
                          code={code}
                          diagnose={diagnoses[code]}
                        />
                      ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Patient;
