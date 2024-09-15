import { Group } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import { useState } from "react";
import { getBaseRoutes } from "../../../routes";

/**
 * Header component with basic navigation.
 */
const Header = () => {
  const { pathname } = useLocation();
  const currentPath = pathname === "/" ? "/devices" : pathname;
  const [active, setActive] = useState(currentPath);
  const items = getBaseRoutes().map((route) => (
    <Link
      onClick={() => setActive(route.path)}
      data-active={active === route.path || undefined}
      className={classes.link}
      key={route.path}
      to={route.path}
    >
      {route.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Group>{items}</Group>
    </header>
  );
};

export { Header };
