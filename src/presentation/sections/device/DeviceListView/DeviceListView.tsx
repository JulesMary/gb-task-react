import { ReactElement } from "react";
import { Table } from "../../../components";
import { useDevices } from "../../../hooks";

const DeviceListView = (): ReactElement | null => {
  const { data: devices, isError, isLoading } = useDevices();
  return devices ? (
    <Table
      columnNames={[
        { key: "oid", label: "ID" },
        { key: "hostname", label: "Hostname" },
        { key: "macAddress", label: "MAC Address" },
      ]}
      dataRows={devices}
    />
  ) : isLoading ? (
    <p>Devices are loading</p>
  ) : isError ? (
    <p>Error loading devices</p>
  ) : null;
};

export { DeviceListView };
