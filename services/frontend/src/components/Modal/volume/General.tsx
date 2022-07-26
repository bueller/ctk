import { styled } from "@mui/joy";

import TextField from "../../global/FormElements/TextField";

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(1)};
`;

const General = () => {
  return (
    <Root>
      <TextField label="Entry name" name="entryName" />
      <TextField label="Volume name" name="volumeName" />
    </Root>
  );
};

export default General;
