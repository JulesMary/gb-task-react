import { Device } from "../entities/devices.entity.ts";
import { AxiosResponse } from "axios";

/**
 * Abstract DeviceRepository that can be implemented.
 */
export interface DeviceRepository {
  fetchAll: (URL: string) => Promise<AxiosResponse<Device[]>>;
}
