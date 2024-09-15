import { DefaultError, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Device } from "../../domain/entities/devices.entity";
import { DeviceRepository } from "../../domain/repositories/DeviceRepository";

const useDevices = (
  repository: DeviceRepository,
): UseQueryResult<Device[], DefaultError> => {
  const URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";
  const PATH = "devices";
  return useQuery({
    queryKey: ["devices"],
    queryFn: async () => repository.fetchAll(`${URL}/${PATH}`),
    select: (data) => data.data,
  });
};

export { useDevices };
