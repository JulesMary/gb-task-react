import { Card, Text } from "@mantine/core";
import { Device } from "../../../domain/entities/devices.entity.ts";

interface DeviceDetailViewProps {
  device: Device;
}
const DeviceDetailView = ({ device }: DeviceDetailViewProps) => {
  return (
    <Card withBorder p="xl" radius="md">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text fz="xl">{device.hostname}</Text>
        <Text mt={30}>{device.oid}</Text>
      </div>
    </Card>
  );
};

export { DeviceDetailView };
