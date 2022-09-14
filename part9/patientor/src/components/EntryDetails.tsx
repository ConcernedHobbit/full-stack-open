import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Box,
  Chip,
} from "@material-ui/core";
import { Entry } from "../types";
import Diagnose from "./Diagnose";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CheckIcon from "@material-ui/icons/Check";
import HealthRatingBar from "./HealthRatingBar";
import WorkIcon from "@material-ui/icons/Work";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PersonIcon from "@material-ui/icons/Person";

type EntryProps = {
  entry: Entry;
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled case ${JSON.stringify(value)}`);
};

type BaseEntryProps = {
  icon?: React.ReactNode;
  title?: string;
};
const BaseEntry: React.FC<EntryProps & BaseEntryProps> = (props) => {
  const { entry, title, children, icon = <HelpOutlineIcon /> } = props;

  return (
    <Card>
      <CardHeader
        title={entry.date}
        avatar={icon}
        subheader={<Typography>{title ?? entry.specialist}</Typography>}
      />
      <CardContent>
        <Typography>{entry.description}</Typography>
        {children}
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((code) => (
            <Diagnose key={code} code={code} />
          ))}
      </CardContent>
    </Card>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <BaseEntry entry={entry} icon={<CheckIcon />}>
          <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
        </BaseEntry>
      );
    case "Hospital":
      return (
        <BaseEntry entry={entry} icon={<LocalHospitalIcon />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gridGap: ".5rem",
              marginTop: ".25rem",
              marginBottom: ".5rem",
            }}
          >
            <Chip label={`Discharged ${entry.discharge.date}`} />
            <Typography>{entry.discharge.criteria}</Typography>
          </Box>
        </BaseEntry>
      );
    case "OccupationalHealthcare":
      return (
        <BaseEntry entry={entry} icon={<WorkIcon />} title={entry.employerName}>
          <Box sx={{ display: "flex", gridGap: ".5rem", alignItems: "center" }}>
            <PersonIcon /> {entry.specialist}
          </Box>
          {entry.sickLeave && (
            <Chip
              label={`Sick leave ${entry.sickLeave.startDate} - ${
                entry.sickLeave.endDate ?? "Ongoing"
              }`}
            />
          )}
        </BaseEntry>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
