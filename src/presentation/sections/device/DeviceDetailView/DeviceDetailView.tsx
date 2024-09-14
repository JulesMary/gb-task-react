import { Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { DetailCard } from "../../../components";
import { useDevices } from "../../../hooks";

const DeviceDetailView = () => {
  const { id } = useParams();
  const { data: devices } = useDevices();
  const device = devices?.find((device) => device.oid === id);
  if (!device) return <Text>{`Device with oid ${id} not found`}</Text>;
  const labels = [
    "IPv4",
    "IPv6",
    "MAC address",
    "Operating System",
    "Open Ports",
  ];
  const deviceValues = {
    ...device,
    oid: undefined,
    hostname: undefined,
    openPorts: device.openPorts
      .map((port) => `${port.number} (${port.protocol})`)
      .join(", "),
  };
  return (
    <DetailCard
      title={device.hostname}
      subtitle={`ID: ${device.oid}`}
      labels={labels}
      values={Object.values(deviceValues)}
    />
  );
};

export { DeviceDetailView };
