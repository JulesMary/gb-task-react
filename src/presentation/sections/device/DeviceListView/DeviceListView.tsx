import { ReactElement } from "react";
import { ErrorMessage, Table } from "../../../components";
import { useDevices } from "../../../hooks";

const DeviceListView = (): ReactElement | null => {
  const { data: devices, isLoading, error } = useDevices();
  return devices ? (
    <Table
      columnNames={[
        { key: "oid", label: "ID" },
        { key: "hostname", label: "Hostname" },
        { key: "macAddress", label: "MAC Address" },
      ]}
      dataRows={devices}
      fileName={"Devices"}
    />
  ) : isLoading ? (
    <p>Devices are loading</p>
  ) : error ? (
    <ErrorMessage message={error.message} />
  ) : null;
};

export { DeviceListView };
