import { Container, Group } from "@mantine/core";
import { Link } from "react-router-dom";

const links = [
  { link: "devices", label: "Devices" },
  { link: "vulnerabilities", label: "Vulnerabilities" },
];

const Header = () => {
  const items = links.map((link) => (
    <Link key={link.link} to={link.link}>
      {link.label}
    </Link>
  ));

  return (
    <header>
      <Container size="md">
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
      </Container>
    </header>
  );
};

export { Header };
