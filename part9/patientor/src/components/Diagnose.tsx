import { Chip } from "@material-ui/core";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const Diagnose = ({ code }: { code: Diagnosis["code"] }) => {
  const [{ diagnoses }] = useStateValue();
  const diagnose = diagnoses[code];

  if (!diagnose) {
    return <Chip label={`${code}`} />;
  }

  return (
    <Chip label={`${diagnose.code} ${diagnose.name}`} variant="outlined" />
  );
};

export default Diagnose;
