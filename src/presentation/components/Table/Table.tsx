import { ReactElement, useMemo } from "react";
import {
  Button,
  Checkbox,
  ScrollArea,
  Table as MantineTable,
} from "@mantine/core";
import { useTableController } from "./useTableController.tsx";
import { ColumnNameMapping, HasOid } from "./types";
import { TableHeader } from "./TableHeader.tsx";
import { exportToCSV } from "../../../data/export/LocalExport.ts";

const { Tr, Td, Th, Thead, Tbody } = MantineTable;

interface TableProps<T extends HasOid> {
  columnNames: ColumnNameMapping<T>[];
  dataRows: T[];
  onDetail?: () => void;
}

const Table = <T extends HasOid>({
  columnNames,
  dataRows,
  onDetail,
}: TableProps<T>): ReactElement => {
  const { selectedRows, toggleRow, toggleAll, setSorting, sortedRows, sortBy } =
    useTableController(dataRows);

  const handleExport = () => {
    exportToCSV(
      columnNames,
      sortedRows.filter((s) => selectedRows.includes(s.oid)),
      "export",
    );
  };

  const header = useMemo(() => {
    return (
      <Tr>
        <Th>
          <Checkbox
            onChange={() => toggleAll()}
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
                ? "var(--mantine-color-blue-light)"
                : undefined
            }
          >
            <Td>
              <Checkbox
                aria-label="Select row"
                checked={selectedRows.includes(row.oid)}
                onChange={(event) =>
                  toggleRow(row.oid, event.currentTarget.checked)
                }
              />
            </Td>
            {columnNames.map((columnEntry) => (
              <Td onClick={() => onDetail?.()} key={String(columnEntry.key)}>
                {cells.get(columnEntry.key)}
              </Td>
            ))}
          </Tr>
        );
      }),
    [columnNames, onDetail, selectedRows, sortedRows, toggleRow],
  );

  return (
    <div>
      <Button onClick={handleExport} disabled={selectedRows.length === 0}>
        Export as CSV
      </Button>
      <ScrollArea>
        <MantineTable miw={800} verticalSpacing="sm">
          <Thead>{header}</Thead>
          <Tbody>{rows}</Tbody>
        </MantineTable>
      </ScrollArea>
    </div>
  );
};

export { Table };
