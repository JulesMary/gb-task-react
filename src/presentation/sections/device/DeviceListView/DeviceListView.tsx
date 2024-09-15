import { ReactElement } from "react";
import { ErrorMessage, Table } from "../../../components";
import { useDevices } from "../../../hooks";
import { DeviceRepository } from "../../../../domain/repositories/DeviceRepository";

interface DeviceListViewProps {
  repository: DeviceRepository;
}

/**
 * List view to show all devices with relevant information.
 * @param repository
 */
const DeviceListView = ({
  repository,
}: DeviceListViewProps): ReactElement | null => {
  const { data: devices, isLoading, error } = useDevices(repository);
  return devices ? (
    <Table
      columnNames={[
        { key: "hostname", label: "Hostname" },
        { key: "ipv4", label: "IPv4 address" },
        { key: "operatingSystem", label: "Operating system" },
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
