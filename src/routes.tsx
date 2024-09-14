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

const baseRoutes = [
  {
    path: "/devices",
    element: <DeviceListView />,
    label: "Devices",
  },
  {
    path: "/vulnerabilities",
    element: <VulnerabilityListView />,
    label: "Vulnerabilities",
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorMessage />,
    children: [
      {
        index: true,
        element: <Navigate to="devices" replace />,
      },
      ...baseRoutes,
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

export { router, baseRoutes };
