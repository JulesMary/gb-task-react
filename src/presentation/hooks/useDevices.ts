import { DefaultError, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Device } from "../../domain/entities/devices.entity";
import { fetchAll } from "../../data/api/DeviceAPI";

const useDevices = (): UseQueryResult<Device[], DefaultError> => {
  const url = "http://localhost:8080/devices";
  return useQuery({
    queryKey: ["devices"],
    queryFn: async () => await fetchAll(url),
    select: (data) => data.data,
  });
};

export { useDevices };
