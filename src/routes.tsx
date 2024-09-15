import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App";
import {
  DeviceDetailView,
  DeviceListView,
} from "./presentation/sections/device";
import {
  VulnerabilityDetailView,
  VulnerabilityListView,
} from "./presentation/sections/vulnerability";
import { ErrorMessage } from "./presentation/components";
import { DeviceRepository } from "./domain/repositories/DeviceRepository";

const getBaseRoutes = (deviceRepo?: DeviceRepository) => [
  {
    path: "/devices",
    element: deviceRepo ? <DeviceListView repository={deviceRepo} /> : null,
    label: "Devices",
  },
  {
    path: "/vulnerabilities",
    element: <VulnerabilityListView />,
    label: "Vulnerabilities",
  },
];
const getRouter = (deviceRepository: DeviceRepository) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorMessage />,
      children: [
        {
          index: true,
          element: <Navigate to="devices" replace />,
        },
        ...getBaseRoutes(deviceRepository),
        {
          path: "/devices/:id",
          element: <DeviceDetailView />,
        },
        {
          path: "/vulnerabilities/:id",
          element: <VulnerabilityDetailView />,
        },
      ],
    },
  ]);
};

export { getRouter, getBaseRoutes };
