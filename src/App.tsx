import "./App.css";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./presentation/components/Header/Header";

//TODO:
//Detail View
//Export
//Styling (Mantine with styled components ? )

const App = (): ReactElement => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
