import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ColumnNameMapping, HasOid, isKeyOf } from "./types";
import {
  loadSortKeyFromLocalStorage,
  saveSortKeyToLocalStorage,
} from "../../../data/localStorage/SortKeyStorage";
import { exportToCSV } from "../../../data/export/LocalExport";

interface TableController<T> {
  /** ids of selected rows. **/
  selectedRows: string[];
  /** Callback on row selection **/
  handleToggleRow: (
    oid: string,
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  /** Callback on selecting all rows **/
  handleToggleAll: () => void;
  /** Callback on export click **/
  handleExport: (
    columnNames: ColumnNameMapping<T>[],
    fileName?: string,
  ) => void;
  /** Callback when changing sorting **/
  handleSorting: (field: keyof T, reversed: boolean) => void;
  /** Sorted array of rows **/
  sortedRows: T[];
  /** Current sorting key **/
  sortBy: keyof T | null;
  /** Boolean if sorting is reversed (desc) or not (asc) **/
  sortReversed: boolean;
}

/**
 * Hook that contains logic of `Table` and returns relevant callback functions and states.
 * @param dataRows
 */
const useTableController = <T extends HasOid>(
  dataRows: T[],
): TableController<T> => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortedRows, setSortedRows] = useState<T[]>(dataRows);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortReversed, setSortReversed] = useState(false);

  const handleToggleRow = useCallback(
    (oid: string) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedRows((prev) => [...prev, oid]);
      } else {
        setSelectedRows((prev) => [
          ...prev.filter((selectedId) => selectedId !== oid),
        ]);
      }
    },
    [],
  );

  const handleToggleAll = useCallback(() => {
    setSelectedRows((prev) =>
      prev.length === sortedRows.length
        ? []
        : sortedRows.map((item) => item.oid),
    );
  }, [sortedRows]);

  const handleExport = useCallback(
    (columnNames: ColumnNameMapping<T>[], fileName?: string) => {
      exportToCSV(
        columnNames,
        sortedRows.filter((s) => selectedRows.includes(s.oid)),
        fileName ?? "export",
      );
    },
    [selectedRows, sortedRows],
  );

  const handleSorting = useCallback((field: keyof T, reversed: boolean) => {
    setSortBy(field);
    setSortReversed(reversed);
    saveSortKeyToLocalStorage({ field: String(field), reversed });
    const collator = new Intl.Collator("en", {
      numeric: true,
      sensitivity: "accent",
    });
    setSortedRows((prev) =>
      [...prev].sort((a, b) => {
        return reversed
          ? collator.compare(String(b[field]), String(a[field]))
          : collator.compare(String(a[field]), String(b[field]));
      }),
    );
  }, []);

  const initSorting = useCallback(() => {
    const savedSorting = loadSortKeyFromLocalStorage();
    if (savedSorting?.field) {
      if (isKeyOf(savedSorting.field, dataRows[0])) {
        handleSorting(savedSorting.field, savedSorting.reversed ?? false);
      }
    }
  }, [dataRows, handleSorting]);

  useEffect(() => {
    initSorting();
  }, [dataRows, handleSorting, initSorting]);

  return {
    selectedRows,
    handleToggleRow,
    handleToggleAll,
    handleSorting,
    sortReversed,
    sortedRows,
    sortBy,
    handleExport,
  };
};

export { useTableController };
