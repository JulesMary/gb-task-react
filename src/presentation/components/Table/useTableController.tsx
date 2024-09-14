import { useCallback, useEffect, useState } from "react";
import { ColumnNameMapping, HasOid } from "./types";
import {
  loadSortKeyFromLocalStorage,
  saveSortKeyToLocalStorage,
} from "../../../data/localStorage/SortKeyStorage";
import { exportToCSV } from "../../../data/export/LocalExport";

interface TableController<T> {
  selectedRows: string[];
  toggleRow: (oid: string, checked: boolean) => void;
  toggleAll: () => void;
  setSorting: (field: keyof T) => void;
  sortedRows: T[];
  sortBy: keyof T | null;
  handleExport: (
    columnNames: ColumnNameMapping<T>[],
    fileName?: string,
  ) => void;
}

function isKeyOf<T extends HasOid>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
}

const useTableController = <T extends HasOid>(
  dataRows: T[],
): TableController<T> => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortedRows, setSortedRows] = useState<T[]>(dataRows);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);

  const handleSorting = useCallback((field: keyof T) => {
    const collator = new Intl.Collator("en", {
      numeric: true,
      sensitivity: "accent",
    });
    setSortBy(field);
    saveSortKeyToLocalStorage(String(field));
    setSortedRows((prev) =>
      [...prev].sort((a, b) => {
        return collator.compare(String(a[field]), String(b[field]));
      }),
    );
  }, []);

  useEffect(() => {
    const savedSortKey = loadSortKeyFromLocalStorage();
    if (savedSortKey) {
      if (isKeyOf(savedSortKey, dataRows[0])) {
        setSortBy(savedSortKey);
        handleSorting(savedSortKey);
      }
    }
  }, [dataRows, handleSorting]);

  const toggleRow = useCallback(
    (oid: string, checked: boolean) => {
      setSelectedRows(
        checked
          ? [...selectedRows, oid]
          : selectedRows.filter((oid) => oid !== oid),
      );
    },
    [selectedRows],
  );

  const toggleAll = useCallback(() => {
    setSelectedRows((current) =>
      current.length === sortedRows.length
        ? []
        : sortedRows.map((item) => item.oid),
    );
  }, [sortedRows]);

  const handleExport = (
    columnNames: ColumnNameMapping<T>[],
    fileName?: string,
  ) => {
    exportToCSV(
      columnNames,
      sortedRows.filter((s) => selectedRows.includes(s.oid)),
      fileName ?? "export",
    );
  };

  return {
    selectedRows,
    toggleRow,
    toggleAll,
    setSorting: handleSorting,
    sortedRows,
    sortBy,
    handleExport,
  };
};

export { useTableController };
