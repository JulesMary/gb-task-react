import { Port } from "./port.entity.ts";

interface Device {
  hostname: string;
  macAddress: string;
  ipv4: string;
  ipv6: string;
  oid: string;

  operatingSystem: string;
  openPorts: Port[];
}

export type { Device };
