import { DefaultError, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Device } from "../../domain/entities/devices.entity";
import { fetchAll } from "../../data/api/DeviceAPI";

const useDevices = (): UseQueryResult<Device[], DefaultError> => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const PATH = "devices";
  return useQuery({
    queryKey: ["devices"],
    queryFn: async () => fetchAll(`${URL}/${PATH}`),
    select: (data) => data.data,
  });
};

export { useDevices };
