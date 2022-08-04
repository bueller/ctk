import { styled } from "@mui/joy";
import TextField from "../../global/FormElements/TextField";
import Toggle from "../../global/FormElements/Toggle";
import Records from "../../Records";

const Root = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(1)};
`;

const Group = styled("div")`
  display: flex;
  flex-direction: row;
  @media (max-width: 640px) {
    flex-direction: column;
  }
  column-gap: ${({ theme }) => theme.spacing(1)};
  width: 100%;
`;

const General = () => {
  return (
    <Root>
      <TextField label="Service name" name="serviceName" required={true} />

      <Group>
        <TextField label="Image name" name="imageName" required={false} />
        <TextField label="Image tag" name="imageTag" />
      </Group>

      <TextField label="Container name" name="containerName" required={false} />
      <TextField label="Command" name="command" required={false} />
      <TextField label="Entrypoint" name="entrypoint" required={false} />
      <TextField label="Env file" name="envFile" required={false} />
      <TextField label="Working directory" name="workingDir" required={false} />

      <Toggle
        name="restart"
        label="Restart policy"
        options={[
          {
            value: "no",
            text: "no"
          },
          {
            value: "always",
            text: "always"
          },
          {
            value: "on-failure",
            text: "on-failure"
          },
          {
            value: "unless-stopped",
            text: "unless-stopped"
          }
        ]}
      />

      <Records
        name="ports"
        title="Ports"
        defaultOpen={true}
        fields={(index: number) => [
          {
            name: `ports[${index}].hostPort`,
            placeholder: "Host port",
            required: true,
            type: "text"
          },
          {
            name: `ports[${index}].containerPort`,
            placeholder: "Container port",
            type: "text"
          },
          {
            name: `ports[${index}].protocol`,
            type: "toggle",
            options: [
              {
                value: "tcp",
                text: "TCP"
              },
              {
                value: "udp",
                text: "UDP"
              }
            ]
          }
        ]}
        newValue={{
          hostPort: "",
          containerPort: "",
          protocol: ""
        }}
      />

      <Records
        name="dependsOn"
        title="Depends on"
        fields={(index: number) => [
          {
            name: `dependsOn[${index}]`,
            placeholder: "Service name",
            required: false,
            type: "text"
          }
        ]}
        newValue={""}
      />

      <Records
        name="networks"
        title="Networks"
        fields={(index: number) => [
          {
            name: `networks[${index}]`,
            placeholder: "Network name",
            required: false,
            type: "text"
          }
        ]}
        newValue={""}
      />

      <Records
        name="labels"
        title="Labels"
        fields={(index: number) => [
          {
            name: `labels[${index}].key`,
            placeholder: "Key",
            required: true,
            type: "text"
          },
          {
            name: `labels[${index}].value`,
            placeholder: "Value",
            required: true,
            type: "text"
          }
        ]}
        newValue={{ key: "", value: "" }}
      />

      <Records
        name="profiles"
        title="Profiles"
        fields={(index: number) => [
          {
            name: `profiles[${index}]`,
            placeholder: "Name",
            required: true,
            type: "text"
          }
        ]}
        newValue={""}
      />
    </Root>
  );
};

export default General;
