import { IconChevronDown, IconSelector } from "@tabler/icons-react";
import { Center, Group, rem, Text, UnstyledButton } from "@mantine/core";

interface TableHeaderProps {
  children: React.ReactNode;
  sorted: boolean;
  onSort(): void;
}

const TableHeader = ({ children, sorted, onSort }: TableHeaderProps) => {
  const Icon = sorted ? IconChevronDown : IconSelector;
  return (
    <UnstyledButton onClick={onSort}>
      <Group justify="space-between">
        <Text fw={500} fz="sm">
          {children}
        </Text>
        <Center>
          <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </Center>
      </Group>
    </UnstyledButton>
  );
};

export { TableHeader };
