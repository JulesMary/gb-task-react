import {
  IconChevronDown,
  IconSelector,
  IconChevronUp,
} from "@tabler/icons-react";
import { Center, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "../Table.module.css";

interface TableHeaderProps {
  children: React.ReactNode;
  sorted: boolean;
  reversed: boolean;
  onSort(): void;
}

const TableHeader = ({
  children,
  sorted,
  reversed,
  onSort,
}: TableHeaderProps) => {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
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
