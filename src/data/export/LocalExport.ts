import { ColumnNameMapping } from "../../presentation/components/Table/types";

/**
 * Exports given data rows to .csv file and starts download directly.
 * @param headers headers of the csv file
 * @param rowData data rows of the csv file
 * @param fileName
 */
const exportToCSV = <T>(
  headers: ColumnNameMapping<T>[],
  rowData: T[],
  fileName: string,
): void => {
  if (rowData.length === 0) {
    console.error("No data to export.");
    return;
  }

  const headerRow = headers.map((header) => header.label).join(",");
  const csvRows = rowData.map((row) => {
    return headers
      .map((header) => {
        const value = row[header.key];
        // If floating point number: Enclose number in Excel formula-like string to avoid date format
        if (typeof value === "number" && /\d+\.\d+/.test(String(value))) {
          return `="${String(row[header.key])}"`;
        }
        return `"${row[header.key]}"`;
      })
      .join(",");
  });
  const csvContent = ["sep=,", headerRow, ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
export { exportToCSV };
