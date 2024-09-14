import { Device } from "../../domain/entities/devices.entity";
import axios, { AxiosResponse } from "axios";

async function fetchAll(
  url: string,
): Promise<Promise<AxiosResponse<Device[]>>> {
  return axios.get<Device[]>(url);
}

export { fetchAll };
