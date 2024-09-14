import { IconChevronDown, IconSelector } from "@tabler/icons-react";
import { Center, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../Table.module.css";

interface TableHeaderProps {
  children: React.ReactNode;
  sorted: boolean;
  onSort(): void;
}

const TableHeader = ({ children, sorted, onSort }: TableHeaderProps) => {
  const Icon = sorted ? IconChevronDown : IconSelector;
  return (
    <UnstyledButton className={classes.control} onClick={onSort}>
      <Group wrap="nowrap" justify="space-between">
        <Text className={classes.headerText}>{children}</Text>
        <Center>
          <Icon className={classes.icon} />
        </Center>
      </Group>
    </UnstyledButton>
  );
};

export { TableHeader };
