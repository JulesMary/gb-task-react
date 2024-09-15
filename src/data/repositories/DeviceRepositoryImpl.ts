import { DeviceRepository } from "../../domain/repositories/DeviceRepository";
import { DeviceAPI } from "../api/DeviceAPI";
import { Device } from "../../domain/entities/devices.entity";
import { AxiosResponse } from "axios";

/**
 * Repository for Device API access.
 */
class DeviceRepositoryImpl implements DeviceRepository {
  private readonly api: DeviceAPI;

  constructor(api: DeviceAPI) {
    this.api = api;
  }

  fetchAll = (URL: string): Promise<AxiosResponse<Device[]>> => {
    return this.api.fetchAll(URL);
  };
}

export { DeviceRepositoryImpl };
