import { Device } from "../../domain/entities/devices.entity";
import axios, { AxiosResponse } from "axios";

class DeviceAPI {
  fetchAll = async (url: string): Promise<AxiosResponse<Device[]>> => {
    return axios.get<Device[]>(url);
  };
}
export { DeviceAPI };
