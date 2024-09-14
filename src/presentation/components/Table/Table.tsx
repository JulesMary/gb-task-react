import { ReactElement, useMemo } from "react";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  ScrollArea,
  Space,
  Table as MantineTable,
} from "@mantine/core";
import { useTableController } from "./useTableController.tsx";
import { ColumnNameMapping, HasOid } from "./types";
import { TableHeader } from "./components/TableHeader";
import { useNavigate } from "react-router-dom";
import classes from "./Table.module.css";

const { Tr, Td, Th, Thead, Tbody } = MantineTable;

interface TableProps<T extends HasOid> {
  columnNames: ColumnNameMapping<T>[];
  dataRows: T[];
}

const Table = <T extends HasOid>({
  columnNames,
  dataRows,
}: TableProps<T>): ReactElement => {
  const {
    selectedRows,
    toggleRow,
    toggleAll,
    setSorting,
    sortedRows,
    sortBy,
    handleExport,
  } = useTableController(dataRows);
  const navigate = useNavigate();

  const header = useMemo(() => {
    return (
      <Tr>
        <Th>
          <Checkbox
            onChange={() => toggleAll()}
            color={"var(--mantine-color-green-8)"}
            checked={selectedRows.length === sortedRows.length}
            indeterminate={
              selectedRows.length > 0 &&
              selectedRows.length !== sortedRows.length
            }
          />
        </Th>
        {columnNames.map((mapping) => (
          <Th key={String(mapping.key)}>
            <TableHeader
              sorted={sortBy === mapping.key}
              onSort={() => setSorting(mapping.key)}
            >
              {mapping.label}
            </TableHeader>
          </Th>
        ))}
      </Tr>
    );
  }, [
    columnNames,
    selectedRows.length,
    setSorting,
    sortBy,
    sortedRows,
    toggleAll,
  ]);

  const rows = useMemo(
    () =>
      sortedRows.map((row, index) => {
        //Transform row object to map to access the cells by key.
        const cells = new Map();
        Object.entries(row).forEach(([cellKey, cellValue]) => {
          cells.set(cellKey, cellValue);
        });

        return (
          <Tr
            key={`${row.oid}_${index}`}
            bg={
              selectedRows.includes(row.oid)
                ? "var(--mantine-color-green-light)"
                : undefined
            }
          >
            <Td>
              <Checkbox
                aria-label="Select row"
                color={"var(--mantine-color-green-8)"}
                checked={selectedRows.includes(row.oid)}
                onChange={(event) => {
                  toggleRow(row.oid, event.currentTarget.checked);
                }}
              />
            </Td>
            {columnNames.map((columnEntry) => (
              <Td
                onClick={() => {
                  navigate(`${row.oid}`);
                }}
                className={classes.cell}
                key={String(columnEntry.key)}
              >
                {cells.get(columnEntry.key)}
              </Td>
            ))}
          </Tr>
        );
      }),
    [columnNames, navigate, selectedRows, sortedRows, toggleRow],
  );

  return (
    <Container className={classes.container}>
      <Flex mb={"var(--mantine-spacing-md"} justify={"space-between"}>
        <Space />
        <Button
          variant={"outline"}
          color={"var(--mantine-color-green-8)"}
          onClick={() => handleExport(columnNames)}
          disabled={selectedRows.length === 0}
        >
          Export as CSV
        </Button>
      </Flex>
      <ScrollArea>
        <MantineTable verticalSpacing="sm" highlightOnHover>
          <Thead>{header}</Thead>
          <Tbody>{rows}</Tbody>
        </MantineTable>
      </ScrollArea>
    </Container>
  );
};

export { Table };
