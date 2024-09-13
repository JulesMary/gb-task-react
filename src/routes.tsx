import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { DeviceList } from "./presentation/sections/ListView/DeviceList.tsx";
import { VulnerabilityList } from "./presentation/sections/ListView/VulnerabilityList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "devices/",
        element: <DeviceList />,
      },
      {
        path: "vulnerabilities/",
        element: <VulnerabilityList />,
      },
    ],
  },
]);

export { router };
