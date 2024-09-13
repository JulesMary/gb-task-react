import { useDevices } from "../../hooks/useDevices";
import { ReactElement } from "react";
import { Table } from "../../components/Table/Table";

const DeviceList = (): ReactElement | null => {
  const { data: devices, isError, isLoading } = useDevices();
  return devices ? (
    <Table
      columnNames={[
        { key: "oid", label: "OID" },
        { key: "hostname", label: "Host" },
        { key: "macAddress", label: "MAC" },
      ]}
      dataRows={devices}
    />
  ) : isLoading ? (
    <p>Devices are loading</p>
  ) : isError ? (
    <p>Error loading devices</p>
  ) : null;
};

export { DeviceList };
