import { Device } from "../entities/devices.entity.ts";
import { AxiosResponse } from "axios";

export interface DeviceRepository {
  fetchAll: (URL: string) => Promise<AxiosResponse<Device[]>>;
}
