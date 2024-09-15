import { ReactElement, ReactNode, useCallback, useMemo } from "react";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  ScrollArea,
  Space,
  Table as MantineTable,
} from "@mantine/core";
import { useTableController } from "./useTableController";
import { ColumnNameMapping, HasOid } from "./types";
import { TableHeader } from "./components/TableHeader";
import { useNavigate } from "react-router-dom";
import classes from "./Table.module.css";

const { Tr, Td, Th, Thead, Tbody } = MantineTable;

interface TableProps<T extends HasOid> {
  columnNames: ColumnNameMapping<T>[];
  dataRows: T[];
  fileName?: string;
}

/**
 * Table that lists all types of data that has an oid property.
 * @param columnNames Mapping between object keys to column names.
 * @param dataRows Data to be shown in rows. Only data that matches a columnName is displayed.
 * @param fileName File name for export.
 */
const Table = <T extends HasOid>({
  columnNames,
  dataRows,
  fileName,
}: TableProps<T>): ReactElement => {
  const {
    selectedRows,
    handleToggleRow,
    handleToggleAll,
    handleSorting,
    sortedRows,
    sortBy,
    sortReversed,
    handleExport,
  } = useTableController(dataRows);

  const navigate = useNavigate();
  const handleRowClick = useCallback(
    (oid: string) => () => navigate(`${oid}`),
    [navigate],
  );

  const header = useMemo(() => {
    return (
      <Tr>
        <Th>
          <Checkbox
            onChange={handleToggleAll}
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
              reversed={sortReversed}
              onSort={() =>
                handleSorting(
                  mapping.key,
                  sortBy === mapping.key ? !sortReversed : false,
                )
              }
            >
              {mapping.label}
            </TableHeader>
          </Th>
        ))}
      </Tr>
    );
  }, [
    handleToggleAll,
    selectedRows.length,
    sortedRows.length,
    columnNames,
    sortBy,
    sortReversed,
    handleSorting,
  ]);

  const rows = useMemo(
    () =>
      sortedRows.map((row, index) => {
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
                onChange={handleToggleRow(row.oid)}
              />
            </Td>
            {columnNames.map((columnEntry) => {
              const cellValue = (row as Record<string, unknown>)[
                columnEntry.key as string
              ];
              return (
                <Td
                  key={String(columnEntry.key)}
                  onClick={handleRowClick(row.oid)}
                  className={classes.cell}
                >
                  {cellValue != null ? (cellValue as ReactNode) : "N/A"}
                </Td>
              );
            })}
          </Tr>
        );
      }),
    [columnNames, handleRowClick, selectedRows, sortedRows, handleToggleRow],
  );

  return (
    <Container className={classes.container}>
      <Flex mb={"var(--mantine-spacing-md"} justify={"space-between"}>
        <Space />
        <Button
          variant={"outline"}
          color={"var(--mantine-color-green-8)"}
          onClick={() => handleExport(columnNames, fileName)}
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
