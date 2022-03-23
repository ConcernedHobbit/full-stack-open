import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Patient as PatientType } from "../types";

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
        <Typography>
          Born {patient.dateOfBirth}
        </Typography>

        <Typography>
          Occupation: {patient.occupation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Patient;