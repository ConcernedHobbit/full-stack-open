import { Chip } from "@material-ui/core";
import { Diagnosis } from "../types";

const Diagnose = ({
  code,
  diagnose,
}: {
  code: Diagnosis["code"];
  diagnose?: Diagnosis;
}) => {
  if (!diagnose) {
    return <Chip label={`${code}`} />;
  }
  return (
    <Chip label={`${diagnose.code} ${diagnose.name}`} variant="outlined" />
  );
};

export default Diagnose;
