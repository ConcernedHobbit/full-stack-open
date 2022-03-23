import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Patient as PatientType } from "../types";
import WorkIcon from "@material-ui/icons/Work";
import CakeIcon from "@material-ui/icons/Cake";

const Patient = ({ patient }: { patient: PatientType }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            {patient.name.charAt(0)}
          </Avatar>
        }
        disableTypography
        title={
          <Typography variant="h5">
            {patient.name}
          </Typography>
        }
        subheader={
          <Typography>
            {patient.ssn}
          </Typography>
        }
      />

      <CardContent>
        <Typography style={{ display: "flex", alignItems: "center" }}>
          <CakeIcon style={{ marginRight: ".5rem" }} aria-label="Birthday" />
          {patient.dateOfBirth}
        </Typography>

        <Typography style={{ display: "flex", alignItems: "center" }}>
          <WorkIcon style={{ marginRight: ".5rem" }} aria-label="Occupation" /> 
          {patient.occupation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Patient;