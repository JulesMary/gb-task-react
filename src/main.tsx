import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { getRouter } from "./routes";
import { DeviceRepositoryImpl } from "./data/repositories/DeviceRepositoryImpl";
import { DeviceAPI } from "./data/api/DeviceAPI";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
});

const deviceAPI = new DeviceAPI();
const deviceRepository = new DeviceRepositoryImpl(deviceAPI);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <RouterProvider router={getRouter(deviceRepository)} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
