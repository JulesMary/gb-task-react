import "./App.css";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./presentation/components";

const App = (): ReactElement => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
