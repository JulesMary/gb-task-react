import { Device } from "../../domain/entities/devices.entity";
import axios, { AxiosResponse } from "axios";

async function fetchAll(
  url: string,
): Promise<Promise<AxiosResponse<Device[]>>> {
  try {
    return axios.get<Device[]>(url);
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
}

export { fetchAll };
